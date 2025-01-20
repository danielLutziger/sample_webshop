import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "white" }}>
                    Nailstudio
                </Typography>
                <Box>
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/"
                        sx={{ mx: 2, textDecoration: "none", color: "white" }}
                    >
                        Home
                    </Typography>
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/services"
                        sx={{ mx: 2, textDecoration: "none", color: "white" }}
                    >
                        Services und Preise
                    </Typography>
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/contact"
                        sx={{ mx: 2, textDecoration: "none", color: "white" }}
                    >
                        Kontakt
                    </Typography>
                    <Typography
                        variant="body1"
                        component={Link}
                        to="/cart"
                        sx={{ mx: 2, textDecoration: "none", color: "white" }}
                    >
                        Warenkorb
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
