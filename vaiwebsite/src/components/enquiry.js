import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // Set minimum height to fill the viewport
      backgroundColor: "#0e1117",  // Set minimum height to fill the viewport
    },
    content: {
      flexGrow: 1, // Allow content to grow to fill remaining space
      padding: theme.spacing(3), // Add padding for content
    },
    footer: {
      marginTop: "auto", // Push footer to the bottom
    },
  }));
  
  

export default function EnquiryPage() {
  const classes = useStyles();
  
    
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    getAllEnquiries();
  }, []);

  const getAllEnquiries = () => {
    const apiUrl = `https://aiwebsite-backend.onrender.com/contacts`;
    axios
      .get(apiUrl)
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Paper elevation={3}>
          <div className="enquiry-sec">
            <div className="enquiry-head-sec">
              <Typography variant="h4" className={classes.title}>
                Enquiries
              </Typography>
            </div>
            <Divider />
            <div className="enquiry-body container">
              <div className="enquiry-body-sec">
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Name</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Email</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1">Message</Typography>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              {enquiries.length > 0 && enquiries.map((enquiry, index) => (
                <div className={classes.enquiryRow} key={index}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body1">{enquiry.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{enquiry.email}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">{enquiry.message}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
