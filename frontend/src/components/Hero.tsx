import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material";

export default function Hero() {
    const theme = useTheme();

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
                <TextField label="Where are you going?" size="small"/>
                <TextField label="Check-in" size="small"/>
                <TextField label="Check-out" size="small"/>
                <TextField label="Guests" size="small"/>

                <Button variant="contained">Search</Button>
                
            </Box>

        </Paper>
    )
}
