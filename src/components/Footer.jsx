import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            className={"colorClass"}
            sx={{
                textAlign: "center",
                py: 3,
                mt: 4,
                color: "white",
            }}
        >
            <Typography variant="body2">
                © 2025 Nancy Nails. Alle Rechte vorbehalten.
            </Typography>
        </Box>
    );
}
