import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

type ThemeMode = "light" | "dark";
type Props = {
    toggleTheme: () => void,
    mode: ThemeMode;
};

export default function Narbar({toggleTheme, mode}: Props) {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/" 
                    sx={{textDecoration: "none", color: "inherit"}}
                >
                    SwiftBook
                </Typography>                

                <Box>
                    <Button color="inherit" onClick={toggleTheme}>Theme</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
