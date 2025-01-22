import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import Feature_Img1 from "../assets/img_4.png";
import Feature_Img2 from "../assets/img_1.png";
import Feature_Img3 from "../assets/img_2.png";
import Feature_Img4 from "../assets/img_3.png";

const services = [
    {
        id: "1",
        title: "Service 1",
        price: "CHF 19.99",
        description: "High-quality service tailored for your needs.",
        image: Feature_Img1,
        duration: 60
    },
    {
        id: "2",
        title: "Service 2",
        price: "CHF 29.99",
        description: "Affordable and efficient service solutions.",
        image: Feature_Img2,
        duration: 30
    },
    {
        id: "3",
        title: "Service 3",
        price: "CHF 39.99",
        description: "Experience premium quality services.",
        image: Feature_Img3,
        duration: 45
    },
    {
        id: "4",
        title: "Service 4",
        price: "CHF 49.99",
        description: "Exceptional service guaranteed every time.",
        image: Feature_Img4,
        duration: 60
    },
];

export default function ServicesPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                Services und Preise
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 3,
                }}
            >
                {services.map((service) => (
                    <Card
                        key={service.id}
                        sx={{
                            textAlign: "center",
                            padding: 2,
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                        onClick={() => navigate(`/product/${service.id}`)} // Navigate to the product detail page
                    >
                        <Box
                            className={"colorClass"}
                            sx={{
                                width: "100%",
                                height: "150px",
                                background: service.image && `url(${service.image}) center/cover`,
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
                ))}
            </Box>
        </Box>
    );
}
