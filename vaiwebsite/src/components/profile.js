import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { styled } from "@mui/system";
const StyledTypography = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  fontFamily: 'Roboto, sans-serif',
  color: '#ff69b4',
  marginBottom: '20px',
});

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    backgroundColor: "#0e1117", // Keep the same background color
    color: "#fff",
    padding: theme.spacing(3), // Add padding
    borderRadius: "10px", // Add border radius
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
    background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
    color: "#fff",
    borderRadius: "6px",
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "22px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      background: "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)", // Keep the same hover gradient
    },
  },
  // Add style for white border
  whiteBorder: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff !important",
      },
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    username: "",
    number: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData._id) {
        try {
          const response = await axios.get(
            `https://aiwebsite-backend.onrender.com/getprofiledata/${userData._id}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.error("User data is null or missing _id property.");
      }
    };
  
    fetchData();
  }, []);
    
  
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const id = user._id;
    try {
      const response = await axios.put(
        `https://aiwebsite-backend.onrender.com/updateprofile/${id}`,
        user
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
          <StyledTypography variant="h4">
                <span style={{ background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Updated gradient colors
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent", }}>Profile</span>
              </StyledTypography>
            <Typography variant="h5" align="center" gutterBottom>
              
            </Typography>
            <form>
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`}
                label="Username"
                variant="outlined"
                name="username"
                value={user.username}
                disabled
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="Email"
                variant="outlined"
                name="email"
                value={user.email}
                disabled
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="Phone Number"
                variant="outlined"
                name="number"
                value={user.number}
                onChange={handleChange}
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="Date of Birth"
                variant="outlined"
                name="dob"
                type="date"
                value={user.dob}
                onChange={handleChange}
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="City"
                variant="outlined"
                name="city"
                value={user.city}
                onChange={handleChange}
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="State"
                variant="outlined"
                name="state"
                value={user.state}
                onChange={handleChange}
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              {/* Apply white border style */}
              <TextField
                fullWidth
                className={`${classes.formControl} ${classes.whiteBorder}`} // Apply whiteBorder class
                label="Country"
                variant="outlined"
                name="country"
                value={user.country}
                onChange={handleChange}
                InputProps={{ style: { color: "#fff" } }} // Set text color to white
                InputLabelProps={{ style: { color: "#fff" } }} // Set label color to white
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Update
              </Button>
              <Link to="/home" className={classes.button}>
                Back
              </Link>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
