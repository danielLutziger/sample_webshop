import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { createEvent } from 'ics';


dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3001;

// Allow multiple origins or specific origin
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
    const bookingDetails = req.body; // assuming booking details are sent in the body
    const services = req.body.services;
    const totalDuration = services.reduce((acc, service) => acc + service.price, 0);
    const totalPrice = services.reduce((acc, service) => acc + service.duration, 0);

    if (!req.body.agbChecked) {
        return res.status(400).send('AGBs must be accepted to proceed with the booking.');
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

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
