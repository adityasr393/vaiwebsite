  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Paper, Typography, Button, Grid, CircularProgress, Pagination, TextField,Modal, Rating } from "@mui/material";
  import { color, styled } from "@mui/system";
  import Footer from "./footer";
  import Header from "./header";
  import ReviewModal from "./star"; 
  import ViewReviewsModal from "./viewrev"; 
  const backgroundColor = "#0e1117";
  const textColor = "#fff";
  const primaryColor = "linear-gradient(90deg, #006eff, #00b4ff, #004eff)";
  const hoverColor = "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)";
  const borderColor = "#ffffff";
  const hoverTextColor = "#f2f2f2";

  const CategoryContainer = styled('div')({
    backgroundColor: backgroundColor,
    color: textColor,
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  });

  const FilterButtonContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Align items horizontally in the center
    alignItems: 'center',
    marginBottom: '60px',
  });

  const CardContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '20px',
    
  });

  const CardWrapper = styled('div')({
    padding: '25px',
  });
  const CardItem = styled(Paper)(({ theme }) => ({
    padding: "20px",
    margin: "10px", // Adjust the margin as needed
    textAlign: "center",
    borderRadius: "10px",
    height: "550px", // Set a larger fixed height for all cards
    position: "relative",
    backgroundColor: "#2F4F4F", // Background color
    color: "#ffffff", // Text color
    transition: "transform 0.3s ease-in-out", // Added transition for smoother animation

    "& img": {
      width: "100%",
      height: "200px", // Set a fixed height for all images
      objectFit: "cover", // Ensure the image covers the container
      borderRadius: "10px 10px 0 0", // Apply rounded corners only to the top
    },

    "&:hover": {
      transform: "translateY(-5px)", // Lift effect on hover
    },

    [theme.breakpoints.down("sm")]: {
      padding: "15px",
      margin: "8px", // Adjust the margin for smaller screens
      position: "relative",
      height: "350px", // Adjusted height for smaller screens

      "& img": {
        height: "250px", // Adjusted height for smaller screens
      },
    },
  }));

  const CardContent = styled('div')({
    height: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  });

  const VisitButton = styled(Button)(({ theme }) => ({
    padding: "12px 25px",
    borderRadius: "6px",
    background: primaryColor,
    color: textColor,
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
    "&:hover": {
      background: hoverColor,
    },
  }));

  const LoadingIndicator = styled(CircularProgress)({
    color: "#d81b60", // You may want to define a variable for consistent usage
  });

  const FilterButton = styled(Button)(({ isSelected }) => ({
    backgroundColor: isSelected ? "#ffffff" : "transparent",
    color: isSelected ? "#2F4F4F" : textColor,
    border: isSelected ? `2px solid ${borderColor}` : "1px solid #ffffff",
    borderRadius: "20px",
    margin: "5px",
    padding: "5px 20px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor:  "#ffffff",
      color: isSelected ? "#f2f2f2" : hoverTextColor,
      background: isSelected ? "#507F7F" : primaryColor,
    

      boxShadow: isSelected ? "none" : "0px 0px 20px rgba(0, 0, 0, 0.2)",
    },
    alignSelf: 'center',
  }));

  const ClearButton = styled(Button)({
    backgroundColor: "#1F3838",
    color: "#f2f2f2",
    border: `4px solid ${borderColor}`,
    margin: "10px",
    padding: "15px 20px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#ABD4F8",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
    },
    alignSelf: 'center',
  });

  const AllToolsHeader = styled(Typography)({
    background: primaryColor,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    color: "transparent",
    transition: "background-position 0.3s",
    "&:hover": {
      backgroundPosition: "100% 50%",
    },
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "6.5rem",
    color: textColor,
  });
  const FilterTextField = styled(TextField)({
    marginBottom: "20px",
    borderRadius: "20px",
    width: "800px",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: borderColor,
      borderRadius: "20px",
      transition: "border-color 0.3s ease", // Add transition for smooth effect
    },
    "& .MuiInputLabel-root": {
      textAlign: "center", // Center the label
    },
    "& .MuiInputLabel-outlined": {
      color: "#f2f2f2",
    },
    "& .MuiOutlinedInput-input": {
      color: "#f2f2f2",
      padding: "10px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: borderColor,
    },
    // Change border color on hover
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff", // Change border color to white on hover
    },
  });


  const Category = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredCategory, setFilteredCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(null);
    const itemsPerPage = 12;
    // State variable to track whether the description is expanded
    const [expanded, setExpanded] = useState(false);

    // Function to toggle the expanded state
    const toggleDescription = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      getAllData();
     
    
    }, []);

    const getAllData = async () => {
      const apiUrl = "https://aiwebsite-backend.onrender.com/AI";
    
      try {
        const response = await axios.get(apiUrl);
        const toolsData = response.data;
    
        // Fetch reviews for each tool and update the tool data
        const updatedToolsData = await Promise.all(
          toolsData.map(async (tool) => {
            try {
              // Fetch reviews for the current tool
              const reviewsResponse = await axios.get(`https://aiwebsite-backend.onrender.com/tools/${tool._id}/reviews`);
              const reviewsCount = reviewsResponse.data.length; // Count of reviews for the current tool
    
              // Add reviews count to the tool data
              return { ...tool, totalReviews: reviewsCount };
            } catch (error) {
              console.error("Error fetching reviews for tool:", tool._id, error);
              // If there's an error fetching reviews, return the tool data without reviews count
              return tool;
            }
          })
        );
    
        setCategory(updatedToolsData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching tools data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };
    

    const handleCategoryClick = (categoryName) => {
      const filteredData = category.filter((data) => data.category.toLowerCase() === categoryName.toLowerCase());
      setFilteredCategory(filteredData);
      setSelectedFilter(categoryName);
      setCurrentPage(1);
    };

  const clearFilter = () => {
    setFilteredCategory(null);
    setSelectedFilter(null);
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedPricingTypes([]); // Reset selected pricing types
  };


    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    // Add state variables for pricing type filters
    const [selectedPricingTypes, setSelectedPricingTypes] = useState([]);

    // Function to handle selection/deselection of pricing types
  // Function to handle selection/deselection of pricing types
  const handlePricingTypeClick = (pricingType) => {
    // Deselect all pricing types first
    setSelectedPricingTypes([]);

    // Then select the clicked pricing type
    setSelectedPricingTypes([pricingType]);
  };


    // Function to check if a pricing type is selected
    const isPricingTypeSelected = (pricingType) => {
      return selectedPricingTypes.includes(pricingType);
    };

    const filteredItems = (filteredCategory || category).filter((item) =>
      item.status === true &&
      item.toolTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedPricingTypes.length === 0 || selectedPricingTypes.includes(item.pricingType))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, value) => {
      setCurrentPage(value);
    };
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [toolId, setToolId] = useState(""); // State to hold the toolId
    const [isViewReviewsModalOpen, setIsViewReviewsModalOpen] = useState(false);
    const [reviewsData, setReviewsData] = useState([]);
  

    // Function to handle opening the review modal
    const handleOpenReviewModal = (id) => {
      setToolId(id);
      setIsReviewModalOpen(true);
    };

    // Function to handle closing the review modal
    const handleCloseReviewModal = () => {
      setIsReviewModalOpen(false);
    };

    const [reviews, setReviews] = useState([]); // State to hold reviews

    



  // Function to handle opening the view reviews modal
  const handleOpenViewReviewsModal = async (id) => {
    // Update the toolId state with the id of the current tool
    setToolId(id);
    // Fetch reviews for the current tool
   
    // Open the ViewReviewsModal and pass the reviews and totalReviews
    setReviewsData(reviews);
    setIsViewReviewsModalOpen(true);
  };

  // Function to handle closing the view reviews modal
  const handleCloseViewReviewsModal = () => {
    setIsViewReviewsModalOpen(false);
  };

  
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
      <>
        <Header />
        <CategoryContainer>
          <AllToolsHeader variant="h4">ALL AI TOOLS</AllToolsHeader>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FilterTextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        
          <div className="aitools-all-categories" > <FilterButtonContainer>
            {[
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
            ].map((categoryName) => (
              <FilterButton
                key={categoryName}
                isSelected={selectedFilter === categoryName}
                onClick={() => handleCategoryClick(categoryName)}
                className="aitools-category-filter"
              >
                {categoryName}
              </FilterButton>
            ))}</FilterButtonContainer>
          </div>
          {loading && <LoadingIndicator />}
          {error && <Typography variant="body1" style={{ color: textColor }}>Error fetching data. Please try again later.</Typography>}
          <ClearButton onClick={clearFilter} className="aitools-category-filter">Clear Filter</ClearButton>
          <div>
            {/* Filter buttons for Trial and Freemium */}
            <FilterButton
              isSelected={isPricingTypeSelected("Trial")}
              onClick={() => handlePricingTypeClick("Trial")}
            >
              Trial
            </FilterButton>
            <FilterButton
              isSelected={isPricingTypeSelected("Freemium")}
              onClick={() => handlePricingTypeClick("Freemium")}
            >
              Freemium
            </FilterButton>
          </div>
          
      {/* Render the ReviewModal */}
      <ReviewModal
          open={isReviewModalOpen}
          onClose={handleCloseReviewModal}
          toolId={toolId}
          setReviews={setReviews} // Pass the function to update reviews
        />
        
        {/* Render the ViewReviewsModal */}
        <ViewReviewsModal
          open={isViewReviewsModalOpen}
          onClose={handleCloseViewReviewsModal}
          reviews={reviewsData}
          toolId={toolId}
        />
      
          <Grid container spacing={3}>
            {currentItems.map((data) => (
              <Grid key={data.id} item xs={12} md={6} lg={3}>
                <CardContainer>
                  <CardWrapper>
                    <CardItem elevation={3}>
                      <img
                        src={data.firebaseImageUrl}
                        alt="Tool Image"
                        style={{ width: "100%", borderRadius: "10px", maxHeight: "150px", objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography variant="h6" style={{ color: textColor, marginBottom: '10px' }}>{data.toolTitle}</Typography>
                        <Typography variant="body2" style={{ color: textColor, marginBottom: '10px' }}>{data.category}</Typography>
                        <Typography variant="body2">
                          {data.toolDescription.length > 110 ? (
                            <>
                              {expanded ? (
                                <Typography variant="body2">{data.toolDescription}</Typography>
                              ) : (
                                <Typography variant="body2">
                                  {data.toolDescription.substring(0, 110)}...
                                </Typography>
                              )}
                              <Button
                                variant="text"
                                color="inherit" // Change to "inherit" to maintain the default color
                                size="small"
                                style={{ color: '#00bfff' }} // Set the color to a darker shade, like grey
                                onClick={toggleDescription} // Toggle expanded state on button click
                              >
                                {expanded ? "Read Less" : "Read More"}
                              </Button>
                            </>
                          ) : (
                            <Typography variant="body2">{data.toolDescription}</Typography>
                          )}
                        </Typography>
                        <Typography variant="h6">{data.pricingType}</Typography>
                        <Typography variant="body2">{data.pricingPrice}</Typography>
                      </CardContent>
                      <div style={{ marginTop: "auto" }}> {/* Ensure the Visit button is at the bottom */}
                        <VisitButton
                          variant="contained"
                          href={data.visitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit
                        </VisitButton>
                        <button onClick={() => handleOpenReviewModal(data._id)}>
          Open Review Modal
        </button>
        <Button onClick={() => handleOpenViewReviewsModal(data._id)}>
    View Reviews ({data.totalReviews})
  </Button>

                      </div>
                    </CardItem>

                  </CardWrapper>
                </CardContainer>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil((filteredCategory || category).length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "40px",
              borderRadius: "5px",
              "& .MuiPaginationItem-root": {
                color: "#000000",
              },
              "& .MuiPaginationItem-page": {
                backgroundColor: "transparent",
                margin: "0 2px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          />
        </CategoryContainer>
        <Footer />
      </>
    );
  };

  export default Category;
