import React, {useState} from "react";
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import HeroMock from "../service_assets/hero.json";
import {useNavigate} from "react-router-dom";

export default function Hero({setCartItems}) {
    const service = HeroMock;
    const navigate = useNavigate();

    const addToCart = (serv) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.some((item) => item.id === serv.id);
            if (itemExists) {
                return prevItems; // Do not add duplicates
            }
            localStorage.setItem("cartItems", JSON.stringify([...prevItems, serv]));
            return [...prevItems, serv];
        });
    };

    return (
        <Box
            className={"gradientClass"}
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                padding: { xs: "20px", md: "0 5%" },
                height: { xs: "auto", md: "50vh" },
            }}
        >
            {/* Left/Top Side: Text */}
            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    marginBottom: { xs: "20px", md: "0" },
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: "black",
                        mb: 2,
                        fontSize: { xs: "2rem", md: "3rem" },
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
                        margin: { xs: "0 auto", md: "0" },
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
                        margin: { xs: "0 auto", md: "0" },
                    }}
                >
                    CHF {service.price}.-
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
                    onClick={() => {
                        addToCart(service)
                        navigate('/cart')
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
                    maxWidth: { xs: "100%", md: "40%" },
                    maxHeight: { xs: "300px", md: "auto" }, // Restrict height on smaller screens
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    alignSelf: "center",
                    objectFit: "cover", // Ensure image scales proportionally
                }}
            />
        </Box>
    );
}
