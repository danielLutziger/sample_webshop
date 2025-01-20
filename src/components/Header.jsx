import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Mein Shop
                </Typography>
                <Box>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Home
                    </Typography>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Services
                    </Typography>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Contact
                    </Typography>
                </Box>
                <Box>
                    <IconButton color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
