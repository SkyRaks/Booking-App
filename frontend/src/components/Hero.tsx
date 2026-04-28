import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const theme = useTheme();

    const [search, setSearch] = useState({
        location: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
    });

    const navigate = useNavigate();
    
    const handleSearch = () => {
        const query = new URLSearchParams({
            location: search.location,
            guests: String(search.guests),
        }).toString();

        navigate(`/search?${query}`);
    }

    return (
        <Paper
            elevation={3}
            sx={{
                mt: 4,
                p: 4,
                borderRadius: 3,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            }}
        >
            <Typography variant="h4" fontWeight={"bold"} gutterBottom>
                Find your next stay
            </Typography>

            <Typography variant="body1" sx={{mb: 3}}>
                Search hotels, apartaments and more
            </Typography>

            <Box 
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr auto" },
                    gap: 2,
                    backgroundColor: "background.paper",
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <TextField 
                    label="Where are you going?" 
                    size="small"
                    value={search.location}
                    onChange={(e) => setSearch({...search, location: e.target.value})}
                    />
                <TextField 
                    label="Guests" 
                    size="small"
                    value={search.guests}
                    onChange={(e) => setSearch({...search, guests: Number(e.target.value)})}
                    />

                <Button 
                    variant="contained"
                    onClick={handleSearch}
                    >Search</Button>
                
            </Box>

        </Paper>
    )
}
