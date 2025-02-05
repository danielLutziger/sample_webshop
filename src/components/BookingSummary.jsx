import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { createEvent } from "ics";

export default function BookingSummary({ bookingDetails }) {
    const services = bookingDetails.services;
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
        Termin ID: ${bookingDetails.uuid}
        Buchung für ${bookingDetails.firstname} ${bookingDetails.lastname}.
        E-Mail: ${bookingDetails.email}
        Telefon: ${bookingDetails.phone}
        Datum: ${bookingDetails.date}, Zeit: ${bookingDetails.time}
        Services: ${services.map((s) => `${s.title} (${s.duration} Minuten)`).join(", ")}
        Ungefährer Preis: CHF ${totalPrice}
        Stornierung: Bis spätestens 2 Tage vorher telefonisch möglich.
      `,
            location: "Kirchgasse 3, 9500 Wil, Schweiz",
            geo: { lat: 47.4665641784668, lon: 9.049123764038086 }, // Coordinates
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
        <div>
            <div className={"siteHeader"}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                    Buchungsübersicht
                </Typography>
            </div>

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
                        padding: "20px",
                        borderBottom: { xs: "1px solid gold", md: "1px solid transparent" }, // Border only at the bottom on small screens
                        borderRight: { xs: "1px solid transparent", md: "1px solid gold" },
                        paddingRight: { xs: "0px", md: "20px" },
                        paddingBottom: { xs: "20px", md: "0px" },
                        width: { xs: "100%", md: "auto" }, // Full width for mobile, auto for desktop
                    }}
                >
                    <Box sx={{ p: 2, maxWidth: "500px", margin: "auto", textAlign: "center" }}>
                        <Typography>
                            <strong>Termin ID:</strong> {bookingDetails.uuid}
                        </Typography><Typography>
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
                        <Typography sx={{ mt: 2 }}>
                            <strong>Ungefährer Preis:</strong> CHF {totalPrice}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Ungefähre Dauer:</strong> {totalDuration} Minuten
                        </Typography>
                        <Typography sx={{ mt: 2, fontSize: "0.9em" }}>
                            Stornierung nur telefonisch bis spätestens 2 Tage vor dem Termin möglich.
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: "0.9em" }}>
                            Kontakt: nancy.nails.mail@gmail.com
                        </Typography>
                        <Typography sx={{ mt: 0, fontSize: "0.9em" }}>
                            Tel. +41 79 968 11 84
                        </Typography>
                        <Typography sx={{
                        fontSize: { xs: "0.75rem", md: "0.75rem" }, // Smaller font size
                        color: 'gray', // Gray color
                        width: "100%",
                    }}>
                        Bitte beachten Sie, dass je nach extra der Preis variieren kann.
                    </Typography>
                        <Button
                            variant="contained"
                            className={"buttonColor"}
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
                        title="Nancy Nails"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kirchgasse%203,%209500%20Wil+(Nancy%20Nails)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </Box>
            </Box>
        </div>

    );
}
