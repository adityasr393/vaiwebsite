import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Switch,
  Divider,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useAuth } from './auth/useauth';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(4), // Add padding to bottom of the container
  },
  title: {
    textAlign: 'center',
    background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  userRow: {
    marginBottom: theme.spacing(1),
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function AdminProfile() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    const apiUrl = `https://aiwebsite-backend.onrender.com/getsignup`;
    axios
      .get(apiUrl)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const updateStatus = (userId, newStatus) => {
    const data = { status: newStatus };
    axios
      .put(`https://aiwebsite-backend.onrender.com/updatestatus/${userId}`, data)
      .then(() => {
        // Assuming the update was successful, update the status in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Paper elevation={3}>
          <div className="blog-sec">
            <div className="blog-head-sec">
              <Typography variant="h4" className={classes.title}>
                Profile
              </Typography>
            </div>
            <Divider />
            <div className="blog-body container">
              <div className="blog-body-sec">
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={1}>
                    <Typography variant="subtitle1">S.no</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Name</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Username</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Email</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle1">Status</Typography>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              {users.length > 0 && users.map((data, index) => (
                <div className={classes.userRow} key={data._id}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={1}>
                      <Typography variant="body1">{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">{data.name}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">{data.username}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{data.email}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div className={classes.switchContainer}>
                        <Switch
                          checked={data.status}
                          onChange={(e) => updateStatus(data._id, e.target.checked)}
                          color="primary"
                          inputProps={{ "aria-label": "toggle user status" }}
                        />
                      </div>
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
