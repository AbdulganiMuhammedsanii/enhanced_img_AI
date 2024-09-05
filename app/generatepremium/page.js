"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  TextField,
  IconButton,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Folder } from "@mui/icons-material";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImages, setProcessedImages] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isLoaded) {
      // If the user is not signed in, redirect to sign-in page
      if (!isSignedIn) {
        router.push("/sign-in");
      } else if (!user.publicMetadata?.hasPremiumAccess) {
        // If the user is signed in but hasn't paid, redirect to the payment page
        router.push("/services");
      } else {
        // If the user is signed in and has paid, allow access to the page
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const goServices = () => {
    router.push("/services");
  };

  const goAbout = () => {
    router.push("/about");
  };

  const goHome = () => {
    router.push("/");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl); // Optionally store the first uploaded image URL
        await processImage(file);
      }
    }
  };
  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files); // Get all files from the folder
    const imageFiles = files.filter((file) => file.type.startsWith("image/")); // Filter only image files
  
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl); // Optionally store the first uploaded image URL
        await processImage(file); // Process each image file
      }
    }
  };
  <input
  type="file"
  id="fileInput"
  style={{ display: "none" }}
  onChange={handleFileInputChange}
  accept="image/*"
  webkitdirectory="true" // Enable folder selection
  multiple
/>


  const processImage = async (file) => {
    setLoading(true);

    try {
      const base64Image = await fileToBase64(file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadData = await uploadResponse.json();
      const publicImageUrl = uploadData.url;

      const replicateResponse = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imgCurr: publicImageUrl }),
      });

      if (!replicateResponse.ok) {
        throw new Error("Failed to process image via Replicate API");
      }

      const replicateData = await replicateResponse.json();

      setProcessedImages((prevImages) => [...prevImages, replicateData.output]); // Append new processed image URL
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    try {
      for (const [index, imageUrl] of processedImages.entries()) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        zip.file(`processed-image-${index + 1}.png`, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "processed-images.zip");
    } catch (error) {
      console.error("Failed to download images:", error);
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary" elevation={4} sx={{ backgroundColor: "#2B2D42" }}>
        <Toolbar>
          <Typography
          onClick={goHome}
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              "&:hover": { color: "lightgray" },
            }}
          >
            Recovery AI
          </Typography>
          <Button
            onClick = {goServices}
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
            onClick={goAbout}
          >
            About
          </Button>

          {/* Clerk Authentication UI */}
          <SignedOut>
  <SignInButton>
    <Button
      color="inherit"
      sx={{
        mx: 1,
        color: "white",
        border: "1px solid white", // Border for better visibility
        borderRadius: "20px", // Rounded corners
        px: 2, // Padding for extra space inside the button
        textTransform: "none", // Disable uppercase text transformation
        "&:hover": {
          color: "#848080", // Slightly darker color on hover
          borderColor: "#848080", // Match border color on hover
        },
      }}
    >
      Sign In/Up
    </Button>
  </SignInButton>
</SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              sx={{
                mx: 1,
                color: "white",
                "&:hover": { color: "lightgray" },
              }}
            />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* First section - White background */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                Image Recovery with AI
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#666", mb: 4 }}>
                Drop an image or select several images and import here, and our AI will enhance the image(s) for you.
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #2B2D42",
                  borderRadius: 4,
                  p: 4,
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: "100%" }} />
                ) : (
                  "Drag & drop images here, or click to select files"
                )}
              </Box>

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                accept="image/*"
                multiple
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {loading ? (
                <Typography variant="h5" color="primary">
                  Processing...
                </Typography>
              ) : (
                processedImages.length > 0 && (
                  <Box sx={{ textAlign: "center", mt: 4 }}>
                    <IconButton onClick={handleDownloadAll}>
    <Folder
      sx={{
        fontSize: 80, // Larger size for the icon
        color: "#2B2D42", // Matching the dark blue color of the theme
        backgroundColor: "#F9F9F9", // Lighter background for contrast
        borderRadius: "12px", // Rounded edges for smoother look
        padding: "10px", // Add some padding
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
        "&:hover": {
          backgroundColor: "#E0E0E0", // Light gray background on hover for better contrast
          transform: "scale(1.1)", // Slight scale up on hover
        },
        transition: "all 0.3s ease", // Smooth transition for hover effect
      }}
    />
  </IconButton>
                    <Typography variant="body2">Download Processed Images</Typography>
                  </Box>
                )
              )}
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
        </Container>
      </Box>
    </Box>
  );
}
