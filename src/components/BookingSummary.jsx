import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { createEvent } from "ics";

export default function BookingSummary({ bookingDetails }) {
    const services = Object.values(bookingDetails).filter((item) => item.price !== undefined);
    const totalPrice = services.reduce((acc, service) => acc + service.price, 0);
    const totalDuration = services.reduce((acc, service) => acc + service.duration, 0);

    const generateICSFile = () => {
        const startTime = bookingDetails.date.split(".").reverse();
        const [year, month, day] = startTime.map(Number);
        const [hour, minute] = bookingDetails.time.split(":").map(Number);

        const eventDetails = {
            start: [year, month, day, hour, minute],
            duration: { hours: Math.floor(totalDuration / 60), minutes: totalDuration % 60 },
            title: `Booking: ${services.map((s) => s.title).join(", ")}`,
            description: `
        Buchung für ${bookingDetails.firstname} ${bookingDetails.lastname}.
        E-Mail: ${bookingDetails.email}
        Telefon: ${bookingDetails.phone}
        Datum: ${bookingDetails.date}, Zeit: ${bookingDetails.time}
        Services: ${services.map((s) => `${s.title} (${s.duration} Minuten)`).join(", ")}
        Stornierung: Bis spätestens 2 Tage vorher telefonisch möglich.
      `,
            location: "Bahnhofstrasse 123, 8000 Zürich, Schweiz",
            geo: { lat: 47.3768866, lon: 8.541694 }, // Zurich coordinates as an example
            status: "CONFIRMED",
            organizer: { name: "Nancy Nails", email: "nancy.nails.mail@gmail.com" },
            attendees: [
                {
                    name: `${bookingDetails.firstname} ${bookingDetails.lastname}`,
                    email: bookingDetails.email,
                    rsvp: true,
                },
            ],
        };

        createEvent(eventDetails, (error, value) => {
            if (error) {
                console.error(error);
                return;
            }

            const blob = new Blob([value], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "appointment.ics";
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
                alignItems: "flex-start",
                gap: 4,
                maxWidth: "1200px",
                margin: "auto",
                padding: "20px",
            }}
        >
            {/* Booking */}
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    width: { xs: "100%", md: "auto" }, // Full width for mobile, auto for desktop
                }}
            >
                <Box sx={{ p: 2, maxWidth: "500px", margin: "auto", textAlign: "center" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Buchungsübersicht
                    </Typography>
                    <Typography>
                        <strong>Name:</strong> {bookingDetails.firstname} {bookingDetails.lastname}
                    </Typography>
                    <Typography>
                        <strong>E-Mail:</strong> {bookingDetails.email}
                    </Typography>
                    <Typography>
                        <strong>Telefon:</strong> {bookingDetails.phone}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Datum:</strong> {bookingDetails.date}, <strong>Zeit:</strong> {bookingDetails.time}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Services:</strong> {services.map((s) => s.title).join(", ")}
                    </Typography>
                    <Typography sx={{ mt: 2, fontSize: "0.9em" }}>
                        Stornierung nur telefonisch bis spätestens 2 Tage vor dem Termin möglich.
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: "0.9em" }}>
                        Kontakt: asdf@email.com
                    </Typography>
                    <Typography sx={{ mt: 0, fontSize: "0.9em" }}>
                        Tel. 079 123 56 78
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={generateICSFile}
                        sx={{ mt: 2 }}
                    >
                        Kalenderdatei herunterladen
                    </Button>
                </Box>
            </Box>
            {/* Google Maps iframe */}
            <Box
                sx={{
                    flex: 2,
                    width: "100%",
                    height: { xs: "300px", md: "400px" }, // Smaller height for mobile
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <iframe
                    title="Studio Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5101185917725!2d8.539182315900447!3d47.376886679168516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMSczMS4zIkU!5e0!3m2!1sen!2sch!4v1679943533856!5m2!1sen!2sch"
                    width="100%"
                    height="100%"
                    style={{ border: 0,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </Box>
        </Box>
    );
}
