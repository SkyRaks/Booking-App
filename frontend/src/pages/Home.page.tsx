import { Box, CssBaseline, Container } from "@mui/material";
import { useEffect } from "react";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import { usePropertiesStore } from "../services/common.service";

export default function Home() {
    const {properties, setProperties} = usePropertiesStore();

    useEffect(() => {
        setProperties();
    }, [])

    return (
        <Container>
            <CssBaseline />
            <Hero /> 
            <FeaturedProperties properties={properties}/>

            <Box sx={{height: '100vh'}}>
                <h3>Hello</h3>
            </Box>
        </Container>
    )
}
