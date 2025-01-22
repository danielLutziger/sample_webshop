import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function CalendarBooking({ appointmentDuration, setTermin }) {
    const blockedSlots = [
        { date: "21.01.2025", startTime: "10:00", endTime: "10:45" },
        { date: "21.01.2025", startTime: "14:15", endTime: "14:45" },
        { date: "22.01.2025", startTime: "09:00", endTime: "14:45" },
        { date: "23.01.2025", startTime: "09:00", endTime: "16:00" },
        { date: "24.01.2025", startTime: "09:00", endTime: "14:45" },
        { date: "25.01.2025", startTime: "09:00", endTime: "18:00" },
    ];

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

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
        setSelectedSlot(slot);
        setTermin({date: selectedDate.format("DD.MM.YYYY"), time: slot});
    };

    const endtime = selectedSlot
        ? dayjs(`${selectedDate.format("DD.MM.YYYY")}T${selectedSlot}`, "DD.MM.YYYYTHH:mm")
            .add(appointmentDuration, "minute")
            .format("HH:mm")
        : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ paddingTop: "20px", paddingBottom: "20px", margin: "auto" }}>
                <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                    Book Your Appointment
                </Typography>

                <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue);
                        setSelectedSlot(null);
                    }}
                    disablePast
                    shouldDisableDate={shouldDisableDate}
                    format="DD.MM.YYYY"
                    sx={{ width: "100%" }}
                />

                {selectedDate && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Available Slots
                        </Typography>
                        <Grid container>
                            {slots.map((slot) => (
                                <Grid item xs={8} key={slot}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleSlotSelection(slot)}
                                        sx={{
                                            backgroundColor:
                                                selectedSlot === slot ? "#ceaaff" : "white",
                                            color: isSlotBlocked(slot) ? "#aaa" : "black",
                                            pointerEvents: isSlotBlocked(slot) ? "none" : "auto",
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

                {selectedSlot && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Selected Slot
                        </Typography>
                        <Typography>{`${selectedDate.format(
                            "DD.MM.YYYY"
                        )} um ${selectedSlot}`} - {endtime}</Typography>
                        <Typography>Dauer circa {appointmentDuration} mins</Typography>
                    </Box>
                )}
            </Box>
        </LocalizationProvider>
    );
}
