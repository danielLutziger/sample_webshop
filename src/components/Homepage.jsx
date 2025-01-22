import Hero from "./Hero.jsx";
import {Container} from "@mui/material";
import FeaturedServices from "./FeaturedServices.jsx";
import React from "react";

export default function Homepage({cartItems, setCartItems}){
    return (
        <main>
            <Hero setCartItems={setCartItems} />
            <Container maxWidth="lg">
                <FeaturedServices cartItems={cartItems} setCartItems={setCartItems} />
            </Container>
        </main>
    )
}