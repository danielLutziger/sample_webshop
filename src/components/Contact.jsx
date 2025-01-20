import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContactPage() {
    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                Kontakt
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
                Visit us at our studio or contact us for more information.
            </Typography>

            {/* Google Maps iframe */}
            <Box
                sx={{
                    width: "100%",
                    height: "400px",
                    border: "none",
                    overflow: "hidden",
                    borderRadius: "8px",
                }}
            >
                <iframe
                    title="Studio Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5101185917725!2d8.539182315900447!3d47.376886679168516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMSczMS4zIkU!5e0!3m2!1sen!2sch!4v1679943533856!5m2!1sen!2sch"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </Box>
        </Box>
    );
}
