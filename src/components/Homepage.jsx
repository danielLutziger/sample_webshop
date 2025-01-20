import Hero from "./Hero.jsx";
import {Container} from "@mui/material";
import FeaturedServices from "./FeaturedServices.jsx";
import React from "react";

export default function Homepage(){
    return (
        <main>
            <Hero />
            <Container maxWidth="lg">
                <FeaturedServices />
            </Container>
        </main>
    )
}