import { Box, CssBaseline, Button, Container } from "@mui/material";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import { useAuth } from "../services/user.auth";
// import { useState } from "react";

export default function Home() {
    const accessToken = useAuth((state) => state.accessToken)
    const refreshToken = useAuth((state) => state.refreshToken)
    console.log("access token: ", accessToken)
    console.log("refresh token: ", refreshToken)
    return (
        <Container>
            <CssBaseline />
            <Hero /> 
            <FeaturedProperties />

            <Box sx={{height: '100vh'}}>
                <h3>Hello</h3>
            </Box>
        </Container>
    )
}
