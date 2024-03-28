import React, { useState, useEffect } from "react";
import { Modal, Typography, Button, Rating } from "@mui/material";
import axios from "axios";

const ViewReviewsModal = ({ open, onClose, toolId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && toolId) {
      fetchReviews(toolId);
    }
  }, [open, toolId]);

  const fetchReviews = async (toolId) => {
    try {
      console.log("Fetching reviews for toolId:", toolId);
      const response = await axios.get(`https://aiwebsite-backend.onrender.com/tools/${toolId}/reviews`);
      console.log("Response from API:", response);
      setReviews(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Error fetching reviews. Please try again later.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ padding: 20, background: "#fff", borderRadius: 10, maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>Reviews</Typography>
        <div style={{ maxHeight: 300, overflowY: "auto" }}> {/* Added scroller */}
          {error ? (
            <Typography variant="body1" align="center" style={{ color: "red" }}>
              {error}
            </Typography>
          ) : (
            reviews.map((data, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <Typography variant="body1" style={{ maxWidth: "100%", overflowWrap: "break-word" }}>{data.reviewContent}</Typography>
                <Rating name={`rating-${index}`} value={data.rating} readOnly />
              </div>
            ))
          )}
        </div>
        <Button variant="contained" color="primary" onClick={onClose} style={{ marginTop: 10, width: "100%" }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ViewReviewsModal;
