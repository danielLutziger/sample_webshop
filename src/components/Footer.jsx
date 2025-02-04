// Footer component
import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Footer() {
    return (
        <Box
            className={"footerColorScheme"}
            sx={{
                textAlign: "center",
                py: 3,
                bottom: 0,
            }}
        >
            <IconButton aria-label="instagram" color="inherit" href="https://www.instagram.com/n.a.n.c.y_n.a.i.l.s/">
                <InstagramIcon />
            </IconButton>
            <IconButton aria-label="email" color="inherit" href="mailto:nancy.nails.mail@gmail.com">
                <EmailIcon />
            </IconButton>
            <IconButton aria-label="whatsapp" color="inherit" href="https://wa.me/+41799681184">
                <WhatsAppIcon />
            </IconButton>
            <Typography variant="body2"
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                        }}>
                © 2025 Nancy Nails. Alle Rechte vorbehalten.
            </Typography>
        </Box>
    );
}
