import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';
import services from "../service_assets/services.json"
export default function SelectMultipleAppearance({setSelectedServices}) {
    const handleChange = (event, newValue) =>  {
        setSelectedServices(services.filter(service => newValue.includes(service.id) ))
    }
    return (
        <Select
            multiple
            placeholder={"Services auswählen"}
            className={"selectionActive"}
            onChange={handleChange}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                    {selected.map((selectedOption) => (
                        <Chip variant="soft" color="primary">
                            {selectedOption.label}
                        </Chip>
                    ))}
                </Box>
            )}
            size="lg"
            sx={{ minWidth: '15rem', zIndex: 10000, mb: 2,
                '.MuiOutlinedInput-root': {
                    '&.Mui-focused': {
                        borderColor: 'gold', // Border color on focus
                    }
                },
                '.MuiSelect-select': {
                    borderColor: 'gray', // Default border color
                    '&.Mui-focused': {
                        borderColor: 'gold', // Adjust border color on focus
                    }
                } }}
            slotProps={{
                listbox: {
                    sx: {
                        width: '100%',
                        zIndex: 10000
                    },
                },
            }}
        >
            {services.map(service => <Option value={service.id} key={service.id} className={"selectionActive"}>{service.title}</Option>)}
        </Select>
    );
}