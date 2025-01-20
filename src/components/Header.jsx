import React from "react";
import { AppBar, Toolbar, Typography, Box, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ cartItems }) {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            sx={{
                padding: { xs: "5px 10px", md: "10px 20px" }, // Reduce padding for mobile
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    flexWrap: { xs: "wrap", md: "nowrap" }, // Allow wrapping on mobile
                    alignItems: "center",
                }}
            >
                {/* Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: { xs: "1rem", md: "1.5rem" }, // Smaller font for mobile
                        flex: { xs: "1 1 100%", md: "0 0 auto" }, // Full width on mobile
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    Nailstudio
                </Typography>

                {/* Navigation Links */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", md: "flex-end" }, // Center links on mobile
                        flex: { xs: "1 1 100%", md: "0 0 auto" },
                    }}
                >
                    <Typography
                        variant="body2" // Smaller font size
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                    >
                        Home
                    </Typography>
                    <Typography
                        variant="body2"
                        component={Link}
                        to="/services"
                        sx={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                    >
                        Services
                    </Typography>
                    <Typography
                        variant="body2"
                        component={Link}
                        to="/contact"
                        sx={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                    >
                        Kontakt
                    </Typography>

                    {/* Cart Icon */}
                    <IconButton
                        color="inherit"
                        onClick={() => navigate("/cart")}
                        sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                    >
                        <Badge
                            badgeContent={cartItems.length}
                            color="secondary"
                            overlap="circular"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
