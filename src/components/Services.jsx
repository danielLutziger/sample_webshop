import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ServicesMock from "../service_assets/services.json";

const services = ServicesMock;

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
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                        onClick={() => navigate(`/product/${service.id}`)} // Navigate to the product detail page
                    >
                        <Box
                            component="img"
                            src={new URL(service.image, import.meta.url).href}
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
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
