import React, { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Container, Select, MenuItem, InputLabel } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./header";
import Footer from "./footer";
import { storage } from "./config";
import { styled } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";

const StyledTypography = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  fontFamily: 'Roboto, sans-serif',
  color: '#ff69b4',
  marginBottom: '20px',
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#0e1117",
    color: "#fff",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    position: "relative",
    overflow: "hidden",
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
    background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Keep the same button gradient
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

const categoryOptions = [
  "#AI Analytics",
  "#GPTs",
  "#Design AI",
  "#AI Detector",
  "#Presentations",
  "#Resources",
  "#Social Media",
  "#Copywriting",
  "#Art & Image",
  "#AI Chatbot",
  "#Business",
  "#Marketing",
  "#SEO",
  "#AI Assistant",
  "#AI Crypto Trading Bots",
  "#AI Stock Trading Bots",
  "#ChatGPT Plugins",
  "#Voice & Audio",
  "#Content Creation",
  "#CRM & Automation",
  "#Customer Support",
  "#Developer Tools",
  "#Ecommerce",
  "#Email Assistant",
  "#Free Tools",
  "#Video",
  "#Website & Funnel",
  "#Workspace & Productivity",
];

const AddTool = () => {
  const classes = useStyles();
  const [toolData, setToolData] = useState({
    toolTitle: "",
    category: "",
    toolDescription: "",
    visitLink: "",
    pricingType: "", 
    pricingPrice: "", 
    firebaseImageUrl: "", // This will store the URL of the image in Firebase Storage
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToolData({ ...toolData, [name]: value });
  };
  

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress if needed
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      () => {
        // Get the image URL from Firebase Storage and update toolData
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setToolData({ ...toolData, firebaseImageUrl: url });
          })
          .catch((error) => {
            console.error("Error getting image URL:", error);
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://aiwebsite-backend.onrender.com/addTool", toolData)
      .then((response) => {
        console.log("Tool added successfully:", response.data);
        toast.success("Tool added successfully!"); // Display success message
      })
      .catch((error) => {
        console.error("Error adding tool:", error);
      });
  };

  return (
    <>
      <Header/>
      <Container className={classes.container}>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <StyledTypography variant="h4">
            <span style={{ background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Updated gradient colors
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent", }}>Add New Tool</span>
          </StyledTypography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              name="toolTitle"
              className={`${classes.formControl} ${classes.whiteBorder}`}
              label="Tool Title"
              value={toolData.toolTitle}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{style: {color: '#fff'}}} // Set label color to white
              InputProps={{style: {color: '#fff'}}} // Set text color to white
              sx={{ '& input::placeholder': { color: '#fff' } }} // Set placeholder color to white
            />
            <InputLabel style={{ color: '#fff' }}>Category *</InputLabel>
            <Select
              name="category"
              value={toolData.category}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: '#fff' } }}
              variant="outlined"
              // Add style to set border color to white
              sx={{
                '& fieldset': {
                  borderColor: '#fff !important',
                },
                '& .Mui-focused': {
                  color: '#fff !important',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                }
              }}
            >
              {categoryOptions.map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
            <TextField
              name="toolDescription"
              label="Tool Description"
              className={`${classes.formControl} ${classes.whiteBorder}`}
              value={toolData.toolDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              InputLabelProps={{style: {color: '#fff'}}} // Set label color to white
              InputProps={{style: {color: '#fff'}}} // Set text color to white
              sx={{ '& textarea::placeholder': { color: '#fff' } }} // Set placeholder color to white
            />
            <TextField
              name="visitLink"
              label="Visit Link"
              className={`${classes.formControl} ${classes.whiteBorder}`}
              value={toolData.visitLink}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{style: {color: '#fff'}}} // Set label color to white
              InputProps={{style: {color: '#fff'}}} // Set text color to white
              sx={{ '& input::placeholder': { color: '#fff' } }} // Set placeholder color to white
            />
            <InputLabel style={{ color: '#fff' }}>Pricing Type *</InputLabel>
            <Select
  name="pricingType"
  value={toolData.pricingType}
  onChange={handleChange}
  fullWidth
  required
  InputLabelProps={{ style: { color: '#fff' } }}
  variant="outlined"
  sx={{
    '& fieldset': {
      borderColor: '#fff !important',
    },
    '& .Mui-focused': {
      color: '#fff !important',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    }
  }}
>
  <MenuItem value="Freemium">Freemium</MenuItem>
  <MenuItem value="Trial">Trial</MenuItem>
</Select>

<TextField
  name="pricingPrice"
  label="Pricing Price"
  className={`${classes.formControl} ${classes.whiteBorder}`}
  value={toolData.pricingPrice}
  onChange={handleChange}
  fullWidth
  required
  InputLabelProps={{style: {color: '#fff'}}} // Set label color to white
  InputProps={{
    style: { color: '#fff' }, // Set text color to white
    startAdornment: "$",
  }}
  sx={{ '& input::placeholder': { color: '#fff' } }} // Set placeholder color to white
/>

            <Typography>Add Tool Image *</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ color: '#fff' }}
            />
            <Button type="submit" variant="contained" className={classes.button}>Submit</Button>
            <Button component={Link} to="/home" variant="contained" className={classes.button}>Back</Button>
          </form>
        </div>
      </Container>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddTool;
