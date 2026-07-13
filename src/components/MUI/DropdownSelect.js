import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "left",
    },
    transformOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },
    slotProps: {
        paper: {
            sx: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                backgroundColor: "#181E27",
                color: "#F8FAFC",
                mt: -1,
                border: "1px solid #2A3443",
                borderRadius: "14px",

                "& .MuiMenuItem-root": {
                    color: "#F8FAFC",
                },

                "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#252D3A",
                },

                "& .Mui-selected": {
                    backgroundColor: "rgba(124, 92, 255, 0.16)",
                },

                "& .Mui-selected:hover": {
                    backgroundColor: "rgba(124, 92, 255, 0.24)",
                }

            }
        }
    }
};
const MAX_GENRES = 3;

const names = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Romance',
    'Science Fiction (Sci-Fi)',
    'Thriller',
    'Western',
    'Action-Comedy'
];

function getStyles(name, genreName, theme) {
    return {
        fontWeight: genreName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function DropdownSelect({genres, setGenres}) {
    const theme = useTheme();


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const newValue = typeof value === 'string' ? value.split(',') : value;

        if (newValue.length <= MAX_GENRES) {
            setGenres(newValue);
            console.log(newValue)
        }
    };
    return (
        <div>
            <FormControl
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#1b1b1c",

                        "& fieldset": {
                            borderColor: "#343f5173",
                        },

                        "&:hover fieldset": {
                            borderColor: "#7C5CFF",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#7C5CFF",
                            borderWidth: "2px",
                        }
                    },

                    "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        fontSize: "14px"
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#7C5CFF",
                    }
                }}
            >
                <InputLabel id="demo-multiple-chip-label">Genre</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={genres}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Genre" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}
                                    sx={{
                                        backgroundColor: 'rgba(124, 92, 255, 0.16)',
                                        color: "white"
                                    }} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, genres, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
