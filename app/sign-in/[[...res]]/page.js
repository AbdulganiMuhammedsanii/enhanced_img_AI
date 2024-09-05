"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";

export default function SignInPage() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const goServices = () => {
    router.push("/services");
  };

  const goAbout = () => {
    router.push("/about");
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
            onClick={goServices}
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            Services
          </Button>
          <Button
            onClick={goAbout}
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            About
          </Button>

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
          <SignedOut>
            <SignInButton>
              <Button
                color="inherit"
                sx={{
                  mx: 1,
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "20px",
                  px: 2,
                  textTransform: "none",
                  "&:hover": {
                    color: "#848080",
                    borderColor: "#848080",
                  },
                }}
              >
                Sign In/Up
              </Button>
            </SignInButton>
          </SignedOut>
        </Toolbar>
      </AppBar>

      {/* Centered Sign-In Section */}
      <Box
        sx={{
          backgroundColor: "white",
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh", // Adjust as necessary for page layout
        }}
      >
        <Container maxWidth="sm">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
              >
                Sign In to Access Premium Features
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <SignedOut>
                  <SignIn />
                </SignedOut>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#2B2D42", py: 8, color: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Subscribe to Get Access Now
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
                Subscribe
              </Button>
              <Typography variant="body2" sx={{ mt: 2, color: "lightgray" }}>
                ✓ Access to exclusive updates
                <br />
                ✓ Unlimited lifetime access
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
