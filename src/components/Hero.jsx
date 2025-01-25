import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/bagel-fat-one";

export default function Hero({setCartItems}) {
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
                        fontSize: { xs: "2.5rem", md: "4rem" },
                        fontFamily: "'bagel fat one'",
                    }}
                >
                    Nancy Nails ❤️
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "black",
                        mb: 3,
                        maxWidth: "80%",
                        margin: { xs: "0 auto", md: "0" },
                        fontFamily: "'Montserrat', sans-serif", // Font from the image
                        fontSize: { xs: "16px", md: "18px" }, // Responsive font size
                        lineHeight: 1.5, // Adjust for readability
                        fontWeight: 400, // Regular weight
                    }}
                >
                    Entdecken Sie unser Angebot an luxuriösen Nagelpflege-Dienstleistungen, von Maniküre und Pediküre bis hin zu individuell gestaltetem Nageldesign. Entspannen Sie sich in unserer ruhigen Atmosphäre und lassen Sie sich von uns verwöhnen.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#8e44ad",
                        color: "white",
                        padding: "10px 20px",
                        fontSize: { xs: "1rem", md: "1rem" },
                        width: "80%",
                        mt: 2,
                        fontFamily: "'bagel fat one'",
                        ":hover": {
                            backgroundColor: "#732d91",
                        },
                    }}
                    onClick={() => {
                        navigate('/services')
                    }}
                >
                    Services Entdecken
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#8e44ad",
                        color: "white",
                        mt: 2,
                        padding: "10px 20px",
                        fontSize: { xs: "1rem", md: "1rem" },
                        width: "80%",
                        fontFamily: "'bagel fat one'",
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
                src={"/assets/hello_kitty.png"}
                alt="Hero Image"
                sx={{
                    flex: 1,
                    maxWidth: { xs: "100%", md: "40%" },
                    maxHeight: { xs: "575px", md: "auto" }, // Restrict height on smaller screens
                    height: "auto",
                    alignSelf: "center",
                    objectFit: "cover", // Ensure image scales proportionally
                }}
            />
        </Box>
    );
}
