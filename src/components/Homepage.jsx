import Hero from "./Hero.jsx";
import {Container} from "@mui/material";
import FeaturedServices from "./FeaturedServices.jsx";
import React from "react";

export default function Homepage({cartItems, setCartItems, setBookingObject, setBooked}){
    return (
        <main>
            <Hero setCartItems={setCartItems} setBooked={setBooked} setBookingObject={setBookingObject} />
        </main>
    )
}