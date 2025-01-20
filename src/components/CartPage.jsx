import React, { useState, useEffect } from "react";
import {Box, Typography, Button, TextField, Snackbar, Alert} from "@mui/material";

export default function CartPage({ cartItems, setCartItems }) {
    // State for showing the form
    const [showForm, setShowForm] = useState(false);
    const [formDetails, setFormDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    // Handle item deletion
    const handleDelete = (id) => {
        const item = cartItems.find((item) => item.id === id);
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        setSnackbar({ open: true, message: `"${item.title}" was removed.`, severity: "error" });
    };

    // Automatically close the form if the cart becomes empty
    useEffect(() => {
        if (cartItems.length === 0) {
            setShowForm(false);
        }
    }, [cartItems]);

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
            alert(`Thank you, ${formDetails.firstname}! Your appointment has been booked.`);
            setFormDetails({ firstname: "", lastname: "", email: "", phone: "" });
            setCartItems([]); // Clear the cart after submission
            setShowForm(false);
        } else {
            alert("Please fill out all required fields.");
        }
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: "", severity: "success" });
    };

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                Dein Warenkorb
            </Typography>

            {/* Cart Items */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "10px",
                                gap: 2,
                            }}
                        >
                            {/* Item Image */}
                            <Box
                                component="img"
                                src={item.image}
                                alt={item.title}
                                sx={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
                            {/* Item Details */}
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body1" color="primary">
                                    {item.price}
                                </Typography>
                            </Box>
                            {/* Delete Button */}
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDelete(item.id)}
                            >
                                Löschen
                            </Button>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ textAlign: "center" }}>Dein Warenkorb ist leer.</Typography>
                )}
            </Box>

            {/* Booking Button */}
            {cartItems.length > 0 && (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowForm(true)}
                    >
                        Termin Vereinbaren
                    </Button>
                </Box>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000} // Close automatically after 3 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Booking Form */}
            {showForm && cartItems.length > 0 && (
                <Box
                    sx={{
                        mt: 4,
                        p: 3,
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "white",
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Persönliche Daten
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Vorname"
                            name="firstname"
                            value={formDetails.firstname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Nachname"
                            name="lastname"
                            value={formDetails.lastname}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="E-Mail"
                            name="email"
                            value={formDetails.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Telefonnummer"
                            name="phone"
                            value={formDetails.phone}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFormSubmit}
                            disabled={!isFormValid()} // Disable button if form is invalid
                        >
                            Termin Abschicken
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
