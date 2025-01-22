import React, { useState, useEffect } from "react";
import {Box, Typography, Button, Snackbar, Alert} from "@mui/material";
import BookAppointment from "./BookAppointment.jsx";
import BookingSummary from "./BookingSummary.jsx";
export default function CartPage({ cartItems, setCartItems }) {
    // State for showing the form
    const [duration, setDuration] = useState(60);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
    const [booked, setBooked] = useState(false);
    const [bookingObject, setBookingObject] = useState({});

    // Handle item deletion
    const handleDelete = (id) => {
        const item = cartItems.find((item) => item.id === id);
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setSnackbar({ open: true, message: `"${item.title}" was removed.`, severity: "error" });
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: "", severity: "error" });
    };

    useEffect(() => {
        const dur = cartItems.reduce((acc, item) => {
            return acc + item.duration;
        }, 0);
        setDuration(dur);
    }, [cartItems]);

    console.log(bookingObject)

    return (
        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            {!booked && (
                <>
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                        Services im Warenkorb
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
                                        src={new URL(item.image, import.meta.url).href}
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
                                        <Typography variant="body1" color="secondary">
                                            Preis: CHF {item.price}.-
                                        </Typography>
                                        <Typography variant="body1" color="secondary">
                                            Dauer: circa {item.duration} Minuten
                                        </Typography>
                                    </Box>
                                    {/* Delete Button */}
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Entfernen
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: "center" }}>Dein Warenkorb ist leer.</Typography>
                        )}
                    </Box>

                    {/* Booking Resume */}
                    {cartItems.length > 0 && (
                        <Box sx={{ mt: 4, border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Buchungszusammenfassung
                            </Typography>
                            <Typography variant="body1">
                                Gesamtpreis: <strong>CHF {cartItems.reduce((acc, item) => acc + item.price, 0)}.-</strong>
                            </Typography>
                            <Typography variant="body1">
                                Gesamtdauer: <strong>{duration} Minuten</strong>
                            </Typography>
                        </Box>
                    )}

                    {/* Booking Button */}
                    {cartItems.length > 0 && (
                        <Box sx={{ textAlign: "center", mt: 4 }}>
                            <BookAppointment cartItems={cartItems} setCartItems={setCartItems}
                                             duration={duration} setBooked={setBooked}
                                             setBookingObject={setBookingObject} />
                        </Box>
                    )}
                </>
            )}

            {booked && (
                <BookingSummary bookingDetails={bookingObject} />
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
        </Box>
    );
}
