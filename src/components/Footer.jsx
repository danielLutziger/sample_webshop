// Footer component
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            className={"footerColorScheme"}
            sx={{
                textAlign: "center",
                py: 3,
                color: "white",
                mt: 'auto'
            }}
        >
            <Typography variant="body2"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                        }}>
                © 2025 Nancy Nails. Alle Rechte vorbehalten.
            </Typography>
        </Box>
    );
}
