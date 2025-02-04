import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // To parse JSON bodies
app.use(cors());  // This will allow all domains to access your server

// If you want to be more specific:
app.use(cors({
    origin: 'http://localhost:3000'  // Adjust depending on your frontend URL
}));

// Email configuration and transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or you can use 'host' and 'port' directly
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.post('/api/terminanfrage', async (req, res) => {
    console.log(req.body)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Neuer Nancy Nails Termin',
        text: `Neue Anfrage nach einem Termin: ${req.body.firstname} ${req.body.lastname}. Kontakt Details: Email - ${req.body.email}, Phone - ${req.body.phone}.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email erfolgreich versendet');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Buchung fehlgeschlagen, bitte versuchen sie es später erneut.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
