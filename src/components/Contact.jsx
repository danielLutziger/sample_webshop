import React from "react";
import { Box, Typography } from "@mui/material";
import {height} from "@mui/system";

export default function ContactPage() {
    return (
        <div>

            <div className={"siteHeader"}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                    Kontaktinformationen
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
                    padding: "10px",
                }}
            >
                {/* Google Maps iframe */}
                <Box sx={{height: "100%", width: "100%", borderBottom: { xs: "1px solid gold", md: "1px solid transparent" }, // Border only at the bottom on small screens
                    borderRight: { xs: "1px solid transparent", md: "1px solid gold" },
                    paddingRight: { xs: "0px", md: "20px" },
                    paddingBottom: { xs: "20px", md: "0px" }}}>
                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "300px", md: "400px" },
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxSizing: "border-box", // Includes padding and border in the width and height
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

                {/* Address Details */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "white",
                        /*borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", */
                        padding: "10px",
                        width: { xs: "100%", md: "auto" },
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Adresse:</strong> Kirchgasse 3, 9500 Wil, Switzerland
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Kontaktnummer:</strong> +41 79 968 11 84
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Email:</strong> nancy.nail.mail@gmail.com
                    </Typography>
                    <Typography variant="body1">
                        <strong>Öffnungszeiten:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Montag - Freitag: 9:00 - 18:30
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Samstag: 09:00 - 16:00
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Sonntag: Geschlossen
                    </Typography>
                </Box>
            </Box>
        </div>

    );
}
