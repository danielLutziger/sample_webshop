import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/montserrat";
export default function Footer() {
    return (
        <Box
            className={"footerColorScheme"}
            sx={{
                textAlign: "center",
                py: 3,
                color: "white",
                bottom: 0
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
