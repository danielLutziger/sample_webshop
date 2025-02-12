import "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ServicesMock from "../service_assets/services.json";

const services = ServicesMock;

export default function ServicesPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className={"siteHeader"}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                    Services und Preise
                </Typography>
            </div>
            <Box sx={{ padding: "10px", maxWidth: "1200px", margin: "auto" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 2,
                    }}
                >
                    {services.map((service) => (
                        <Card
                            key={service.id}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                textAlign: "left",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                                "&:hover": { transform: "scale(1.03)" },
                            }}
                            onClick={() => navigate(`/product/${service.id}`)}
                        >
                            {service.image && (
                                <Box
                                    component="img"
                                    src={service.image}
                                    alt="Service Bild"
                                    sx={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "8px 0 0 8px",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <CardContent sx={{ flex: "1", padding: "8px" }}>
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
                                <Typography variant="body1" color={"#272727"}>
                                    CHF {service.price}.-
                                </Typography>
                                <Typography variant="body2" color={"#272727"}>
                                    Dauer: ~{service.duration} Minuten
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>

    );
}
