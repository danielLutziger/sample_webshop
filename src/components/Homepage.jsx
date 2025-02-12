import Hero from "./Hero.jsx";
import "react";

// eslint-disable-next-line react/prop-types
export default function Homepage({setCartItems, setBookingObject, setBooked}){
    return (
        <main>
            <Hero setCartItems={setCartItems} setBooked={setBooked} setBookingObject={setBookingObject} />
        </main>
    )
}
