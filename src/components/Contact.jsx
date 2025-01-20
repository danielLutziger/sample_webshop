import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContactPage() {
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
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </Box>

            {/* Address Details */}
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
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Nailstudio
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Address:</strong> Bahnhofstrasse 12, 8001 Zürich, Switzerland
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Phone:</strong> +41 44 123 45 67
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Email:</strong> info@nailstudio.ch
                </Typography>
                <Typography variant="body1">
                    <strong>Opening Hours:</strong>
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                    Monday - Friday: 9:00 AM - 7:00 PM
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                    Saturday: 10:00 AM - 6:00 PM
                </Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                    Sunday: Closed
                </Typography>
            </Box>
        </Box>
    );
}
