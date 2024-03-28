import React, { useState } from 'react';
import { Grid, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from './header';
import Footer from './footer';

const AppContainer = styled('div')({
  backgroundColor: "#0e1117", // Updated background color
  color: "#fff",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  position: "relative",
  overflow: "hidden",
});

const MainContentPaper = styled(Paper)({
  padding: '40px',
  textAlign: 'left',
  marginBottom: '40px',
  width: '100%',
  background: 'white', // Change background color to sky blue
});

const StyledTypography = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  fontFamily: 'Roboto, sans-serif',
  color: '#ff69b4',
  marginBottom: '20px',
});

const FormInput = styled('input')({
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
});

const FormTextarea = styled('textarea')({
  width: '100%',
  height: '120px',
  padding: '12px',
  marginBottom: '20px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
});

const SubmitButton = styled('button')({
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

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aiwebsite-backend.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setSnackbarMessage('Message sent successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setContactData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSnackbarMessage('Failed to send message. Please try again later.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Error sending message. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header />
      <AppContainer>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <MainContentPaper elevation={3}>
              <StyledTypography variant="h4">
                <span style={{ background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Updated gradient colors
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent", }}>Contact Us</span>
              </StyledTypography>
              <form onSubmit={handleSubmit}>
                <FormInput
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={contactData.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                />
                <FormTextarea
                  placeholder="Your Message"
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                  required
                />
                <SubmitButton type="submit">Send Message</SubmitButton>
              </form>
            </MainContentPaper>
          </Grid>
        </Grid>
      </AppContainer>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default Contact;
