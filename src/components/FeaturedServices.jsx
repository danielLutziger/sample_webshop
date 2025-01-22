import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Specials_and_Bestsellers from "../service_assets/specials_and_bestsellers.json"

export default function FeaturedServices({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const services = Specials_and_Bestsellers;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Add item to cart
    const addToCart = (service) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.some((item) => item.id === service.id);
            if (itemExists) {
                setSnackbar({ open: true, message: `"${service.title}" already added.`, severity: "info" });
                return prevItems; // Do not add duplicates
            }
            setSnackbar({ open: true, message: `"${service.title}" was added to the cart.`, severity: "success" });
            localStorage.setItem("cartItems", JSON.stringify([...prevItems, service]));
            return [...prevItems, service];
        });
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: "", severity: "success" });
    };

    console.log(services)
    return (
        <div
            style={{
                overflow: "hidden",
                margin: "0 auto",
                padding: "0 10px",
                maxWidth: "100%",
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                sx={{ textAlign: "center", mb: 4 }}
            >
                Special Deals und Bestsellers
            </Typography>
            <Slider {...settings}>
                {services.map((service, idx) => (
                    <Box key={idx} sx={{ px: 2 }}>
                        <Card
                            sx={{
                                textAlign: "center",
                                padding: 0,
                                maxWidth: 300,
                                margin: "0 auto",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${service.id}`)}
                        >
                            <Box
                                component="img"
                                src={service.image}
                                alt="Hero Image"
                                className={"colorClass"}
                                sx={{
                                    width: "100%",
                                    height: "150px",
                                    borderRadius: "8px",
                                    mb: 2,
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {service.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    {service.description}
                                </Typography>
                                <Typography variant="body1" color="secondary">
                                    CHF {service.price}.-
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Dauer: ~{service.duration} Minuten
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigating when button is clicked
                                        addToCart(service); // Add the item to the cart
                                    }}
                                >
                                    Service buchen
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000} // Close automatically after 3 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
