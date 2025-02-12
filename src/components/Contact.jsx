import "react";
import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {MuiTelInput} from "mui-tel-input";
import Textarea from "@mui/joy/Textarea";
import React, {useState} from "react";
import {api} from "../utils/api.jsx";

export default function ContactPage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formDetails, setFormDetails] = useState({
        firstname: "",
        email: "",
        phone: "",
        bemerkung: "",
        phoneError: false,
        emailError: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const isFormValid = () => {
        return (
            formDetails.firstname.trim() &&
            formDetails.email.trim() &&
            formDetails.phone.trim() &&
            !formDetails.phoneError &&
            !formDetails.emailError
        );
    };

    const handleFormSubmit = () => {
        if (isFormValid()) {
            console.log(formDetails)
            api.post('/api/anliegen_melden', formDetails)
                .then(response => {
                    console.log('Email sent:', response.data);
                    setFormDetails({ firstname: "", lastname: "", email: "", phone: "" });
                    handleClose();
                })
                .catch(error => {
                    console.error('Failed to send email:', error);
                    alert(error.response.data.detail);
                });
        } else {
            alert("Alle Felder ausfüllen bitte.");
        }
    };

    return (
        <div>
            <div className={"siteHeader"}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                    Kontaktinformationen
                </Typography>
            </div>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
                    alignItems: "flex-start",
                    gap: 4,
                    maxWidth: "1200px",
                    margin: "auto",
                    padding: "10px",
                }}
            >
                {/* Google Maps iframe */}
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        borderBottom: { xs: "1px solid gold", md: "1px solid transparent" }, // Border only at the bottom on small screens
                        borderRight: { xs: "1px solid transparent", md: "1px solid gold" },
                        paddingRight: { xs: "0px", md: "20px" },
                        paddingBottom: { xs: "20px", md: "0px" },
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "300px", md: "400px" },
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxSizing: "border-box", // Includes padding and border in the width and height
                        }}
                    >
                        <iframe
                            title="Nancy Nails"
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kirchgasse%203,%209500%20Wil+(Nancy%20Nails)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </Box>
                </Box>

                {/* Address Details */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "white",
                        padding: "10px",
                        minWidth: { xs: "260px", md: "280px" }, // Mindestbreite für Konsistenz
                        maxWidth: { xs: "100%", md: "300px" }, // Maximale Breite für große Bildschirme
                        whiteSpace: "nowrap", // Verhindert Zeilenumbrüche
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 0 }}>
                        <strong>Adresse:</strong>
                    </Typography>
                    <Typography variant="body2">
                        Kirchgasse 3, 9500 Wil, Switzerland
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0, mt: 3 }}>
                        <strong>Kontaktnummer:</strong>
                    </Typography>
                    <Typography variant="body2">
                        +41 79 968 11 84
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3 }}>
                        <strong>Email:</strong>
                    </Typography>
                    <Typography variant="body2">
                        nancy.nails.mail@gmail.com
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3 }}>
                        <strong>Öffnungszeiten:</strong>
                    </Typography>
                    <Typography variant="body2">Montag - Freitag: 9:00 - 18:30</Typography>
                    <Typography variant="body2">Samstag: 09:00 - 16:00</Typography>
                    <Typography variant="body2">Sonntag: Geschlossen</Typography>

                    {/* Anliegen mitteilen */}
                    <>
                        <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ width: "100%", mt:3 }}
                                className={"buttonColor"}
                        >
                            Anliegen mitteilen
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "90%", // Adjust width as needed
                                    maxWidth: "600px",
                                    maxHeight: "90%", // Ensure it doesn't overflow vertically
                                    bgcolor: "white",
                                    boxShadow: 24,
                                    borderRadius: "8px",
                                    overflow: "auto", // Make content scrollable
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 2,
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    <Typography variant="h4">
                                        Anliegen mitteilen
                                    </Typography>
                                    <IconButton onClick={handleClose} size="small">
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{p:3}}>

                                    <TextField
                                        label="Vorname"
                                        name="firstname"
                                        className={"textfieldActive"}
                                        value={formDetails.firstname}
                                        onChange={handleInputChange}
                                        required
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="E-Mail"
                                        name="email"
                                        className={"textfieldActive"}
                                        value={formDetails.email}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            // Validate the email format
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            const isValidEmail = emailRegex.test(value);

                                            // Update the form details, including the error flag
                                            setFormDetails({
                                                ...formDetails,
                                                [name]: value,
                                                emailError: !isValidEmail && value !== "", // Set error only if not valid and not empty
                                            });
                                        }}
                                        required
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        error={formDetails.emailError} // Use emailError for validation
                                        helperText={
                                            formDetails.emailError
                                                ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
                                                : ""
                                        }
                                    />
                                    <MuiTelInput
                                        id="phone"
                                        label="Telefonnummer"
                                        placeholder="Telefonnummer *"
                                        name="phone"
                                        className={"textfieldActive"}
                                        value={formDetails.phone}
                                        onChange={(value) => {
                                            // Define regex for Swiss, German, and Austrian phone numbers
                                            const swissPhoneRegex = /^(\+41) ([1-9]{1}[0-9]{1}) [0-9]{3} [0-9]{2} [0-9]{2}$/; // e.g., +41 79 123 45 67
                                            const germanPhoneRegex = /^(\+49) ([1-9]{4}) [0-9]{5,}$/; // e.g., +49 1234 12345
                                            const austrianPhoneRegex = /^(\+43) ([1-9]{4}) [0-9]{5,}$/; // e.g., +43 1234 12345

                                            // Check if the input matches any of the formats
                                            const isValid =
                                                swissPhoneRegex.test(value) ||
                                                germanPhoneRegex.test(value) ||
                                                austrianPhoneRegex.test(value);

                                            setFormDetails({
                                                ...formDetails,
                                                phone: value,
                                                phoneError: !isValid, // Add an error flag for validation
                                            });
                                        }}
                                        required
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        defaultCountry="CH"
                                        error={formDetails.phoneError}
                                        helperText={
                                            formDetails.phoneError
                                                ? "Bitte geben Sie eine gültige Telefonnummer aus der Schweiz, Deutschland oder Österreich ein."
                                                : ""
                                        }
                                    />

                                    <Textarea
                                        minRows={4}
                                        label="Bemerkung"
                                        placeholder={"Wie können wir die weiterhelfen?"}
                                        name="bemerkung"
                                        variant="outlined"
                                        className={"textfieldActive"}
                                        value={formDetails.bemerkung}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setFormDetails({
                                                ...formDetails,
                                                [name]: value
                                            });
                                        }}
                                        fullWidth
                                        sx={{ mb: 2, mt:1 }}
                                    />

                                    <Button
                                        className={"buttonColor"}
                                        onClick={handleFormSubmit}
                                        disabled={!isFormValid()}
                                        fullWidth
                                    >
                                        Anliegen mitteilen
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </>
                </Box>
            </Box>
        </div>
    );
}
