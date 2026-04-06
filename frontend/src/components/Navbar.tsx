import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../services/user.auth";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

type ThemeMode = "light" | "dark";
type Props = {
    toggleTheme: () => void,
    mode: ThemeMode;
};

export default function Narbar({toggleTheme, mode}: Props) {
    const accessToken = useAuth((state) => state.accessToken)
    const setAccessToken = useAuth((state) => state.setAccessToken)
    const setUser = useAuth((state) => state.setUser)

    const user = useAuth((state) => state.user)

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogout = async() => {
        try {
            let role: string | null;
            if (!user.role) {
                return 
            } else {
                role = user.role + "s"
            }

            const res = await fetch(`http://127.0.0.1:8000/${role}/logout/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            if (res.ok) {
                setAccessToken(null);
                setUser({});
                console.log("you've logged out")
            } else {
                console.log("failed to logout", res.status)
            }
        } catch (error) {
            console.error(error)
        }
        setOpen(false)
    }

    return (
        <Fragment>
            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to logout?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleLogout}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>

            </Dialog>

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
                        {accessToken !== null ? (
                            <Button color="inherit" onClick={handleOpen}>Logout</Button>
                        ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/register">Register</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                            </Fragment>
                        )}
                        {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}
