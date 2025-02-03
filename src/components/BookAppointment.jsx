import {Box, Button, Modal, TextField, IconButton, Typography} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarBooking from "./CalendarBooking.jsx";
import dayjs from "dayjs";
import {MuiTelInput} from "mui-tel-input";

export default function BookAppointment({ cartItems, setCartItems, duration, setBooked, setBookingObject }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formDetails, setFormDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        bemerkung: "",
        phoneError: false,
        emailError: false
    });

    const [termin, setTermin] = useState({ date: "", time: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const isFormValid = () => {
        return (
            formDetails.firstname.trim() &&
            formDetails.lastname.trim() &&
            formDetails.email.trim() &&
            formDetails.phone.trim() &&
            termin.date &&
            termin.time &&
            !formDetails.phoneError &&
            !formDetails.emailError
        );
    };

    const handleFormSubmit = () => {
        if (isFormValid()) {
            const send_object = { ...cartItems, ...formDetails, ...termin };
            setFormDetails({ firstname: "", lastname: "", email: "", phone: "" });
            setBookingObject(send_object);
            setBooked(true);
            setCartItems([]);
            localStorage.removeItem("cartItems");
            handleClose();
        } else {
            alert("Please fill out all required fields.");
        }
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const endTime = selectedSlot ? dayjs(`${selectedDate.format("DD.MM.YYYY")}T${selectedSlot}`, "DD.MM.YYYYTHH:mm")
            .add(duration, "minute")
            .format("HH:mm")
        : null;

    return (
        <>
            <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ width: "100%" }}>
                Termin Vereinbaren
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
                            Buchung
                        </Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarBooking  setTermin={setTermin}
                                             selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}
                                             selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Vorname"
                            name="firstname"
                            color="secondary"
                            value={formDetails.firstname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Nachname"
                            name="lastname"
                            color="secondary"
                            value={formDetails.lastname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="E-Mail"
                            name="email"
                            color="secondary"
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
                            color="secondary"
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
                            sx={{ mb: 3 }}
                            defaultCountry="CH"
                            error={formDetails.phoneError}
                            helperText={
                                formDetails.phoneError
                                    ? "Bitte geben Sie eine gültige Telefonnummer aus der Schweiz, Deutschland oder Österreich ein."
                                    : ""
                            }
                        />

                        {/*Services*/}
                        <></>

                        <Textarea
                            minRows={4}
                            label="Bemerkung"
                            placeholder={"Weitere Wünsche / Bemerkungen"}
                            name="bemerkung"
                            variant="outlined"
                            value={formDetails.bemerkung}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setFormDetails({
                                    ...formDetails,
                                    [name]: value
                                });
                            }}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleFormSubmit}
                            disabled={!isFormValid()}
                            fullWidth
                        >
                            Termin Abschicken
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
