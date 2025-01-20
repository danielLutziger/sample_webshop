import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                textAlign: "center",
                py: 3,
                mt: 4,
                background: "linear-gradient(to right, #a7f3d0, #fde68a, #fbcfe8)",
                color: "white",
            }}
        >
            <Typography variant="body2">
                © 2025 Mein Shop. All rights reserved.
            </Typography>
        </Box>
    );
}
