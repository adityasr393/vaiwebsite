import React, { useState } from "react";
import { Modal, Typography, TextField, Button, Rating, Box } from "@mui/material";
import axios from "axios";

const ReviewModal = ({ open, onClose, toolId }) => {
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = async () => {
    try {
      // Send POST request to the API endpoint with review content, rating, and toolId
      await axios.post(`https://aiwebsite-backend.onrender.com/tools/${toolId}/reviews`, {
        reviewContent,
        rating,
        toolId
      });
      
      // Clear form fields
      setReviewContent("");
      setRating(0);
      // Close modal
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ padding: 20, background: "#fff", borderRadius: 10, maxWidth: 400 }}>
          <Typography variant="h5" align="center" gutterBottom>Give Your Review</Typography>
          <TextField
            label="Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            style={{ marginBottom: 10 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReviewSubmit}
            style={{ width: '100%' }}
          >
            Submit Review
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
