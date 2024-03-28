import React, { useState, useEffect } from "react";
import axios from "axios";
import { keyframes, styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Header from "./header";
import Aiimage2 from "./images/ai-technology-microchip-background-futuristic-innovation-technology-remix_53876-108532.jpg";
import { Col } from "react-bootstrap";
import Footer from "./footer";
import { Box } from "@mui/material";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// Keyframe animations
const sparkAnimation = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.5; }
`;

const fadeInUpAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const textAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled components
const AppContainer = styled("div")({
  backgroundColor: "#0e1117", // Updated background color
  color: "#fff",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  overflow: "hidden",
});

const Sparkle = styled("div")({
  position: "absolute",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#ffcc00",
  transformOrigin: "center",
  animation: `${sparkAnimation} 1s infinite`,
  pointerEvents: "none",
  zIndex: 999,
  transition: "opacity 0.5s",
  "&:hover": {
    opacity: 1,
  },
});

const HeaderPaper = styled(Paper)({
  padding: (theme) => theme.spacing(3),
  textAlign: "left",
  marginBottom: (theme) => theme.spacing(2),
  animation: `${fadeInUpAnimation} 1s ease-out`,
  background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)", // Updated gradient colors
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  margin: "130px 0 20px 140px",
  fontSize: "40px",
  fontStyle: "bold",
  boxShadow: "none", // Removed shadow
});

const MainContentPaper = styled(Paper)({
  padding: (theme) => theme.spacing(4),
  textAlign: "left",
  marginBottom: (theme) => theme.spacing(4),
  animation: `${fadeInUpAnimation} 1s ease-out`,
  background: "#0e1117", // Updated background color
  margin: "5px 0px 5px 60px",
  boxShadow: "none", // Removed shadow
});

const StyledTypography = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  fontFamily: "Roboto, sans-serif",
  color: "#fff",
  marginBottom: "1rem",
  margin: "10px 50px 6px 80px",
});

const GetStartedButton = styled(Button)({
  backgroundColor: "#006eff", // Updated button color
  color: "#fff",
  "&:hover": {
    backgroundColor: "#004eff", // Updated hover color
  },
  alignSelf: "flex-start",
  margin: "0px 0 0 140px",
});

const AnimatedText = styled(Typography)({
  fontSize: "1.2rem",
  color: "#fff",
  background: "#0e1117", // Updated background color
  padding: "20px",
  borderRadius: "10px",
  display: "inline-block",
  animation: `${textAnimation} 3s ease-in-out`,
  margin: "6px 0px 5px 60px",
  animationIterationCount: 1,
});

const FeaturedToolsContainer = styled(Paper)({
  backgroundColor: "#0e1117", // Updated background color
  color: "#fff",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Roboto, sans-serif",
  padding: "20px",

  boxShadow: "none", // Removed shadow
});

const Categeory2 = styled(Paper)({
  backgroundColor: "#0e1117", // Updated background color
  color: "#fff",
  minHeight: "68vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Roboto, sans-serif",
  padding: "20px",
  paddingBottom: "150px",
  boxShadow: "none", // Removed shadow
});

const FeaturedToolsHeading = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#DDDDDD",
});

const CardListContainer = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  position: "relative",
  height: "50%",
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



const ButtonContainer = styled("div")({
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
});

const VisitButton = styled(Button)(({ theme }) => ({
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
  "&:hover": {
    background: "linear-gradient(93deg, #7D25EC -15.1%, #CCB4FF 144.78%)",// Change the hover color in the gradient
  },
}));

const Home = () => {
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [newCategory, setNewCategory] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [featuredCategory, setFeaturedCategory] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const theme = useTheme();
 // State variable to track whether the description is expanded
 const [expanded, setExpanded] = useState(false);

 // Function to toggle the expanded state
 const toggleDescription = () => {
   setExpanded(!expanded);
 };
  const handleMouseMove = (e) => {
    setSparklePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    getAllData('new');
    getAllData('popular');
    getAllData('featured');
  }, []);

  const getAllData = (filter) => {
    let apiUrl = 'https://aiwebsite-backend.onrender.com/AI';
    if (filter) {
      apiUrl += `?filter=${filter}`;
    }
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const filteredData = response.data.filter(item => item.filter === filter);
        switch(filter) {
          case 'new':
            setNewCategory(filteredData);
            break;
          case 'popular':
            setPopularCategory(filteredData);
            break;
          case 'featured':
            setFeaturedCategory(filteredData);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setViewportHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <Header />
    <AppContainer>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <HeaderPaper elevation={3}>
            <h1>Discover AI Tools for</h1>
            <Typography variant="h4">
              Streamline Your Workflow with Our List of AI tools - Find Your Perfect Solution!
            </Typography>
          </HeaderPaper>
          <MainContentPaper elevation={3}>
            <StyledTypography variant="h4">
              Empower Your Work with Intelligent Solutions
            </StyledTypography>
            <AnimatedText variant="body1">
              Revolutionize your workflow with our cutting-edge <br />
              AI tool. Whether you're a developer, data scientist,
              <br />
              or business professional, our tool is designed to
              <br />
              meet your needs.
            </AnimatedText>
          </MainContentPaper>
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={3}>
            <Grid item md={12}></Grid>
            <Grid item md={12}>
              <div
                className="d-flex justify-content-end"
                style={{ marginTop: "140px", marginRight: "10px" }}
              >
                <img
                  src={Aiimage2}
                  alt="AI Image"
                  style={{ height: "250px" }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Sparkle style={{ left: sparklePosition.x, top: sparklePosition.y }} />
    </AppContainer>
    <Box sx={{ flexGrow: 1, bgcolor: '#0e1117', overflow: 'hidden' }}>
  <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#0e1117' }}>
    <span style={{
      background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    }}>
      New Category
    </span>
  </Typography>

  <AutoPlaySwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={activeStep}
    onChangeIndex={handleStepChange}
    enableMouseEvents
    style={{ height: viewportHeight - 50, overflow: 'hidden' }}
    interval={10000} 
  >
    {newCategory.map((step, index) => (
  <div key={index}>
    {Math.abs(activeStep - index) <= 2 ? (
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ width: '100%', marginLeft: 0, marginRight: 0 }}
      >
        {newCategory.slice(index, index + 4).map((step, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <CardItem elevation={3}>
              <img
                src={step.firebaseImageUrl}
                alt={`Card ${index + idx + 1} Image`}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">{step.toolTitle}</Typography>
              {/* Modified part: Implementing Read More */}
              <Typography variant="body2">
              {step.toolDescription.length > 100 ? (
        <>
          {expanded ? (
            <Typography variant="body2">{step.toolDescription}</Typography>
          ) : (
            <Typography variant="body2">
              {step.toolDescription.substring(0, 100)}...
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
        <Typography variant="body2">{step.toolDescription}</Typography>
      )}
              </Typography>
              {/* End of modified part */}
              <Typography variant="h6">{step.pricingType}</Typography>
              <Typography variant="body2">{step.pricingPrice}</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href={step.visitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
              </ButtonContainer>
            </CardItem>
          </Grid>
        ))}
      </Grid>
    ) : null}
  </div>
))}

  </AutoPlaySwipeableViews>
</Box>

   
    <Box sx={{ flexGrow: 1, bgcolor: '#0e1117', overflow: 'hidden' }}>
  <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#0e1117' }}>
    <span style={{
      background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    }}>
      Popular Category
    </span>
  </Typography>

  <AutoPlaySwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={activeStep}
    onChangeIndex={handleStepChange}
    enableMouseEvents
    style={{ height: viewportHeight - 50, overflow: 'hidden' }}
  >
    {popularCategory.map((step, index) => (
      <div key={index}>
        {Math.abs(activeStep - index) <= 2 ? (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          >
            {popularCategory.slice(index, index + 4).map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <CardItem elevation={3}>
                  <img
                    src={step.firebaseImageUrl}
                    alt={`Card ${index + idx + 1} Image`}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                  <Typography variant="h6">{step.toolTitle}</Typography>
                  <Typography variant="body2">
              {step.toolDescription.length > 100 ? (
        <>
          {expanded ? (
            <Typography variant="body2">{step.toolDescription}</Typography>
          ) : (
            <Typography variant="body2">
              {step.toolDescription.substring(0, 100)}...
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
        <Typography variant="body2">{step.toolDescription}</Typography>
      )}
              </Typography>
              {/* End of modified part */}
              <Typography variant="h6">{step.pricingType}</Typography>
              <Typography variant="body2">{step.pricingPrice}</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href={step.visitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
              </ButtonContainer>
            </CardItem>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </div>
    ))}
  </AutoPlaySwipeableViews>
</Box>
  
<Box sx={{ flexGrow: 1, bgcolor: '#0e1117', overflow: 'hidden' }}>
  <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#0e1117' }}>
    <span style={{
      background: "linear-gradient(90deg, #006eff, #00b4ff, #004eff)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    }}>
      featured Category
    </span>
  </Typography>

  <AutoPlaySwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={activeStep}
    onChangeIndex={handleStepChange}
    enableMouseEvents
    style={{ height: viewportHeight - 50, overflow: 'hidden' }}
  >
    {featuredCategory.map((step, index) => (
      <div key={index}>
        {Math.abs(activeStep - index) <= 2 ? (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          >
            {featuredCategory.slice(index, index + 4).map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <CardItem elevation={3}>
                  <img
                    src={step.firebaseImageUrl}
                    alt={`Card ${index + idx + 1} Image`}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                  <Typography variant="h6">{step.toolTitle}</Typography>
                  <Typography variant="body2">
              {step.toolDescription.length > 100 ? (
        <>
          {expanded ? (
            <Typography variant="body2">{step.toolDescription}</Typography>
          ) : (
            <Typography variant="body2">
              {step.toolDescription.substring(0, 100)}...
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
        <Typography variant="body2">{step.toolDescription}</Typography>
      )}
              </Typography>
              {/* End of modified part */}
              <Typography variant="h6">{step.pricingType}</Typography>
              <Typography variant="body2">{step.pricingPrice}</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href={step.visitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
              </ButtonContainer>
            </CardItem>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </div>
    ))}
  </AutoPlaySwipeableViews>
</Box>
  
   <Footer/>
  </>
  
  );
};

export default Home;
