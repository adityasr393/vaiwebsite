  // import React, { useState, useEffect } from "react";
  // import axios from "axios";
  // import { Paper, Typography, Button, Grid, CircularProgress, Pagination, TextField,Modal, Rating } from "@mui/material";
  // import { color, styled } from "@mui/system";
  // import Footer from "./footer";
  // import Header from "./header";
  // import ReviewModal from "./star"; 
  // import ViewReviewsModal from "./viewrev"; 
  // const backgroundColor = "#0e1117";
  // const textColor = "#fff";
  // const primaryColor = "linear-gradient(90deg, #006eff, #00b4ff, #004eff)";
  // const hoverColor = "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)";
  // const borderColor = "#ffffff";
  // const hoverTextColor = "#f2f2f2";

  // const CategoryContainer = styled('div')({
  //   backgroundColor: backgroundColor,
  //   color: textColor,
  //   minHeight: "80vh",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "relative",
  //   overflow: "hidden",
  // });

  // const FilterButtonContainer = styled('div')({
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center', // Align items horizontally in the center
  //   alignItems: 'center',
  //   marginBottom: '60px',
  // });

  // const CardContainer = styled('div')({
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   marginTop: '20px',
    
  // });

  // const CardWrapper = styled('div')({
  //   padding: '25px',
  // });
  // const CardItem = styled(Paper)(({ theme }) => ({
  //   padding: "20px",
  //   margin: "10px", // Adjust the margin as needed
  //   textAlign: "center",
  //   borderRadius: "10px",
  //   height: "550px", // Set a larger fixed height for all cards
  //   position: "relative",
  //   backgroundColor: "#2F4F4F", // Background color
  //   color: "#ffffff", // Text color
  //   transition: "transform 0.3s ease-in-out", // Added transition for smoother animation

  //   "& img": {
  //     width: "100%",
  //     height: "200px", // Set a fixed height for all images
  //     objectFit: "cover", // Ensure the image covers the container
  //     borderRadius: "10px 10px 0 0", // Apply rounded corners only to the top
  //   },

  //   "&:hover": {
  //     transform: "translateY(-5px)", // Lift effect on hover
  //   },

  //   [theme.breakpoints.down("sm")]: {
  //     padding: "15px",
  //     margin: "8px", // Adjust the margin for smaller screens
  //     position: "relative",
  //     height: "350px", // Adjusted height for smaller screens

  //     "& img": {
  //       height: "250px", // Adjusted height for smaller screens
  //     },
  //   },
  // }));

  // const CardContent = styled('div')({
  //   height: '250px',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  //   whiteSpace: 'normal',
  // });

  // const VisitButton = styled(Button)(({ theme }) => ({
  //   padding: "12px 25px",
  //   borderRadius: "6px",
  //   background: primaryColor,
  //   color: textColor,
  //   fontSize: "16px",
  //   fontWeight: "600",
  //   lineHeight: "22px",
  //   display: "inline-flex",
  //   alignItems: "center",
  //   gap: "10px",
  //   border: "none",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s ease",
  //   marginRight: "10px",
  //   "&:hover": {
  //     background: hoverColor,
  //   },
  // }));

  // const LoadingIndicator = styled(CircularProgress)({
  //   color: "#d81b60", // You may want to define a variable for consistent usage
  // });

  // const FilterButton = styled(Button)(({ isSelected }) => ({
  //   backgroundColor: isSelected ? "#ffffff" : "transparent",
  //   color: isSelected ? "#2F4F4F" : textColor,
  //   border: isSelected ? `2px solid ${borderColor}` : "1px solid #ffffff",
  //   borderRadius: "20px",
  //   margin: "5px",
  //   padding: "5px 20px",
  //   transition: "background-color 0.3s",
  //   "&:hover": {
  //     backgroundColor:  "#ffffff",
  //     color: isSelected ? "#f2f2f2" : hoverTextColor,
  //     background: isSelected ? "#507F7F" : primaryColor,
    

  //     boxShadow: isSelected ? "none" : "0px 0px 20px rgba(0, 0, 0, 0.2)",
  //   },
  //   alignSelf: 'center',
  // }));

  // const ClearButton = styled(Button)({
  //   backgroundColor: "#1F3838",
  //   color: "#f2f2f2",
  //   border: `4px solid ${borderColor}`,
  //   margin: "10px",
  //   padding: "15px 20px",
  //   transition: "background-color 0.3s",
  //   "&:hover": {
  //     backgroundColor: "transparent",
  //     color: "#ABD4F8",
  //     boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
  //   },
  //   alignSelf: 'center',
  // });

  // const AllToolsHeader = styled(Typography)({
  //   background: primaryColor,
  //   "-webkit-background-clip": "text",
  //   "-webkit-text-fill-color": "transparent",
  //   backgroundSize: "400% 400%",
  //   WebkitBackgroundClip: "text",
  //   color: "transparent",
  //   transition: "background-position 0.3s",
  //   "&:hover": {
  //     backgroundPosition: "100% 50%",
  //   },
  //   textAlign: "center",
  //   marginTop: "20px",
  //   marginBottom: "20px",
  //   fontSize: "6.5rem",
  //   color: textColor,
  // });
  // const FilterTextField = styled(TextField)({
  //   marginBottom: "20px",
  //   borderRadius: "20px",
  //   width: "800px",
  //   "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
  //     borderColor: borderColor,
  //     borderRadius: "20px",
  //     transition: "border-color 0.3s ease", // Add transition for smooth effect
  //   },
  //   "& .MuiInputLabel-root": {
  //     textAlign: "center", // Center the label
  //   },
  //   "& .MuiInputLabel-outlined": {
  //     color: "#f2f2f2",
  //   },
  //   "& .MuiOutlinedInput-input": {
  //     color: "#f2f2f2",
  //     padding: "10px",
  //   },
  //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //     borderColor: borderColor,
  //   },
  //   // Change border color on hover
  //   "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "#ffffff", // Change border color to white on hover
  //   },
  // });


  // const Category = () => {
  //   const [category, setCategory] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [filteredCategory, setFilteredCategory] = useState(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [selectedFilter, setSelectedFilter] = useState(null);
  //   const itemsPerPage = 12;
  //   // State variable to track whether the description is expanded
  //   const [expanded, setExpanded] = useState(false);

  //   // Function to toggle the expanded state
  //   const toggleDescription = () => {
  //     setExpanded(!expanded);
  //   };

  //   useEffect(() => {
  //     getAllData();
     
    
  //   }, []);

  //   const getAllData = async () => {
  //     const apiUrl = "https://aiwebsite-backend.onrender.com/AI";
    
  //     try {
  //       const response = await axios.get(apiUrl);
  //       const toolsData = response.data;
    
  //       // Fetch reviews for each tool and update the tool data
  //       const updatedToolsData = await Promise.all(
  //         toolsData.map(async (tool) => {
  //           try {
  //             // Fetch reviews for the current tool
  //             const reviewsResponse = await axios.get(`https://aiwebsite-backend.onrender.com/tools/${tool._id}/reviews`);
  //             const reviewsCount = reviewsResponse.data.length; // Count of reviews for the current tool
    
  //             // Add reviews count to the tool data
  //             return { ...tool, totalReviews: reviewsCount };
  //           } catch (error) {
  //             console.error("Error fetching reviews for tool:", tool._id, error);
  //             // If there's an error fetching reviews, return the tool data without reviews count
  //             return tool;
  //           }
  //         })
  //       );
    
  //       setCategory(updatedToolsData);
  //       setLoading(false);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Error fetching tools data:", error);
  //       setError("Error fetching data. Please try again later.");
  //       setLoading(false);
  //     }
  //   };
    

  //   const handleCategoryClick = (categoryName) => {
  //     const filteredData = category.filter((data) => data.category.toLowerCase() === categoryName.toLowerCase());
  //     setFilteredCategory(filteredData);
  //     setSelectedFilter(categoryName);
  //     setCurrentPage(1);
  //   };

  // const clearFilter = () => {
  //   setFilteredCategory(null);
  //   setSelectedFilter(null);
  //   setSearchQuery("");
  //   setCurrentPage(1);
  //   setSelectedPricingTypes([]); // Reset selected pricing types
  // };


  //   const handleSearchChange = (event) => {
  //     setSearchQuery(event.target.value);
  //   };

  //   // Add state variables for pricing type filters
  //   const [selectedPricingTypes, setSelectedPricingTypes] = useState([]);

  //   // Function to handle selection/deselection of pricing types
  // // Function to handle selection/deselection of pricing types
  // const handlePricingTypeClick = (pricingType) => {
  //   // Deselect all pricing types first
  //   setSelectedPricingTypes([]);

  //   // Then select the clicked pricing type
  //   setSelectedPricingTypes([pricingType]);
  // };


  //   // Function to check if a pricing type is selected
  //   const isPricingTypeSelected = (pricingType) => {
  //     return selectedPricingTypes.includes(pricingType);
  //   };

  //   const filteredItems = (filteredCategory || category).filter((item) =>
  //     item.status === true &&
  //     item.toolTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //     (selectedPricingTypes.length === 0 || selectedPricingTypes.includes(item.pricingType))
  //   );

  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  //   const handleChangePage = (event, value) => {
  //     setCurrentPage(value);
  //   };
  //   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  //   const [toolId, setToolId] = useState(""); // State to hold the toolId
  //   const [isViewReviewsModalOpen, setIsViewReviewsModalOpen] = useState(false);
  //   const [reviewsData, setReviewsData] = useState([]);
  

  //   // Function to handle opening the review modal
  //   const handleOpenReviewModal = (id) => {
  //     setToolId(id);
  //     setIsReviewModalOpen(true);
  //   };

  //   // Function to handle closing the review modal
  //   const handleCloseReviewModal = () => {
  //     setIsReviewModalOpen(false);
  //   };

  //   const [reviews, setReviews] = useState([]); // State to hold reviews

    



  // // Function to handle opening the view reviews modal
  // const handleOpenViewReviewsModal = async (id) => {
  //   // Update the toolId state with the id of the current tool
  //   setToolId(id);
  //   // Fetch reviews for the current tool
   
  //   // Open the ViewReviewsModal and pass the reviews and totalReviews
  //   setReviewsData(reviews);
  //   setIsViewReviewsModalOpen(true);
  // };

  // // Function to handle closing the view reviews modal
  // const handleCloseViewReviewsModal = () => {
  //   setIsViewReviewsModalOpen(false);
  // };

  
  // const fetchReviews = async (toolId) => {
  //   try {
  //     console.log("Fetching reviews for toolId:", toolId);
  //     const response = await axios.get(`https://aiwebsite-backend.onrender.com/tools/${toolId}/reviews`);
  //     console.log("Response from API:", response);
  //     setReviews(response.data);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //     setError("Error fetching reviews. Please try again later.");
  //   }
  // };


  //   return (
  //     <>
  //       <Header />
  //       <CategoryContainer>
  //         <AllToolsHeader variant="h4">ALL AI TOOLS</AllToolsHeader>
  //         <div style={{ display: 'flex', justifyContent: 'center' }}>
  //           <FilterTextField
  //             label="Search"
  //             variant="outlined"
  //             value={searchQuery}
  //             onChange={handleSearchChange}
  //           />
  //         </div>
        
  //         <div className="aitools-all-categories" > <FilterButtonContainer>
  //           {[
  //             "#AI Analytics",
  //             "#GPTs",
  //             "#Design AI",
  //             "#AI Detector",
  //             "#Presentations",
  //             "#Resources",
  //             "#Social Media",
  //             "#Copywriting",
  //             "#Art & Image",
  //             "#AI Chatbot",
  //             "#Business",
  //             "#Marketing",
  //             "#SEO",
  //             "#AI Assistant",
  //             "#AI Crypto Trading Bots",
  //             "#AI Stock Trading Bots",
  //             "#ChatGPT Plugins",
  //             "#Voice & Audio",
  //             "#Content Creation",
  //             "#CRM & Automation",
  //             "#Customer Support",
  //             "#Developer Tools",
  //             "#Ecommerce",
  //             "#Email Assistant",
  //             "#Free Tools",
  //             "#Video",
  //             "#Website & Funnel",
  //             "#Workspace & Productivity",
  //           ].map((categoryName) => (
  //             <FilterButton
  //               key={categoryName}
  //               isSelected={selectedFilter === categoryName}
  //               onClick={() => handleCategoryClick(categoryName)}
  //               className="aitools-category-filter"
  //             >
  //               {categoryName}
  //             </FilterButton>
  //           ))}</FilterButtonContainer>
  //         </div>
  //         {loading && <LoadingIndicator />}
  //         {error && <Typography variant="body1" style={{ color: textColor }}>Error fetching data. Please try again later.</Typography>}
  //         <ClearButton onClick={clearFilter} className="aitools-category-filter">Clear Filter</ClearButton>
  //         <div>
  //           {/* Filter buttons for Trial and Freemium */}
  //           <FilterButton
  //             isSelected={isPricingTypeSelected("Trial")}
  //             onClick={() => handlePricingTypeClick("Trial")}
  //           >
  //             Trial
  //           </FilterButton>
  //           <FilterButton
  //             isSelected={isPricingTypeSelected("Freemium")}
  //             onClick={() => handlePricingTypeClick("Freemium")}
  //           >
  //             Freemium
  //           </FilterButton>
  //         </div>
          
  //     {/* Render the ReviewModal */}
  //     <ReviewModal
  //         open={isReviewModalOpen}
  //         onClose={handleCloseReviewModal}
  //         toolId={toolId}
  //         setReviews={setReviews} // Pass the function to update reviews
  //       />
        
  //       {/* Render the ViewReviewsModal */}
  //       <ViewReviewsModal
  //         open={isViewReviewsModalOpen}
  //         onClose={handleCloseViewReviewsModal}
  //         reviews={reviewsData}
  //         toolId={toolId}
  //       />
      
  //         <Grid container spacing={3}>
  //           {currentItems.map((data) => (
  //             <Grid key={data.id} item xs={12} md={6} lg={3}>
  //               <CardContainer>
  //                 <CardWrapper>
  //                   <CardItem elevation={3}>
  //                     <img
  //                       src={data.firebaseImageUrl}
  //                       alt="Tool Image"
  //                       style={{ width: "100%", borderRadius: "10px", maxHeight: "150px", objectFit: "cover" }}
  //                     />
  //                     <CardContent>
  //                       <Typography variant="h6" style={{ color: textColor, marginBottom: '10px' }}>{data.toolTitle}</Typography>
  //                       <Typography variant="body2" style={{ color: textColor, marginBottom: '10px' }}>{data.category}</Typography>
  //                       <Typography variant="body2">
  //                         {data.toolDescription.length > 110 ? (
  //                           <>
  //                             {expanded ? (
  //                               <Typography variant="body2">{data.toolDescription}</Typography>
  //                             ) : (
  //                               <Typography variant="body2">
  //                                 {data.toolDescription.substring(0, 110)}...
  //                               </Typography>
  //                             )}
  //                             <Button
  //                               variant="text"
  //                               color="inherit" // Change to "inherit" to maintain the default color
  //                               size="small"
  //                               style={{ color: '#00bfff' }} // Set the color to a darker shade, like grey
  //                               onClick={toggleDescription} // Toggle expanded state on button click
  //                             >
  //                               {expanded ? "Read Less" : "Read More"}
  //                             </Button>
  //                           </>
  //                         ) : (
  //                           <Typography variant="body2">{data.toolDescription}</Typography>
  //                         )}
  //                       </Typography>
  //                       <Typography variant="h6">{data.pricingType}</Typography>
  //                       <Typography variant="body2">{data.pricingPrice}</Typography>
  //                     </CardContent>
  //                     <div style={{ marginTop: "auto" }}> {/* Ensure the Visit button is at the bottom */}
  //                       <VisitButton
  //                         variant="contained"
  //                         href={data.visitLink}
  //                         target="_blank"
  //                         rel="noopener noreferrer"
  //                       >
  //                         Visit
  //                       </VisitButton>
  //                       <button onClick={() => handleOpenReviewModal(data._id)}>
  //         Open Review Modal
  //       </button>
  //       <Button onClick={() => handleOpenViewReviewsModal(data._id)}>
  //   View Reviews ({data.totalReviews})
  // </Button>

  //                     </div>
  //                   </CardItem>

  //                 </CardWrapper>
  //               </CardContainer>
  //             </Grid>
  //           ))}
  //         </Grid>
  //         <Pagination
  //           count={Math.ceil((filteredCategory || category).length / itemsPerPage)}
  //           page={currentPage}
  //           onChange={handleChangePage}
  //           color="primary"
  //           sx={{
  //             marginTop: "20px",
  //             display: "flex",
  //             justifyContent: "center",
  //             backgroundColor: "white",
  //             padding: "10px",
  //             marginBottom: "40px",
  //             borderRadius: "5px",
  //             "& .MuiPaginationItem-root": {
  //               color: "#000000",
  //             },
  //             "& .MuiPaginationItem-page": {
  //               backgroundColor: "transparent",
  //               margin: "0 2px",
  //               "&:hover": {
  //                 backgroundColor: "rgba(0, 0, 0, 0.3)",
  //               },
  //             },
  //             "& .MuiPaginationItem-page.Mui-selected": {
  //               backgroundColor: "rgba(0, 0, 0, 0.5)",
  //             },
  //           }}
  //         />
  //       </CategoryContainer>
  //       <Footer />
  //     </>
  //   );
  // };

  // export default Category;
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { 
    Paper, 
    Typography, 
    Button, 
    Grid, 
    CircularProgress, 
    Pagination, 
    TextField
  } from "@mui/material";
  import { styled } from "@mui/system";
  import Footer from "./footer";
  import Header from "./header";
  import ReviewModal from "./star";
  import ViewReviewsModal from "./viewrev";
  
  // Theme constants
  const THEME = {
    backgroundColor: "#0e1117",
    textColor: "#fff",
    primaryColor: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
    hoverColor: "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)",
    borderColor: "#ffffff",
    hoverTextColor: "#f2f2f2",
    cardBackground: "#2F4F4F"
  };
  
  // Styled components
  const CategoryContainer = styled('div')({
    backgroundColor: THEME.backgroundColor,
    color: THEME.textColor,
    minHeight: "80vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  });
  
  const FilterButtonContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
    padding: '0 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  });
  
  const CardItem = styled(Paper)(({ theme }) => ({
    padding: "20px",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: THEME.cardBackground,
    color: THEME.textColor,
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
  
    "& img": {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px",
    },
  
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "450px",
    },
  }));
  
  const ActionButton = styled(Button)({
    padding: "8px 16px",
    borderRadius: "6px",
    background: THEME.primaryColor,
    color: THEME.textColor,
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    
    "&:hover": {
      background: THEME.hoverColor,
      transform: "translateY(-2px)",
    },
  });
  
  const SearchField = styled(TextField)({
    width: "100%",
    maxWidth: "800px",
    marginBottom: "30px",
    
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      
      "& fieldset": {
        borderColor: THEME.borderColor,
      },
      
      "&:hover fieldset": {
        borderColor: THEME.hoverTextColor,
      },
      
      "&.Mui-focused fieldset": {
        borderColor: THEME.primaryColor,
      },
    },
    
    "& .MuiInputLabel-root": {
      color: THEME.textColor,
    },
    
    "& .MuiInputBase-input": {
      color: THEME.textColor,
    },
  });
  
  const Category = () => {
    // State management
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPricingType, setSelectedPricingType] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [modalState, setModalState] = useState({
      review: { isOpen: false, toolId: null },
      viewReviews: { isOpen: false, toolId: null, data: [] }
    });
  
    const ITEMS_PER_PAGE = 12;
  
    // Fetch tools data
    useEffect(() => {
      fetchTools();
    }, []);
  
    const fetchTools = async () => {
      try {
        const response = await axios.get("https://aiwebsite-backend.onrender.com/AI");
        const toolsWithReviews = await Promise.all(
          response.data.map(async (tool) => {
            try {
              const reviewsResponse = await axios.get(
                `https://aiwebsite-backend.onrender.com/tools/${tool._id}/reviews`
              );
              return { ...tool, totalReviews: reviewsResponse.data.length };
            } catch (error) {
              console.error(`Error fetching reviews for tool ${tool._id}:`, error);
              return { ...tool, totalReviews: 0 };
            }
          })
        );
        setTools(toolsWithReviews);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tools. Please try again later.");
        setLoading(false);
      }
    };
  
    // Filter handling
    const getFilteredTools = () => {
      return tools.filter(tool => {
        const matchesSearch = tool.toolTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || tool.category === selectedCategory;
        const matchesPricing = !selectedPricingType || tool.pricingType === selectedPricingType;
        return tool.status && matchesSearch && matchesCategory && matchesPricing;
      });
    };
  
    const getCurrentPageTools = () => {
      const filtered = getFilteredTools();
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };
  
    // Event handlers
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    };
  
    const handleCategoryFilter = (category) => {
      setSelectedCategory(category === selectedCategory ? null : category);
      setCurrentPage(1);
    };
  
    const handlePricingFilter = (pricingType) => {
      setSelectedPricingType(pricingType === selectedPricingType ? null : pricingType);
      setCurrentPage(1);
    };
  
    const handleDescriptionToggle = (toolId) => {
      setExpandedDescriptions(prev => ({
        ...prev,
        [toolId]: !prev[toolId]
      }));
    };
  
    const handleModalOpen = (modalType, toolId) => {
      setModalState(prev => ({
        ...prev,
        [modalType]: { isOpen: true, toolId }
      }));
    };
  
    const handleModalClose = (modalType) => {
      setModalState(prev => ({
        ...prev,
        [modalType]: { isOpen: false, toolId: null }
      }));
    };
  
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
  
    return (
      <>
        <Header />
        <CategoryContainer>
          <Typography variant="h2" component="h1" 
            sx={{
              background: THEME.primaryColor,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "40px",
              textAlign: "center"
            }}>
            ALL AI TOOLS
          </Typography>
  
          <SearchField
            label="Search Tools"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
  
          <FilterButtonContainer>
            {/* Category filters */}
            {categories.map((category) => (
              <ActionButton
                key={category}
                variant={selectedCategory === category ? "contained" : "outlined"}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </ActionButton>
            ))}
          </FilterButtonContainer>
  
          <FilterButtonContainer>
            {/* Pricing filters */}
            {["Trial", "Freemium"].map((pricing) => (
              <ActionButton
                key={pricing}
                variant={selectedPricingType === pricing ? "contained" : "outlined"}
                onClick={() => handlePricingFilter(pricing)}
              >
                {pricing}
              </ActionButton>
            ))}
          </FilterButtonContainer>
  
          <Grid container spacing={3} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
            {getCurrentPageTools().map((tool) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tool._id}>
                <CardItem>
                  <img src={tool.firebaseImageUrl} alt={tool.toolTitle} />
                  <Typography variant="h6" gutterBottom>{tool.toolTitle}</Typography>
                  <Typography variant="body2" color="textSecondary">{tool.category}</Typography>
                  
                  <Typography variant="body2" sx={{ flexGrow: 1, overflow: "hidden" }}>
                    {expandedDescriptions[tool._id]
                      ? tool.toolDescription
                      : `${tool.toolDescription.slice(0, 100)}...`}
                    <Button
                      size="small"
                      onClick={() => handleDescriptionToggle(tool._id)}
                      sx={{ color: THEME.primaryColor }}
                    >
                      {expandedDescriptions[tool._id] ? "Read Less" : "Read More"}
                    </Button>
                  </Typography>
  
                  <div style={{ marginTop: "auto", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <ActionButton
                      href={tool.visitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleModalOpen('review', tool._id)}
                    >
                      Add Review
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleModalOpen('viewReviews', tool._id)}
                    >
                      Reviews ({tool.totalReviews})
                    </ActionButton>
                  </div>
                </CardItem>
              </Grid>
            ))}
          </Grid>
  
          <Pagination
            count={Math.ceil(getFilteredTools().length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            sx={{
              marginTop: "40px",
              "& .MuiPaginationItem-root": {
                color: THEME.textColor,
                borderColor: THEME.borderColor,
              }
            }}
          />
  
          <ReviewModal
            open={modalState.review.isOpen}
            onClose={() => handleModalClose('review')}
            toolId={modalState.review.toolId}
            onReviewSubmitted={fetchTools}
          />
  
          <ViewReviewsModal
            open={modalState.viewReviews.isOpen}
            onClose={() => handleModalClose('viewReviews')}
            toolId={modalState.viewReviews.toolId}
          />
        </CategoryContainer>
        <Footer />
      </>
    );
  };
  
  // Categories array
  const categories = [
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
    "#Workspace & Productivity"
  ];
  
  export default Category;