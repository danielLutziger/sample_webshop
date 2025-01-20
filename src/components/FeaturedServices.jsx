import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Feature_Img1 from "../assets/img_4.png";
import Feature_Img2 from "../assets/img_1.png";
import Feature_Img3 from "../assets/img_2.png";
import Feature_Img4 from "../assets/img_3.png";


export default function FeaturedServices() {
    /*
    * TODO: adjust this from json file which could be loaded from an excel.
    * TODO: here we could add specials!
    * */
    const services = [
        {
            title: "Service 1",
            price: "CHF 19.99",
            description: "High-quality service tailored for your needs.",
            image: Feature_Img1
        },
        {
            title: "Service 2",
            price: "CHF 29.99",
            description: "Affordable and efficient service solutions.",
            image: Feature_Img2
        },
        {
            title: "Service 3",
            price: "CHF 39.99",
            description: "Experience premium quality services.",
            image: Feature_Img3
        },
        {
            title: "Service 4",
            price: "CHF 49.99",
            description: "Exceptional service guaranteed every time.",
            image: "",
        },
        {
            title: "Service 5",
            price: "CHF 59.99",
            description: "Reliable and trusted services for everyone.",
            image: Feature_Img4
        },
        {
            title: "Service 6",
            price: "CHF 59.99",
            description: "Reliable and trusted services for everyone.",
            image: ""
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
                Special Deals und Bestsellers
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
                            }}
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
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </div>
    );
}
