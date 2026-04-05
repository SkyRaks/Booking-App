import { useMemo, useState } from "react"
import { createTheme, ThemeProvider, Box, CssBaseline, Button, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home.page";
import SignUpPage from "./pages/auth/SignUp.page";
import LoginPage from "./pages/auth/Login.page";
// import Hero from "./components/Hero";
// import FeaturedProperties from "./components/FeaturedProperties";

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
        <CssBaseline />
        <Navbar toggleTheme={toggleTheme} mode={mode}/>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {/* <Route path="/logout" element={<LoginPage />}></Route> */}
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
