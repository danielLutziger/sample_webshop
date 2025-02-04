import React, { useState, useEffect } from "react";
import {Box, Typography, Button, Snackbar, Alert} from "@mui/material";
import BookAppointment from "./BookAppointment.jsx";
import BookingSummary from "./BookingSummary.jsx";
import SelectMultipleAppearance from "./ServiceSelection.jsx";
export default function CartPage({ cartItems, setCartItems}) {
    const [booked, setBooked] = useState(false);
    const [bookingObject, setBookingObject] = useState({});


    return (
        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            {!booked && (
                <>
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                        Services im Warenkorb
                    </Typography>

                        <Box sx={{ textAlign: "center", mt: 4 }}>
                            <BookAppointment cartItems={cartItems} setCartItems={setCartItems}
                                             duration={duration} setBooked={setBooked}
                                             setBookingObject={setBookingObject} />
                        </Box>
                </>
            )}

            {booked && (
                <BookingSummary bookingDetails={bookingObject} />
            )}

        </Box>
    );
}
