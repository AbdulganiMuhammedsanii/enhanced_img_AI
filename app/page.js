"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Grid,
  Box,
  Slider,
  Card,
  CardMedia,
  TextField
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sliderValue, setSliderValue] = useState(20);
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Reecover Moments with Precision ";
  const imageSources = [ "/replicate(1).jpg", "/replicate(2).jpg", "/replicate(3).jpg", "/replicate(4).jpg", ];

  const originalImageUrl =
  "images/couple.jpg"; // Original image
const processedImageUrl =
  "images/couple2.png"; // Processed image

  useEffect(() => {
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      // Ensure we are within bounds before updating the state
      if (currentIndex < fullText.length-1) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 70);
  
    return () => clearInterval(intervalId);
  }, [fullText]);
  

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue);
  };

  const goToGenerate = () => {
    router.push("/generate");
  };

  const goToAbout = () => {
    router.push("/about");
  };

  const goToServices = () => {
    router.push("/services");
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="primary"
        elevation={4}
        sx={{ backgroundColor: "#2B2D42" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "white",
              "&:hover": { color: "lightgray" },
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            Recovery AI
          </Typography>
          <Button
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
            onClick={goToServices}
          >
            Services
          </Button>
          <Button
            onClick={goToAbout}
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            About
          </Button>

        </Toolbar>
      </AppBar>

      {/* First section - White background */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {displayedText}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#666", mb: 4 }}
              >
                Recover your lost moments into lasting art with our expert studio
                photography services, where precision meets creativity to
                deliver exceptional, high-quality images that speak volumes.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  px: 10,
                  py: 0.75,
                  borderRadius: 10,
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#848080" },
                }}
                onClick={goToGenerate}
              >
                TRY IT OUT
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", height: "520px", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                  <img
                    src={originalImageUrl}
                    alt="Original"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <img
                    src={processedImageUrl}
                    alt="Processed"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                      transition: "clip-path 0.1s ease-out",
                    }}
                  />
                </Box>
              </Box>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="continuous-slider"
                sx={{
                  mt: 3,
                  width: "100%",
                  zIndex: 10,
                  color: "primary.main",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#2B2D42",
                    border: "2px solid white",
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#2B2D42",
                    height: 4,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "lightgray",
                    height: 4,
                  },
                  "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
                    boxShadow: "0px 0px 0px 8px rgba(255, 255, 255, 0.16)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Second section - Dark background */}
      <Box sx={{ backgroundColor: "#2B2D42", py: 8, color: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={8}>
                <CardMedia
                  component="img"
                  height="520"
                  image="/images/child_portrait.jpg"
                  alt="Product Photography"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  p: 4,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Subscribe to get access now
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email Address"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "lightgray" },
                      "& input": { color: "white" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    px: 10,
                    py: 0.75,
                    borderRadius: 10,
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": { backgroundColor: "lightgray" },
                  }}
                >
                  SUBSCRIBE
                </Button>
                <Typography variant="body2" sx={{ mt: 2, color: "lightgray" }}>
                  ✓ Access to exclusive updates
                  <br />
                  ✓ Unlimited lifetime access
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Third section - White background */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
          >
            Join our community
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mb: 8 }}>
            <IconButton sx={{ mx: 1, color: "#2B2D42" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ mx: 1, color: "#2B2D42" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ mx: 1, color: "#2B2D42" }}>
              <Facebook />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {imageSources.map((src, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={src}
                    alt={`Photography sample ${index + 1}`}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
