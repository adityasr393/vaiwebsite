import React, { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";
import {
 
  Typography,
  Grid,
  Switch,
  MenuItem,
  Select,
  CircularProgress,
  Card,
 Paper,


  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Header from "./header";
import Footer from "./footer";
import { color, styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useAuth } from './auth/useauth';
const SmallCenteredWhiteTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff", // Border color
    },
    "&:hover fieldset": {
      borderColor: "#fff", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Border color when focused
    },
    "& input": {
      color: "#fff", // Text color
    },
  },
  "& .MuiInputBase-root": {
    width: "800px", // Adjust width as needed
    margin: "0 auto", // Center the input horizontally
  },
});
const CardActions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%', // Ensure buttons take full width
  marginTop: 'auto', // Push buttons to the bottom
  paddingTop: '10px', // Add padding at the top for spacing
});
const firebaseConfig = {
  apiKey: "AIzaSyAwMqAQN9kJ2mSGO7z4HSSL7Bo-JA_wDyc",
  authDomain: "aiwebsite-b796a.firebaseapp.com",
  projectId: "aiwebsite-b796a",
  storageBucket: "aiwebsite-b796a.appspot.com",
  messagingSenderId: "783158039112",
  appId: "1:783158039112:web:23dfc95ee0c38a61d1fe7d"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const WhiteSelect = styled(Select)({
  "& .MuiSelect-selectMenu": {
    color: "#fff", // Text color for the selected option
  },
  "& .MuiSelect-icon": {
    color: "#fff", // Color for the select icon
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent", // Ensuring transparent background when focused
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f2f2f2", // Border color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f2f2f2", // Border color on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f2f2f2", // Border color when focused
    },
  },
});

const UpdateButton = styled(Button)({
  backgroundColor: "#1976d2", // Background color on hover for update button
  color: "#fff", // Text color on hover for update button
 
  "&:hover": {
    color: "#1976d2", // Text color for update button
  borderColor: "#1976d2", // Border color for update button
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#f44336", // Background color on hover for delete button
  color: "#fff", // Text color on hover for delete button

  "&:hover": {
    color: "#f44336", // Text color for delete button
    borderColor: "#f44336", // Border color for delete button
  },
});
const Container = styled('div')({
  backgroundColor:"#0e1117",
  color:"#fff",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
});
const CardContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%', // Set a fixed height for the card content container
  padding: '20px', // Adjust padding as needed
  color: '#ffffff', // Text color
  textAlign: 'center', // Center-align content
});


const CardItem = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px",
  textAlign: "center",
  borderRadius: "10px",
  position: "relative",
  backgroundColor: "#2F4F4F", // Background color
  color: "#ffffff", // Text color
  transition: "transform 0.3s ease-in-out",
  height: "100%", // Set a fixed height for the card

  "&:hover": {
    transform: "translateY(-5px)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "15px",
    margin: "8px",
  },
}));

const ActionButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center', // Center-align buttons
  gap: '10px', // Adjust gap between buttons
  marginTop: 'auto', // Push to bottom
});
const CardWrapper = styled('div')({
  padding: '25px',
});
const Admintool = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    toolTitle: "",
    category: "",
    toolDescription: "",
    visitLink: "",
    firebaseImageUrl: "",
    imageFile: null, // New state for storing selected image file
  });

  useEffect(() => {
    getAITools();
  }, []);

  const getAITools = () => {
    const apiUrl = `https://aiwebsite-backend.onrender.com/AI`;
    axios
      .get(apiUrl)
      .then((response) => {
        setTools(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching AI tools:", err);
        setLoading(false);
      });
  };

  const updateStatus = (toolId, newStatus) => {
    const data = { status: newStatus };
    axios
      .put(`https://aiwebsite-backend.onrender.com/updatetoolstatus/${toolId}`, data)
      .then(() => {
        setTools((prevTools) =>
          prevTools.map((tool) =>
            tool._id === toolId ? { ...tool, status: newStatus } : tool
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  const updateFilter = (toolId, newFilter) => {
    const apiUrl = `https://aiwebsite-backend.onrender.com/AI/${toolId}/updateFilter`;
    const data = { newFilterValue: newFilter };

    axios
      .put(apiUrl, data)
      .then(() => {
        setTools((prevTools) =>
          prevTools.map((tool) =>
            tool._id === toolId ? { ...tool, filter: newFilter } : tool
          )
        );
      })
      .catch((err) => {
        console.error("Error updating filter:", err);
      });
  };

  const deleteTool = (toolId) => {
    axios
      .delete(`https://aiwebsite-backend.onrender.com/deleteTool/${toolId}`)
      .then(() => {
        setTools((prevTools) => prevTools.filter((tool) => tool._id !== toolId));
      })
      .catch((err) => {
        console.error("Error deleting tool:", err);
      });
  };

  const handleUpdateClick = (tool) => {
    setSelectedTool(tool);
    setUpdateFormData({
      toolTitle: tool.toolTitle,
      category: tool.category,
      toolDescription: tool.toolDescription,
      visitLink: tool.visitLink,
      firebaseImageUrl: tool.firebaseImageUrl,
      imageFile: null, // Reset image file state when opening the update form
    });
  };

  const handleCloseUpdateForm = () => {
    setSelectedTool(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setUpdateFormData((prevData) => ({
        ...prevData,
        imageFile: e.target.files[0],
      }));
    }
  };

  const handleToolUpdate = () => {
    // Check if there's a new image file selected
    if (updateFormData.imageFile) {
      // Upload image to Firebase Storage
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${updateFormData.imageFile.name}`);
      imageRef.put(updateFormData.imageFile)
        .then((snapshot) => {
          // Get the download URL for the uploaded image
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          // Update the tool data including the Firebase image URL
          const updatedData = {
            ...updateFormData,
            firebaseImageUrl: downloadURL,
            imageFile: null, // Reset image file state after uploading
          };
          axios
            .put(`https://aiwebsite-backend.onrender.com/tools/${selectedTool._id}`, updatedData)
            .then(() => {
              getAITools();
              setSelectedTool(null);
            })
            .catch((err) => {
              console.error("Error updating tool data:", err);
            });
        })
        .catch((error) => {
          console.error("Error uploading image to Firebase:", error);
        });
    } else {
      // If no new image file selected, update tool data without uploading image
      axios
        .put(`https://aiwebsite-backend.onrender.com/tools/${selectedTool._id}`, updateFormData)
        .then(() => {
          getAITools();
          setSelectedTool(null);
        })
        .catch((err) => {
          console.error("Error updating tool data:", err);
        });
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.toolTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Header/>
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Tools
      </Typography>
     
   <SmallCenteredWhiteTextField

  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  fullWidth
  margin="normal"
/>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredTools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tool._id}>

  <CardContent>
    <CardItem>
      <img
        src={tool.firebaseImageUrl}
        alt="Tool"
        style={{ width: "100%", height: "auto", marginBottom: "16px" }}
      />
      <Typography variant="h6" gutterBottom>{tool.toolTitle}</Typography>
      <Typography variant="body1" style={{ marginBottom: "8px" }}>{tool.toolDescription}</Typography>
    
      <Typography variant="body2">Category: {tool.category}</Typography>
      <br/>
      <Typography variant="h6" style={{ marginBottom: "8px" }}>{tool.pricingType}</Typography>
      <Typography variant="body1" style={{ marginBottom: "8px" }}>{tool.pricingPrice}</Typography>
      
      <CardActions>
  <div>
  <br/>
      <br/>
    <Typography>Status</Typography>
    <Switch
      checked={tool.status}
      onChange={(e) => updateStatus(tool._id, e.target.checked)}
      color="primary"
    />
    <WhiteSelect
      value={tool.filter}
      onChange={(e) => updateFilter(tool._id, e.target.value)}
      displayEmpty
      style={{ marginLeft: '8px',color:'#f2f2f2' }}
    >
      <MenuItem value="new">New</MenuItem>
      <MenuItem value="popular">Popular</MenuItem>
      <MenuItem value="featured">Featured</MenuItem>
    </WhiteSelect>
  </div>
  <ActionButtonWrapper>
    <UpdateButton
      onClick={() => handleUpdateClick(tool)}
      variant="contained"
    >
      Update
    </UpdateButton>
    <DeleteButton
      onClick={() => deleteTool(tool._id)}
      variant="contained"
    >
      Delete
    </DeleteButton>
  </ActionButtonWrapper>
</CardActions>

  </CardItem>
  </CardContent>
 



            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={selectedTool !== null} onClose={handleCloseUpdateForm}>
        <DialogTitle>Update Tool</DialogTitle>
        <DialogContent>
          <TextField
            name="toolTitle"
            label="Tool Title"
            variant="outlined"
            value={updateFormData.toolTitle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="category"
            label="Category"
            variant="outlined"
            value={updateFormData.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="toolDescription"
            label="Tool Description"
            variant="outlined"
            value={updateFormData.toolDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="visitLink"
            label="Visit Link"
            variant="outlined"
            value={updateFormData.visitLink}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="firebaseImageUrl"
            label="Firebase Image URL"
            variant="outlined"
            value={updateFormData.firebaseImageUrl}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {/* Add input for selecting image file */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleToolUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    <Footer/>
    </>
  );
};

export default Admintool;
