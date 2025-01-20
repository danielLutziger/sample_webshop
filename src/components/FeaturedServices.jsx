import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Feature_Img1 from "../assets/img_4.png";
import Feature_Img2 from "../assets/img_1.png";
import Feature_Img3 from "../assets/img_2.png";
import Feature_Img4 from "../assets/img_3.png";

export default function FeaturedServices({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const services = [
        {
            id: "1",
            title: "Service 1",
            price: "CHF 19.99",
            description: "High-quality service tailored for your needs.",
            image: Feature_Img1,
        },
        {
            id: "2",
            title: "Service 2",
            price: "CHF 29.99",
            description: "Affordable and efficient service solutions.",
            image: Feature_Img2,
        },
        {
            id: "3",
            title: "Service 3",
            price: "CHF 39.99",
            description: "Experience premium quality services.",
            image: Feature_Img3,
        },
        {
            id: "4",
            title: "Service 4",
            price: "CHF 49.99",
            description: "Exceptional service guaranteed every time.",
            image: Feature_Img4,
        },
        {
            id: "5",
            title: "Service 5",
            price: "CHF 59.99",
            description: "Exceptional service guaranteed every time.",
            image: "",
        },
    ];

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
            return [...prevItems, service];
        });
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: "" });
    };

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
                Special Deals and Bestsellers
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
                                sx={{
                                    width: "100%",
                                    height: "150px",
                                    background: service.image
                                        ? `url(${service.image}) center/cover`
                                        : "linear-gradient(to right, #a7f3d0, #fde68a, #fbcfe8)",
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
                                <Typography variant="body1" color="primary">
                                    {service.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigating when button is clicked
                                        addToCart(service); // Add the item to the cart
                                    }}
                                >
                                    Add to Cart
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
