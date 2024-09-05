"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Box,
  Divider,
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
  useUser,
} from "@clerk/nextjs";

export default function About() {
  const { isLoaded, isSignedIn, user } = useUser(); // Fetch user details
  const hasPremiumAccess = user?.publicMetadata?.hasPremiumAccess; // Check if the user has premium access

  const router = useRouter();

  const goToServices = () => {
    router.push("/services");
  };
  const goHome = () => {
    router.push("/");
  };

  const goPremiumPage = () => {
    if (hasPremiumAccess) {
      router.push("/premium/generate");
    } else {
      router.push("/services");
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
          {isSignedIn && (
            <Button
              color="inherit"
              sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
              onClick={goPremiumPage}
            >
              Generate Premium
            </Button>
          )}
          <Button
            onClick = {goToServices}
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
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

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/images/couple.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 15,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            Welcome to Recovery AI
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 2, color: "white", lineHeight: 1.5 }}
          >
            Bringing your memories back to life with advanced image recovery
            solutions. We turn your blurry, damaged photos into vivid, high-quality images.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, px: 4, py: 1.5, borderRadius: 10 }}
            onClick={goToServices}
          >
            Explore Our Services
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                The Problem Space
              </Typography>
              <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8 }}>
                In the digital age, our most cherished memories are often captured in photographs. 
                However, these images are not immune to the passage of time. Blurry, damaged, or 
                poorly captured photos can lead to the loss of valuable memories. Recovery AI 
                addresses this problem by offering advanced image recovery solutions that restore 
                your photos to their former glory, preserving your precious moments for years to come.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={8}>
                <CardMedia
                  component="img"
                  height="400"
                  image="/images/wedding.webp"
                  alt="Problem Space"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box sx={{ backgroundColor: "#F7F7F7", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
          >
            Use Cases
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#666", mb: 4, textAlign: "center" }}
          >
            Explore the different ways Recovery AI can bring value to your life.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: "white" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                  >
                    Family Photos
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    Restore your old family photos, making sure those precious
                    moments are never forgotten.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: "white" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                  >
                    Historical Archives
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    Preserve historical photographs by enhancing and repairing
                    deteriorated images for future generations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: "white" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                  >
                    Event Photography
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    Enhance photos from important events, ensuring every detail is captured in its full glory.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: "#2B2D42",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Ready to Recover Your Images?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            Start your journey to restore your photos today. Whether it's a
            single image or an entire album, Recovery AI is here to help.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1.5, borderRadius: 10 }}
            onClick={goToServices}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: "#121212", py: 8, color: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "white" }}
          >
            Connect with Us
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mb: 8 }}>
            <IconButton sx={{ mx: 1, color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ mx: 1, color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ mx: 1, color: "white" }}>
              <Facebook />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
