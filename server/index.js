import express from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { createEvent } from 'ics';


dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3001;

// allow different origins for cors
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());


// Email configuration and transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateICSFile = (bookingDetails, services, totalDuration, totalPrice) => {
    return new Promise((resolve, reject) => {
        const startTime = bookingDetails.date.split(".").reverse();
        const [year, month, day] = startTime.map(Number);
        const [hour, minute] = bookingDetails.time.split(":").map(Number);

        const eventDetails = {
            start: [year, month, day, hour, minute],
            duration: { hours: Math.floor(totalDuration / 60), minutes: totalDuration % 60 },
            title: `Booking: ${services.map(s => s.title).join(", ")}`,
            description: `
                Buchung für ${bookingDetails.firstname} ${bookingDetails.lastname}.
                E-Mail: ${bookingDetails.email}
                Telefon: ${bookingDetails.phone}
                Datum: ${bookingDetails.date}, Zeit: ${bookingDetails.time}
                Services: ${services.map(s => `${s.title} (${s.duration} Minuten)`).join(", ")}
                Ungefährer Preis: CHF ${totalPrice}
                Stornierung: Bis spätestens 2 Tage vorher telefonisch möglich.
            `,
            location: "Kirchgasse 3, 9500 Wil, Schweiz",
            status: 'CONFIRMED',
            organizer: { name: 'Nancy Nails', email: 'nancy.nails.mail@gmail.com' },
            attendees: [
                {
                    name: `${bookingDetails.firstname} ${bookingDetails.lastname}`,
                    email: bookingDetails.email,
                    rsvp: true,
                    partstat: 'ACCEPTED',
                },
            ],
        };

        createEvent(eventDetails, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
};


app.post('/api/terminanfrage', async (req, res) => {
    const bookingDetails = req.body;
    const services = req.body.services;
    const totalDuration = services.reduce((acc, service) => acc + service.price, 0);
    const totalPrice = services.reduce((acc, service) => acc + service.duration, 0);
    console.log(req.body.dateInfo)
    if (!req.body.agbChecked) {
        return res.status(400).send('AGBs must be accepted to proceed with the booking.');
    }

    const query_res = await bookAppointment(req.body.email, req.body.phone, req.body.dateInfo.date, req.body.dateInfo.startTime, req.body.dateInfo.duration);
    if (query_res?.error === "Time slot already booked"){
        return res.status(400).send('Termin überschneidet einen gebuchten Block. Wählen sie einen anderen Zeitpunkt')
    }

    try {
        const icsFileContent = await generateICSFile(bookingDetails, services, totalDuration, totalPrice);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: 'Neuer Nancy Nails Termin',
            text: `Neue Anfrage nach einem Termin: ${req.body.firstname} ${req.body.lastname}. Kontakt Details: Email - ${req.body.email}, Phone - ${req.body.phone}. \n
            Datum: ${req.body.date}, Zeit: ${req.body.time}\n
            Folgende Services wurden gebucht: ${req.body.services.map(service => service.title).join(", ")}\n
            Bemerkung des Kunden: ${req.body.bemerkung}`,
            attachments: [{
                filename: 'appointment.ics',
                content: icsFileContent,
                contentType: 'text/calendar'
            }]
        };


        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully with ICS attachment');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});


const prisma = new PrismaClient();

async function bookAppointment(userEmail, userPhone, date, startTime, duration) {
    const dur = Number(duration)
    const query = `
        WITH new_booking AS (
            SELECT
                MAKE_TIMESTAMP(
                        SPLIT_PART(CAST($1 AS TEXT), '.', 3)::INT,
                        SPLIT_PART(CAST($1 AS TEXT), '.', 2)::INT,
                        SPLIT_PART(CAST($1 AS TEXT), '.', 1)::INT,
                        SPLIT_PART(CAST($2 AS TEXT), ':', 1)::INT,
                        SPLIT_PART(CAST($2 AS TEXT), ':', 2)::INT,
                        0
                    ) AS start_time,
                MAKE_TIMESTAMP(
                        SPLIT_PART(CAST($1 AS TEXT), '.', 3)::INT,
                        SPLIT_PART(CAST($1 AS TEXT), '.', 2)::INT,
                        SPLIT_PART(CAST($1 AS TEXT), '.', 1)::INT,
                        SPLIT_PART(CAST($2 AS TEXT), ':', 1)::INT,
                        SPLIT_PART(CAST($2 AS TEXT), ':', 2)::INT,
                        0
                    ) + ($3 * INTERVAL '1 minute') AS end_time
        )
        INSERT INTO "Appointment" (user_email, user_phone, start_time, end_time)
        SELECT $4, $5, start_time, end_time FROM new_booking
        WHERE NOT EXISTS (
            SELECT 1 FROM "Appointment"
            WHERE tstzrange(start_time, end_time, '[]') &&
          tstzrange((SELECT start_time FROM new_booking), (SELECT end_time FROM new_booking), '[]')
        )
            RETURNING *;
    `;

    const result = await prisma.$queryRawUnsafe(query, date, startTime, dur, userEmail, userPhone);
    return result.length > 0 ? result[0] : { error: "Time slot already booked" };
}


app.post("/api/terminbuchung", async (req, res) => {
    bookAppointment("user123", "+41 832 83 921 93", "06.02.2025", "16:30", 120)
        .then(console.log)
        .catch(console.error);

})

async function getBookedSlots() {
    const query = `
        SELECT 
            TO_CHAR(start_time, 'DD.MM.YYYY') AS date,
            TO_CHAR(start_time, 'HH24:MI') AS "startTime",
            TO_CHAR(end_time, 'HH24:MI') AS "endTime"
        FROM "Appointment";
    `;

    const slots = await prisma.$queryRawUnsafe(query);
    return slots;
}
app.get("/api/booked-slots", async (req, res) => {
    try {
        const slots = await getBookedSlots();
        res.json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch booked slots" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
