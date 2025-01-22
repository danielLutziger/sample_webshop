import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CalendarBooking from "./CalendarBooking.jsx";
export default function BookAppointment({cartItems, setCartItems, duration}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formDetails, setFormDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });

    const [termin, setTermin] = useState({date : "", time: ""});

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormDetails({...formDetails, [name]: value});
    };

    // Validate form inputs
    const isFormValid = () => {
        return (
            formDetails.firstname.trim() &&
            formDetails.lastname.trim() &&
            formDetails.email.trim() &&
            formDetails.phone.trim()
        );
    };

    // Handle form submission
    const handleFormSubmit = () => {
        if (isFormValid()) {
            //TODO: send form somewhere
            const send_object = {...cartItems, ...formDetails, ...termin};
            console.log(send_object);
            alert(`Thank you, ${formDetails.firstname}! Your appointment has been booked.`);
            setFormDetails({firstname: "", lastname: "", email: "", phone: ""});
            setCartItems([]); // Clear the cart after submission
            localStorage.removeItem("cartItems");
        } else {
            alert("Please fill out all required fields.");
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{width: "100%"}}
            >
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
                        mt: 4,
                        p: 3,
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "white",
                    }}
                >
                    <Typography variant="h5" sx={{mb: 3}}>
                        Persönliche Daten
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarBooking appointmentDuration={duration} setTermin={setTermin} />
                        </LocalizationProvider>
                        <TextField
                            label="Vorname"
                            name="firstname"
                            color="secondary"
                            value={formDetails.firstname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Nachname"
                            name="lastname"
                            color="secondary"
                            value={formDetails.lastname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="E-Mail"
                            name="email"
                            color="secondary"
                            value={formDetails.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Telefonnummer"
                            name="phone"
                            color="secondary"
                            value={formDetails.phone}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleFormSubmit}
                            disabled={!isFormValid()} // Disable button if form is invalid
                        >
                            Termin Abschicken
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>

    );
};