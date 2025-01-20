import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
export default function Header() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Nailstudio
                </Typography>
                <Box>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Home
                    </Typography>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Services und Preise
                    </Typography>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Kontakt
                    </Typography>
                </Box>
                <Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
