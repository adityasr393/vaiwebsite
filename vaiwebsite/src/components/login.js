import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./auth/useauth";
import { styled } from "@mui/system";
import { Paper, Typography, TextField, Button , Snackbar } from "@mui/material";
import Footer from "./footer";
import Header from "./header";
const LoginContainer = styled('div')({
  backgroundColor: "#0e1117", // Updated background color
  color: "#fff",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Center content vertically
  position: "relative",
  overflow: "hidden",
});

const LoginPaper = styled(Paper)({
  padding: '40px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  width: '100%', // Set width to 100% to take full width of container
  maxWidth: '400px', // Limit maximum width to 400px
});

const LoginForm = styled('form')({
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiInputBase-input': { // Add this block to style the input text color
    color: '#fff', // Set the text color to white
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
});

const StyledButton = styled(Button)({
  padding: "12px 25px",
  borderRadius: "6px",
  background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "22px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginRight: "10px",
  marginBottom: "20px", // Add marginBottom for spacing
  "&:hover": {
    background: "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)",// Change the hover color in the gradient
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || '/home';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://aiwebsite-backend.onrender.com/login", { username, password })
      .then((result) => {
        if (result.data.message === "Success") {
          auth.login(username, password);
          navigate(redirectPath, { replace: true });
        } else {
          // Login failed, show Snackbar
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };
  

  return (
    <>
    <Header />
      <LoginContainer>
        <LoginPaper elevation={3}>
          <Typography variant="h4" gutterBottom> <span style={{ background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Updated gradient colors
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent", }}>Login</span></Typography>
          <LoginForm onSubmit={handleSubmit}>
            <StyledTextField
              label="Username"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton variant="contained" color="primary" type="submit">
              Login
            </StyledButton>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#fff' }}>Sign Up</Link>
            </Typography>
          </LoginForm>
        </LoginPaper>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
         
          message="Incorrect username or password"
        />
      </LoginContainer>
      <Footer /></>
  );
}

export default Login;
