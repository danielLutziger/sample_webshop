import React from "react";
import { CssBaseline, Container } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedServices from "./components/FeaturedServices";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
    return (
        <>
            <CssBaseline />
            <Header />
            <main>
                <Hero />
                <Container maxWidth="lg">
                    <FeaturedServices />
                </Container>
            </main>
            <Footer />
        </>
    );
}
