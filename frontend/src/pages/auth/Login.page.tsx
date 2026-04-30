import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper, Snackbar, Container, Alert } from "@mui/material";
import { useAuth } from "../../services/user.auth.ts";
import { useNavigate } from "react-router-dom";

type Role = "owner" | "guest";

type FormData = {
    email: string;
    password: string;
    role: Role
};

export default function LoginPage() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const loginUser = useAuth((state) => state.loginUser);

    const [form, setFrom] = useState<FormData>({
        email: "",
        password: "",
        role: "guest"
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await loginUser({
            email: form.email,
            password: form.password,
            role: form.role,
        })

        if (!res.success) {
            setSnackbar({open: true, message: res.message, severity: "error"})
        } else {
            // setSnackbar({open: true, message: "You've logged in!", severity: "success"})
            navigate('/')
        }
    }

    return (
        <Container>
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper sx={{p: 4, width: 400}}>
                <Typography variant="h5" textAlign="center">Login</Typography>

                <TextField 
                    label="Email" 
                    name="email" 
                    fullWidth 
                    margin="normal" 
                    value={form.email} 
                    onChange={handleChange}
                />

                <TextField 
                    label="Password" 
                    name="password" 
                    fullWidth 
                    margin="normal" 
                    value={form.password} 
                    onChange={handleChange}
                />

                <TextField 
                    label="Role" 
                    name="role" 
                    fullWidth 
                    margin="normal" 
                    value={form.role} 
                    onChange={handleChange}
                >
                    <MenuItem value="guest">Guest</MenuItem>
                    <MenuItem value="owner">Owner</MenuItem>
                </TextField>

                <Button variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>Login</Button>
            </Paper>
            
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                // severity={snackbar.severity}
                sx={{ width: "100%" }}
                >
                {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
        </Container>
    );
}