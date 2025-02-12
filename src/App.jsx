import React, {useState} from "react";
import {CssBaseline} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Homepage from "./components/Homepage.jsx";
import ContactPage from "./components/Contact.jsx";
import ServicesPage from "./components/Services.jsx";
import CartPage from "./components/CartPage.jsx";
import BookingSummary from "./components/BookingSummary.jsx";

export default function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [, setBooked] = useState(false);
    const [bookingObject, setBookingObject] = useState({});



    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <div className={"appContentBackground"}>
                    <div className={"backgroundImages"}/>
                    <Header cartItems={cartItems}/>
                    <div className={"container"}>
                        <div className={"contentItems"}>
                            <Routes>
                                <Route path="/" element={<Homepage setCartItems={setCartItems} setBooked={setBooked} setBookingObject={setBookingObject} />}/>
                                <Route path="/services" element={<ServicesPage />}/>
                                <Route path="/contact" element={<ContactPage/>}/>
                                <Route path="/product/:id" element={<ProductDetail setCartItems={setCartItems} setBooked={setBooked} setBookingObject={setBookingObject} />}/>
                                <Route path="/appointment" element={<BookingSummary bookingDetails={bookingObject} />}/>
                                <Route path="/cart"
                                       element={<CartPage setCartItems={setCartItems}/>}/>
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </React.Fragment>
    );
}
