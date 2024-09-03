"use client";
import React, { useState } from "react";
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

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    router.push("/");
  };

  const goServices = () => {
    router.push("/services");
  };

  const goAbout = () => {
    router.push("/about");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  const processImage = async (file) => {
    setLoading(true);

    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);

      // Upload the image to Cloudinary via your API route
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image via server");
      }

      const uploadData = await uploadResponse.json();
      const publicImageUrl = uploadData.url; // The URL of the uploaded image
      console.log("Uploaded image to Cloudinary:", publicImageUrl);

      // Send the public URL to your backend to process it with Replicate API
      const replicateResponse = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: publicImageUrl }),
      });

      if (!replicateResponse.ok) {
        throw new Error("Failed to process the image via Replicate API");
      }

      const replicateData = await replicateResponse.json();
      console.log("Processed image with Replicate:", replicateData.output);

      setProcessedImageUrl(replicateData.output); // Set the processed image URL
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

  const handleDownload = async () => {
    try {
      const response = await fetch(processedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "processed-image.png";
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <Box>
      <ClerkProvider>
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
      Sign In
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
    </ClerkProvider>

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
                Image Recovery with AI
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#666", mb: 4 }}
              >
                Drop an image here, and our AI will enhance it for you.
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
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  "Drag & drop an image here, or click to select a file"
                )}
              </Box>

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {loading ? (
                <Typography variant="h5" color="primary">
                  Processing...
                </Typography>
              ) : (
                processedImageUrl && (
                  <Box>
                    <Card elevation={8}>
                      <CardMedia
                        component="img"
                        height="520"
                        image={processedImageUrl}
                        alt="Processed Image"
                        sx={{ objectFit: "cover" }}
                      />
                    </Card>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button
                        variant="contained"
                        color="#2B2D42"
                        onClick={handleDownload}
                      >
                        Download Processed Image
                      </Button>
                    </Box>
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
