import "react";
import { Box, Typography } from "@mui/material";

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
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        borderBottom: { xs: "1px solid gold", md: "1px solid transparent" }, // Border only at the bottom on small screens
                        borderRight: { xs: "1px solid transparent", md: "1px solid gold" },
                        paddingRight: { xs: "0px", md: "20px" },
                        paddingBottom: { xs: "20px", md: "0px" },
                    }}
                >
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
                        padding: "10px",
                        minWidth: { xs: "260px", md: "280px" }, // Mindestbreite für Konsistenz
                        maxWidth: { xs: "100%", md: "300px" }, // Maximale Breite für große Bildschirme
                        whiteSpace: "nowrap", // Verhindert Zeilenumbrüche
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 0 }}>
                        <strong>Adresse:</strong>
                    </Typography>
                    <Typography variant="body2">
                        Kirchgasse 3, 9500 Wil, Switzerland
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0, mt: 3 }}>
                        <strong>Kontaktnummer:</strong>
                    </Typography>
                    <Typography variant="body2">
                        +41 79 968 11 84
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3 }}>
                        <strong>Email:</strong>
                    </Typography>
                    <Typography variant="body2">
                        nancy.nails.mail@gmail.com
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3 }}>
                        <strong>Öffnungszeiten:</strong>
                    </Typography>
                    <Typography variant="body2">Montag - Freitag: 9:00 - 18:30</Typography>
                    <Typography variant="body2">Samstag: 09:00 - 16:00</Typography>
                    <Typography variant="body2">Sonntag: Geschlossen</Typography>
                </Box>
            </Box>
        </div>
    );
}
