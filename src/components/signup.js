import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import Footer from "./footer";
import Header from "./header";

const SignupContainer = styled('div')({
  backgroundColor: "#0e1117",
  color: "#fff",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  padding: "20px", // Added padding
});

const SignupPaper = styled(Paper)({
  padding: '40px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '400px',
});

const SignupForm = styled('form')({
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
  display: 'flex',
  flexDirection: 'column', // Center form items vertically
  alignItems: 'center', // Center form items horizontally
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
  marginBottom: "20px",
  "&:hover": {
    background: "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)",
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://aiwebsite-backend.onrender.com/signup', { name, email, number, age, username, password, gender })
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <SignupContainer>
        <SignupPaper elevation={3}>
          <Typography variant="h4" gutterBottom>
            <span style={{ background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" }}>Sign Up</span>
          </Typography>
          <SignupForm onSubmit={handleSubmit}>
            <StyledTextField
              label="Name"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StyledTextField
              label="Email"
              type="email"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledTextField
              label="Mobile Number"
              type="tel"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
            <StyledTextField
              label="DOB"
              type="date"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff !important' },
              }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <StyledTextField
              label="Username"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              required
            />
            <StyledTextField
              label="Gender"
              variant="outlined"
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <StyledButton variant="contained" color="primary" type="submit">Sign Up</StyledButton>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Already have an account? <Link to="/login" style={{ color: '#fff' }}>Login</Link>
            </Typography>
          </SignupForm>
        </SignupPaper>
      </SignupContainer>
      <Footer />
    </>
  );
}

export default Signup;
