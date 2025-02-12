import { useState } from "react";
import {Box, Typography} from "@mui/material";
import BookAppointment from "./BookAppointment.jsx";
import BookingSummary from "./BookingSummary.jsx";

// eslint-disable-next-line react/prop-types
export default function CartPage({ setCartItems}) {
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
                            <BookAppointment setCartItems={setCartItems}
                                             setBooked={setBooked}
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
