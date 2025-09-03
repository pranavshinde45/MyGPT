import React, { useContext, useState } from 'react';
import axios from "axios";
import { useFormValidation } from './Validation.jsx';
import { AuthContext } from './authContext.jsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SignUpContainer, Card } from "./authStyle.jsx"; // ✅ keep only one style file

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Signup() {
  const { setCurrUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {
    passwordError,
    passwordErrorMessage,
    nameError,
    nameErrorMessage,
    validateInputs,
  } = useFormValidation();

  const handleSignup = async (event) => {
    event.preventDefault();
    const isValid = validateInputs(username, password);
    if (!isValid) return;

    try {
      const res = await axios.post("https://mygpt-vr7p.onrender.com/api/signup", {
        username,
        email,
        password,
      });

      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSignup}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="new user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}

export default Signup;
