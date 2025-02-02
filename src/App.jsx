import React, {useState} from "react";
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
import CartPage from "./components/CartPage.jsx";

export default function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    return (
        <React.Fragment>
            <CssBaseline />
            <Router>
                <div className={"appContentBackground"}>
                    <Header cartItems={cartItems} />
                    <Routes>
                        <Route path="/" element={<Homepage cartItems={cartItems} setCartItems={setCartItems} />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/product/:id" element={<ProductDetail setCartItems={setCartItems} />} />
                        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </React.Fragment>
    );
}
