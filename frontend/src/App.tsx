import { useEffect, useMemo, useState } from "react"
import { createTheme, ThemeProvider, Box, CssBaseline, Button, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home.page";
import SignUpPage from "./pages/auth/SignUp.page";
import LoginPage from "./pages/auth/Login.page";

import { useAuth } from "./services/user.auth";

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

  const setAccessToken = useAuth((state) => (state.setAccessToken));
  const setUser = useAuth((state) => (state.setUser));

  useEffect(() => {
    const refreshAccessToken = async() => {
      try {
        const res = await fetch("http://localhost:8000/common/refresh/", {
          method: "POST",
          credentials: "include",
        })

        if (!res.ok) {
          setAccessToken(null);
          setUser({});
          return
        }

        const data = await res.json()

        setAccessToken(data.access);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    refreshAccessToken();
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleTheme={toggleTheme} mode={mode}/>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
