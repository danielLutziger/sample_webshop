import {Box, Button, Modal, TextField, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import {api} from "../utils/api.jsx";

// eslint-disable-next-line react/prop-types
export default function CancelAppointment({sx}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formDetails, setFormDetails] = useState({
        uuid: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const handleFormSubmit = () => {
        const uuid = formDetails.uuid;

        api.delete(`/api/terminabsage/${uuid}`)
            .then(response => {
                console.log('Termin abgesagt:', response.data);
                setFormDetails({ uuid: "" });
                handleClose();
            })
            .catch(error => {
                console.error('Failed to send email:', error.response.data.detail);
                alert(error.response.data.detail || "Error occurred");
            });
    };



    return (
        <>
            <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ width: "100%", ...sx }}
                    className={"buttonColor"}
            >
                Termin Absagen
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%", // Adjust width as needed
                        maxWidth: "600px",
                        maxHeight: "90%", // Ensure it doesn't overflow vertically
                        bgcolor: "white",
                        boxShadow: 24,
                        borderRadius: "8px",
                        overflow: "auto", // Make content scrollable
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 2,
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <Typography variant="h4">
                            Termin Absage
                        </Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 3 }}>
                        <TextField
                            label="Termin ID"
                            name="uuid"
                            className={"textfieldActive"}
                            value={formDetails.uuid}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            className={"buttonColor"}
                            onClick={handleFormSubmit}
                            disabled={!formDetails.uuid}
                            fullWidth
                        >
                            Termin Absagen
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
