import {Box, Button, Modal, TextField, IconButton, Typography, FormControlLabel, Checkbox} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarBooking from "./CalendarBooking.jsx";
import dayjs from "dayjs";
import {MuiTelInput} from "mui-tel-input";
import SelectMultipleAppearance from "./ServiceSelection.jsx";
import {useNavigate} from "react-router-dom";
import {api} from "../utils/api.jsx";

// eslint-disable-next-line react/prop-types
export default function BookAppointment({ setCartItems, setBooked, setBookingObject, sx }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
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

    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [estimated_duration, setDuration] = useState(0);
    const [agbChecked, setAgbChecked] = useState(false);

    useEffect(() => {
        const cumsum = items.reduce((acc, val) => acc + val.price, 0);
        setPrice(cumsum);
        const cumsum_time = items.reduce((acc, val) => acc + val.duration, 0);
        setDuration(cumsum_time);
        setCartItems(items);
    }, [items])

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
            !formDetails.emailError &&
            items.length > 0 &&
            agbChecked
        );
    };


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const endTime = selectedSlot ? dayjs(`${selectedDate.format("DD.MM.YYYY")}T${selectedSlot}`, "DD.MM.YYYYTHH:mm")
            .add(estimated_duration, "minute")
            .format("HH:mm")
        : null;

    const handleFormSubmit = () => {
        if (isFormValid()) {
            const send_object = { services: [...items], ...formDetails, ...termin, agbChecked: agbChecked, dateInfo: {date: termin.date, startTime: selectedSlot, endTime: endTime, duration: estimated_duration} };
            console.log(send_object)
            api.post('/api/terminanfrage', send_object)
                .then(response => {
                    console.log('Email sent:', response.data);
                    setFormDetails({ firstname: "", lastname: "", email: "", phone: "" });
                    setBookingObject({uuid: response.data.id, ...send_object});
                    setBooked(true);
                    localStorage.removeItem("cartItems");
                    handleClose();
                    navigate("/appointment");
                })
                .catch(error => {
                    console.error('Failed to send email:', error);
                    alert(error.response.data.detail);
                });
        } else {
            alert("Please fill out all required fields.");
        }
    };


    return (
        <>
            <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ width: "100%", ...sx }}
                    className={"buttonColor"}
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
                            className={"textfieldActive"}
                            value={formDetails.firstname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Nachname"
                            name="lastname"
                            className={"textfieldActive"}
                            value={formDetails.lastname}
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
                        <SelectMultipleAppearance setSelectedServices={setItems} />
                        <Typography sx={{
                            fontSize: { xs: "0.75rem", md: "0.75rem" }, // Smaller font size
                            color: 'gray', // Gray color
                            width: "100%",
                        }}>
                            Bitte beachten Sie, dass je nach extra der Preis variieren kann.
                        </Typography>

                        <Textarea
                            minRows={4}
                            label="Bemerkung"
                            placeholder={"Weitere Wünsche / Bemerkungen"}
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
                            sx={{ mb: 2, mt:2 }}
                        />
                        {items.length > 0 && (
                            <>
                                <Typography sx={{
                                    mt: 2,
                                    fontSize: { xs: "1rem", md: "1rem" },
                                    width: "100%",
                                }}>
                                    Ungefähre Dauer: {estimated_duration} Minuten
                                </Typography>
                                <Typography sx={{
                                    fontSize: { xs: "1rem", md: "1rem" },
                                    fontWeight: 'bold', // Make the price bold
                                    width: "100%",
                                }}>
                                    Ungefährer Preis: CHF {price}
                                </Typography>
                            </>

                        )}

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={agbChecked}
                                    onChange={(e) => setAgbChecked(e.target.checked)}
                                    name="agb"
                                    color="primary"
                                />
                            }
                            label={
                            <Typography sx={{
                                fontSize: { xs: "0.75rem", md: "0.75rem" }, // Smaller font size
                                color: 'gray', // Gray color
                                width: "100%",
                            }}>
                                Bei der Buchung eines Termins werden die <a href="/AGBs/agbs.pdf" target="_blank">allgemeinen Geschäftsbedingungen</a> von Nancy Nails akzeptiert.
                            </Typography>
                        }
                        />

                        <Button
                            className={"buttonColor"}
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
