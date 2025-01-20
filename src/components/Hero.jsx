import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Box
            sx={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: "linear-gradient(to right, #a7f3d0, #fde68a, #fbcfe8)",
                color: "white",
                padding: 4,
            }}
        >
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
                Browse Our Latest Products
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 4 }}>
                Discover exclusive deals and trending services.
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ fontWeight: "bold" }}
            >
                Shop Now
            </Button>
        </Box>
    );
}
