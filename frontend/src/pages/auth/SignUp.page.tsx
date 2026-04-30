import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper, Snackbar, Container, Alert } from "@mui/material";
import { useAuth } from "../../services/user.auth.ts";
import { useNavigate } from "react-router-dom";

type Role = "owner" | "guest";

type FormData = {
    username: string;
    email: string;
    password: string;
    role: Role
};

export default function SignUpPage() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const registerUser = useAuth((state) => state.registerUser);

    const [form, setFrom] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        role: "guest"
    });

    // const [error, setError] = useState<string | null>(null);

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
        const res = await registerUser({
            username: form.username,
            email: form.email,
            password: form.password,
        },
        form.role,
        )

        if (!res.success) {
            setSnackbar({open: true, message: res.message, severity: "error"}) 
        } else {
            navigate('/')
        }
    }

    return (
        <Container>
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper sx={{p: 4, width: 400}}>
                <Typography variant="h5" textAlign="center">Sign Up</Typography>

                <TextField 
                    label="Username" 
                    name="username" 
                    fullWidth 
                    margin="normal" 
                    value={form.username} 
                    onChange={handleChange}
                />

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

                <Button variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>Register</Button>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
                >
                {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
        </Container>
    );
}
