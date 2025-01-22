import React from "react";
import { Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";

export default function BookingSummary({ bookingDetails }) {
    const services = Object.values(bookingDetails).filter((item) => item.price !== undefined);
    const totalPrice = services.reduce((acc, service) => acc + service.price, 0);
    const totalDuration = services.reduce((acc, service) => acc + service.duration, 0);

    const generateICSFile = () => {
        const startTime = `${bookingDetails.date.replace(/\./g, "")}T${bookingDetails.time.replace(
            ":",
            ""
        )}`;
        const endTime = `${bookingDetails.date.replace(/\./g, "")}T${dayjs(
            bookingDetails.time,
            "HH:mm"
        )
            .add(totalDuration, "minute")
            .format("HHmm")}`;
        const icsContent = `
                BEGIN:VCALENDAR
                VERSION:2.0
                BEGIN:VEVENT
                SUMMARY:Booking for ${services.map((s) => s.title).join(", ")}
                DTSTART:${startTime}
                DTEND:${endTime}
                DESCRIPTION:Booking for ${bookingDetails.firstname} ${bookingDetails.lastname}.
                END:VEVENT
                END:VCALENDAR`;
        return URL.createObjectURL(new Blob([icsContent], { type: "text/calendar" }));
    };

    return (
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
            <Typography>
                <strong>Preis:</strong> CHF {totalPrice}.-
            </Typography>
            <Typography>
                <strong>Dauer:</strong> {totalDuration} Minuten
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                href={generateICSFile()}
                download="appointment.ics"
                sx={{ mt: 2 }}
            >
                Kalenderdatei herunterladen
            </Button>
        </Box>
    );
}
