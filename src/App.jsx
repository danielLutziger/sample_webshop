import React from "react";
import { CssBaseline} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Homepage from "./components/Homepage.jsx";
import ContactPage from "./components/Contact.jsx";
import ServicesPage from "./components/Services.jsx";

export default function App() {
    return (
        <>
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </Router>
            <Footer />
        </>
    );
}
