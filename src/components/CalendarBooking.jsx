import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Blocked_slots from "../service_assets/blockierte_slots.json";

dayjs.locale("de");
export default function CalendarBooking({ setTermin, selectedSlot, setSelectedSlot, selectedDate, setSelectedDate }) {
    const blockedSlots = Blocked_slots;

    const [showAllSlots, setShowAllSlots] = useState(true);

    const generateTimeSlots = (start = "09:00", end = "18:00") => {
        const slots = [];
        let current = dayjs(`2025-01-21T${start}`);
        const endTime = dayjs(`2025-01-21T${end}`);
        while (current.isBefore(endTime)) {
            slots.push(current.format("HH:mm"));
            current = current.add(15, "minute");
        }
        return slots;
    };

    const isSlotBlocked = (slot) => {
        const formattedDate = selectedDate?.format("DD.MM.YYYY");
        return blockedSlots.some(
            (block) =>
                block.date === formattedDate &&
                dayjs(`${block.date}T${slot}`, "DD.MM.YYYYTHH:mm").isBetween(
                    dayjs(`${block.date}T${block.startTime}`, "DD.MM.YYYYTHH:mm"),
                    dayjs(`${block.date}T${block.endTime}`, "DD.MM.YYYYTHH:mm"),
                    null,
                    "[)"
                )
        );
    };

    const shouldDisableDate = (date) => {
        return date.day() === 0; // Disable Sundays
    };

    const slots = selectedDate ? generateTimeSlots() : [];

    const handleSlotSelection = (slot) => {
        if (isSlotBlocked(slot)) return;

        if (selectedSlot === slot && !showAllSlots) {
            // Toggle to show all slots
            setShowAllSlots(true);
        } else {
            // Select the slot and collapse to show only the selected one
            setSelectedSlot(slot);
            setTermin({ date: selectedDate.format("DD.MM.YYYY"), time: slot });
            setShowAllSlots(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <Box sx={{ paddingTop: "20px", paddingBottom: "20px", margin: "auto", width: "100%" }}>
                <DatePicker
                    label="Datum auswählen"
                    className={"textfieldActive"}
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue);
                        setSelectedSlot(null);
                        setShowAllSlots(true);
                    }}
                    disablePast
                    shouldDisableDate={shouldDisableDate}
                    format="DD.MM.YYYY"
                    sx={{ width: "100%" }}
                />

                {selectedDate && (
                    <Box sx={{ mt: 2 }}>
                        {showAllSlots &&
                            <Typography variant="h8" sx={{ mb: 2 }}>
                                Verfügbare Termine
                            </Typography>
                        }
                        <Grid container>
                            {(showAllSlots ? slots : [selectedSlot]).map((slot) => (
                                <Grid item xs={8} key={slot} sx={!showAllSlots && {width: "100%"}}>
                                    <Button
                                        className={selectedSlot === slot ? "timeSlotButtonSelected" : "timeSlotButton"}
                                        color="secondary"
                                        onClick={() => handleSlotSelection(slot)}
                                        sx={{
                                            pointerEvents: isSlotBlocked(slot) ? "none" : "auto",
                                            width: "100%", // Ensure the button spans the full width of the grid
                                        }}
                                        disabled={isSlotBlocked(slot)}
                                    >
                                        {slot}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </LocalizationProvider>
    );
}
