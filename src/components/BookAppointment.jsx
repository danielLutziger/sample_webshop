import { Box, Button, Modal, TextField, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarBooking from "./CalendarBooking.jsx";
import dayjs from "dayjs";

export default function BookAppointment({ cartItems, setCartItems, duration }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formDetails, setFormDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
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
            formDetails.phone.trim()
        );
    };

    const handleFormSubmit = () => {
        if (isFormValid()) {
            const send_object = { ...cartItems, ...formDetails, ...termin };
            console.log(send_object);
            alert(`Thank you, ${formDetails.firstname}! Your appointment has been booked.`);
            setFormDetails({ firstname: "", lastname: "", email: "", phone: "" });
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

                        {selectedSlot && (
                            <Box sx={{mb: 2, border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Zusammenfassung
                                </Typography>
                                <Typography variant="body1">
                                    Gesamtpreis: <strong>CHF {cartItems.reduce((acc, item) => acc + item.price, 0)}.-</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Gesamtdauer: <strong>{duration} Minuten</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Termin: <strong>{selectedDate.format("DD.MM.YYYY")}, {selectedSlot}-{endTime} </strong>
                                </Typography>
                                <Typography variant="body1">
                                    Services: <strong>{cartItems.map(item => item.title).join(", ")}</strong>
                                </Typography>
                            </Box>
                        )}

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
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Telefonnummer"
                            name="phone"
                            color="secondary"
                            value={formDetails.phone}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 3 }}
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
