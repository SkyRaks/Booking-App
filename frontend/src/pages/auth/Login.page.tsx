import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper, Snackbar, Container } from "@mui/material";
import { useAuth } from "../../services/user.auth.ts";

type Role = "owner" | "guest";

type FormData = {
    email: string;
    password: string;
    role: Role
};

export default function LoginPage() {
    const loginUser = useAuth((state) => state.loginUser);

    const [form, setFrom] = useState<FormData>({
        email: "",
        password: "",
        role: "guest"
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setError(null);

        const res = await loginUser({
            email: form.email,
            password: form.password,
        },
        form.role,
        )
        console.log(res.success)

        if (!res.success) {
            setError(res.message)
        } else {
            alert("You've been logged in")
            // console.log()
        }
    }

    return (
        <Container>
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper sx={{p: 4, width: 400}}>
                <Typography>Login</Typography>

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

                {error && (
                    <Typography color="error" mt={1}>
                        {error}
                    </Typography>
                )}

                <Button variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>Login</Button>
            </Paper>
        </Box>
        </Container>
    );
}