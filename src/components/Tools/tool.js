import React, { useState, useEffect } from "react";
import { keyframes, styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Header from "../header";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import Aiimage2 from "../images/ai-technology-microchip-background-futuristic-innovation-technology-remix_53876-108532.jpg";
import { Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { apiUrl } from "../../constant";

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

const AppContainer = styled("div")({
  backgroundColor: "black",
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
  background: "linear-gradient(90deg, #800080, #0000FF, #ff69b4)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  margin: "130px 0 20px 140px",
});

const MainContentPaper = styled(Paper)({
  padding: (theme) => theme.spacing(4),
  textAlign: "left",
  marginBottom: (theme) => theme.spacing(4),
  animation: `${fadeInUpAnimation} 1s ease-out`,
  background: "black",
  margin: "5px 40px 5px 10px",
});

const StyledTypography = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  fontFamily: "Roboto, sans-serif",
  color: "#fff",
  marginBottom: "1rem",
  margin: "10px 50px 6px 80px",
  marginTop: "10rem",
});

const StyledTypography2 = styled(Typography)({
  fontSize: "1rem",

  fontFamily: "Roboto, sans-serif",
  color: "#fff",
  marginBottom: "1rem",
  margin: "10px 10px 6px 80px",
  // marginTop: '10rem'
});

const GetStartedButton = styled(Button)({
  backgroundColor: "#800080",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#d81b60",
  },
  alignSelf: "flex-start",
  margin: "10px 0 0 90px",
});

const AnimatedText = styled(Typography)({
  fontSize: "1.2rem",
  color: "#fff",
  background: "black",
  padding: "20px",
  borderRadius: "10px",
  display: "inline-block",
  animation: `${textAnimation} 3s ease-in-out`,
  margin: "6px 0px 50px 60px",
  animationIterationCount: 1,
});

const FeaturedToolsContainer = styled("div")({
  backgroundColor: "#e6e6ff",
  color: "Black",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Roboto, sans-serif",
  padding: "20px",
  paddingBottom: "150px",
});

const FeaturedToolsHeading = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px",
});

const CardListContainer = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  position: "reletive",
  height: "50%",
});
const CardListContainer2 = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  position: "reletive",
  marginTop: "20px",
});
const columnContainer = styled(Col)({
  width: "auto",
});

const CardItem = styled(Paper)(({ theme }) => ({
  padding: "20px",
  margin: "10px",
  textAlign: "center",
  borderRadius: "10px",
  height: "100%",
  position: "relative",
  backgroundColor: "black",
  height: "110%",
  color: "white",

  [theme.breakpoints.down("sm")]: {
    padding: "15px",
    margin: "8px",
    position: "reletive",
  },
}));

const ButtonContainer = styled("div")({
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
});

const VisitButton = styled(Button)({
  backgroundColor: "#800080",
  color: "#fff",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: "#d81b60",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#800080",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#d81b60",
  },
});

const OverlappingCardContainer = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  marginTop: "-100px",
});

const Footer = styled("div")({
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
});
const AlternativeToolText = styled("div")({
  backgroundColor: "#e6e6e6",
  color: "Black",
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Roboto, sans-serif",
  padding: "20px",
  fontSize: "1rem",
});

const SocialIcons = styled("div")({
  marginTop: "20px",
  "& > *": {
    margin: "0 10px",
    fontSize: "1.5rem",
    color: "#fff",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#ffd700",
    },
  },
});
const WriteMeAI = () => {
  const theme = useTheme();
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [products, setProducts] = useState([]);
  const { id } = useParams();

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
    getproductbyid(id);
  }, [id]);

  const getproductbyid = (productId) => {
    axios
      .get(`${apiUrl}/tool/productgetbyid/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <AppContainer>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Grid container spacing={3}>
              <Grid item md={12}></Grid>
              <Grid item md={12}>
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "140px" }}
                >
                  <img
                    src="https://findmyaitool.com/upload/tool-web-img/writemeai.webp"
                    alt="AI Image"
                    style={{ height: "200px", marginRight: "110px" }}
                  />
                </div>
              </Grid>
            </Grid>
            {/**/}
          </Grid>
          <Grid item md={6}>
            <MainContentPaper elevation={3} style={{ marginRight: "120px" }}>
              <StyledTypography variant="h4">
               {products.title}<br></br>
              </StyledTypography>
              <StyledTypography2 variant="h6">
               {products.shortDescription}
              </StyledTypography2>
            </MainContentPaper>
            <GetStartedButton
              variant="contained"
              style={{ marginLeft: "90px" }}
            >
              $premium
            </GetStartedButton>
            <StyledTypography2 variant="h6" style={{ marginLeft: "90px" }}>
              Start From $10/month
            </StyledTypography2>
            <Grid>
              <VisitButton
                variant="contained"
                href={products.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "90px", marginTop: "10px" }}
              >
                Visit
              </VisitButton>
              <SaveButton
                variant="contained"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              >
                Save
              </SaveButton>
            </Grid>
          </Grid>
        </Grid>

        <Sparkle style={{ left: sparklePosition.x, top: sparklePosition.y }} />
      </AppContainer>
      <AlternativeToolText>
        <StyledTypography2
          style={{
            color: "black",
            marginTop: "30px",
            lineHeight: "20px",
            marginLeft: "50px",
          }}
        >
         {products.description}
        </StyledTypography2>
      </AlternativeToolText>
      <FeaturedToolsContainer elevation={3}>
        <FeaturedToolsHeading variant="h4">
          Alternative AI Tools
        </FeaturedToolsHeading>
        
        

        <CardListContainer2 container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <CardItem elevation={3}>
              <img
                src={Aiimage2}
                alt="Card 1 Image"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">WriteMe.ai</Typography>
              <Typography variant="body2">Copywriting</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href="https://www.writeme.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
                <SaveButton variant="contained">Save</SaveButton>
              </ButtonContainer>
            </CardItem>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CardItem elevation={3}>
              <img
                src="https://cdn.mos.cms.futurecdn.net/At7QcNoJyUQz7fWCAbk2k7.jpg"
                alt="Card 2 Image"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">Rytr</Typography>
              <Typography variant="body2">Copywriting</Typography>

              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href="https://www.writeme.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
                <SaveButton variant="contained">Save</SaveButton>
              </ButtonContainer>
            </CardItem>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CardItem elevation={3}>
              <img
                src="https://www.julsa.fr/wp-content/uploads/2022/12/open-ai-Chat-GPT.jpeg"
                alt="Card 3 Image"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">Tools IT</Typography>
              <Typography variant="body2">Copywriting</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href="https://www.writeme.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
                <SaveButton variant="contained">Save</SaveButton>
              </ButtonContainer>
            </CardItem>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CardItem elevation={4}>
              <img
                src="https://v2.prvihosting.com/wp-content/uploads/2019/03/microsoft-open-ai.jpg"
                alt="Card 4 Image"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">TextTO Multimedia</Typography>
              <Typography variant="body2">Copywriting</Typography>
              <ButtonContainer>
                <VisitButton
                  variant="contained"
                  href="https://www.writeme.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </VisitButton>
                <SaveButton variant="contained">Save</SaveButton>
              </ButtonContainer>
            </CardItem>
          </Grid>
        </CardListContainer2>
        <OverlappingCardContainer
          container
          spacing={3}
        ></OverlappingCardContainer>
      </FeaturedToolsContainer>

      <Footer>
        <Typography variant="body2">
          © 2023 Your Company Name. All rights reserved.
        </Typography>

        <SocialIcons>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </SocialIcons>
      </Footer>
    </>
  );
};

export default WriteMeAI;
