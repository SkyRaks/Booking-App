import { Box, CssBaseline, Button, Container } from "@mui/material";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import { useAuth } from "../services/user.auth";
// import { useState } from "react";

export default function Home() {
    const user = useAuth((state) => state.user);
    const access = useAuth((state) => state.accessToken);
    console.log("user: ", user)
    console.log("access: ", access)
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
