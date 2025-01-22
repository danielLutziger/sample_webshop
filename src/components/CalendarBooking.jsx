import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function CalendarBooking({appointmentDuration}) {
    // Mock blocked slots from an external source
    const blockedSlots = [
        { date: "2025-01-21", startTime: "10:00", endTime: "10:45" },
        { date: "2025-01-21", startTime: "14:15", endTime: "14:45" },
        { date: "2025-01-22", startTime: "09:00", endTime: "14:45" },
        { date: "2025-01-23", startTime: "09:00", endTime: "16:00" },
        { date: "2025-01-24", startTime: "09:00", endTime: "14:45" },
        { date: "2025-01-25", startTime: "09:00", endTime: "18:00" },
    ];

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Generate 15-minute interval slots
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

    // Check if a slot is blocked
    const isSlotBlocked = (slot) => {
        return blockedSlots.some(
            (block) =>
                block.date === selectedDate?.format("YYYY-MM-DD") &&
                dayjs(`2025-01-21T${slot}`).isBetween(
                    dayjs(`2025-01-21T${block.startTime}`),
                    dayjs(`2025-01-21T${block.endTime}`),
                    null,
                    "[)"
                )
        );
    };

    // Disable Sundays
    const shouldDisableDate = (date) => {
        return date.day() === 0; // 0 = Sunday
    };

    // Get slots for selected date
    const slots = selectedDate ? generateTimeSlots() : [];

    // Handle slot selection
    const handleSlotSelection = (slot) => {
        if (isSlotBlocked(slot)) return;
        setSelectedSlot(slot);
    };

    const endtime = dayjs(`2025-01-21T${selectedSlot}`)?.add(appointmentDuration, "minute").format("HH:mm");

    return (
        <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
                Book Your Appointment
            </Typography>

            {/* Date Picker */}
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => {
                    setSelectedDate(newValue);
                    setSelectedSlot(null); // Reset slot on date change
                }}
                disablePast
                shouldDisableDate={shouldDisableDate}
            />

            {/* Time Slots */}
            {selectedDate && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Available Slots
                    </Typography>
                    <Grid container spacing={2}>
                        {slots.map((slot) => (
                            <Grid item xs={4} key={slot}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSlotSelection(slot)}
                                    sx={{
                                        backgroundColor: selectedSlot === slot
                                                ? "#81c784"
                                                : "white",
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

            {/* Selected Slot */}
            {selectedSlot && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Selected Slot
                    </Typography>
                    <Typography>{`${selectedDate.format(
                        "YYYY-MM-DD"
                    )} um ${selectedSlot}`} - {endtime}</Typography>
                    <Typography>Dauer circa  {appointmentDuration} mins</Typography>
                </Box>
            )}
        </Box>
    );
}
