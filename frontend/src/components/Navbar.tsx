import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

type ThemeMode = "light" | "dark";
type Props = {
    toggleTheme: () => void,
    mode: ThemeMode;
};

export default function Narbar({toggleTheme, mode}: Props) {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">SwiftBook</Typography>

                <Box>
                    <Button color="inherit" onClick={toggleTheme}>Theme</Button>
                    <Button color="inherit">Register</Button>
                    <Button color="inherit">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
