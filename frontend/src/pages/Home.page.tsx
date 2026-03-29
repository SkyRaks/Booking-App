import { Box, CssBaseline, Button, Container } from "@mui/material";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";

export default function Home() {
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
