import "react";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/cormorant-garamond";
import BookAppointment from "./BookAppointment.jsx";
import CancelAppointment from "./CancelAppointment.jsx";

// eslint-disable-next-line react/prop-types
export default function Hero({setCartItems, setBooked, setBookingObject}) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                height: { xs: "auto", md: "50vh" },
            }}
        >
            {/* Left/Top Side: Text */}
            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    marginBottom: { xs: "20px", md: "0" },
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: "black",
                        mb: 2,
                        fontSize: { xs: "2.5rem", md: "4rem" },
                        fontFamily: "'bagel fat one'",
                    }}
                >
                    Nancy Nails ❤️
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "black",
                        mb: 3,
                        maxWidth: "100%",
                        margin: { xs: "0 auto", md: "0" },
                        fontFamily: "'Montserrat', sans-serif", // Font from the image
                        fontSize: { xs: "16px", md: "18px" }, // Responsive font size
                        lineHeight: 1.5, // Adjust for readability
                        fontWeight: 400, // Regular weight
                    }}
                >
                    Entdecken Sie unser Angebot an luxuriösen Nagelpflege-Dienstleistungen, von Maniküre und Pediküre bis hin zu individuell gestaltetem Nageldesign. Entspannen Sie sich in unserer ruhigen Atmosphäre und lassen Sie sich von uns verwöhnen.
                </Typography>
                <Button
                    variant="contained"
                    className={"buttonColor"}
                    sx={{
                        padding: "10px 20px",
                        fontSize: { xs: "1rem", md: "1rem" },
                        width: "100%",
                        mt: 2,
                        fontWeight: "bold",
                        fontFamily: "'cormorant garamond'",
                    }}
                    onClick={() => {
                        navigate('/services')
                    }}
                >
                    Services Entdecken
                </Button>
                <BookAppointment sx={{
                    mt: 2,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    fontSize: { xs: "1rem", md: "1rem" },
                    width: "100%",
                    fontFamily: "'cormorant garamond'",
                }} setCartItems={setCartItems} setBooked={setBooked} setBookingObject={setBookingObject} />
                <CancelAppointment sx={{
                    mt: 2,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    fontSize: { xs: "1rem", md: "1rem" },
                    width: "100%",
                    fontFamily: "'cormorant garamond'",
                }} />

            </Box>

            {/* Right/Bottom Side: Image
            <Box
                component="img"
                src={"/assets/hello_kitty.png"}
                alt="Hero Image"
                sx={{
                    flex: 1,
                    maxWidth: { xs: "100%", md: "40%" },
                    maxHeight: { xs: "575px", md: "auto" }, // Restrict height on smaller screens
                    height: "auto",
                    alignSelf: "center",
                    objectFit: "cover", // Ensure image scales proportionally
                }}
            />
            */}
        </Box>
    );
}
