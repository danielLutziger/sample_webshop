import React from "react";
import { Box, Button, Typography } from "@mui/material";
import HeroImage from "../assets/img.png";

export default function Hero() {
    const service = {
        title: "Custom Nails",
        price: "CHF 69.-",
        description: "High-quality nail service, washing hands, and shaking them",
        image: HeroImage,
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack for mobile, row for desktop
                alignItems: "center", // Vertically center content
                justifyContent: "center", // Center items horizontally
                background: "linear-gradient(to right, #a7f3d0, #fde68a, #fbcfe8)",
                padding: { xs: "20px", md: "0 5%" }, // Adjust padding for mobile and desktop
                height: { xs: "auto", md: "50vh" }, // Full height for desktop, auto for mobile
            }}
        >
            {/* Left/Top Side: Text */}
            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" }, // Center text for mobile, left-align for desktop
                    marginBottom: { xs: "20px", md: "0" }, // Add margin for mobile spacing
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: "black",
                        mb: 2,
                        fontSize: { xs: "2rem", md: "3rem" }, // Adjust font size for mobile
                    }}
                >
                    {service.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "black",
                        mb: 3,
                        maxWidth: "80%",
                        margin: { xs: "0 auto", md: "0" }, // Center text block on mobile
                    }}
                >
                    {service.description}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "black",
                        mb: 3,
                        maxWidth: "80%",
                        margin: { xs: "0 auto", md: "0" }, // Center text block on mobile
                    }}
                >
                    {service.price}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#8e44ad",
                        color: "white",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        ":hover": {
                            backgroundColor: "#732d91",
                        },
                    }}
                >
                    Termin vereinbaren
                </Button>
            </Box>

            {/* Right/Bottom Side: Image */}
            <Box
                component="img"
                src={service.image}
                alt="Hero Image"
                sx={{
                    flex: 1,
                    maxWidth: { xs: "100%", md: "40%" }, // Full width for mobile, constrained for desktop
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    alignSelf: "center", // Vertically centers the image within its flex container
                }}
            />
        </Box>
    );
}
