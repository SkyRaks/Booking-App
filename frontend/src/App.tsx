// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { useMemo, useState } from "react"
import { createTheme, ThemeProvider, Box, CssBaseline, Button, Container } from "@mui/material";

import Navbar from './components/Navbar';
import Hero from "./components/Hero";
import FeaturedProperties from "./components/FeaturedProperties";

function App() {
  type ThemeMode = 'light' | 'dark'
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme = useMemo(
    () => 
      createTheme({
        palette:{
          mode,
          primary: {
            // #ffee33
            main: "#4AF2A1",
            contrastText: "#000",
          }
        }
      }),
      [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar toggleTheme={toggleTheme} mode={mode}/>
        {/* <Button variant="contained" onClick={toggleTheme}>Theme</Button> */}

        <Container maxWidth='lg'>
          <CssBaseline />
          <Hero /> 
          <FeaturedProperties />

          <Box sx={{height: '100vh'}}>
            <h3>Hello</h3>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
