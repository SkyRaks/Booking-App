import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper } from "@mui/material";
import { useAuth } from "../../services/user.auth.ts";

type Role = "owner" | "guest";

type FormData = {
    username: string;
    email: string;
    password: string;
    role: Role
};

export default function SignUpPage() {
    const registerUser = useAuth((state) => state.registerUser);

    const [form, setFrom] = useState<FormData>({
        username: "",
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
        console.log(form)
        setError(null);

        const res = await registerUser({
            username: form.username,
            email: form.email,
            password: form.password,
        },
        form.role,
        )

        if (!res.success) {
            setError(res.message)
        } else {
            alert("Account created")
        }
    }

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Paper sx={{p: 4, width: 400}}>
                <Typography>Sign Up</Typography>

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

                {error && (
                    <Typography color="error" mt={1}>
                        {error}
                    </Typography>
                )}

                <Button variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>Register</Button>
            </Paper>
        </Box>
    );
}
