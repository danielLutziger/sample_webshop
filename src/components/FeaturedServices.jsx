import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Feature_Img1 from "../assets/img_4.png";
import Feature_Img2 from "../assets/img_1.png";
import Feature_Img3 from "../assets/img_2.png";
import Feature_Img4 from "../assets/img_3.png";

export default function FeaturedServices() {
    const navigate = useNavigate();

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
        slidesToShow: 3,
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

    return (
        <div>
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
                                padding: 2,
                                maxWidth: 300,
                                margin: "0 auto",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(`/product/${service.id}`)} // Navigate to detail page
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
                                        alert(`${service.title} added to cart!`);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </div>
    );
}
