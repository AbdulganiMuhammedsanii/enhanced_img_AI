"use client";
import React, { useState, useEffect } from "react";
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
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import getStripe from '@/utils/get-stripe';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,  
} from "@clerk/nextjs";

export default function Services() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser(); // Fetch user details
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false); // Initialize the state
  const [openModal, setOpenModal] = useState(false); // Modal state

  const goHome = () => {
    router.push("/");
  };

  const checkPremiumStatus = async (userId) => {
    console.log("YIPPIE")
    try {
      const response = await fetch(`/api/check-premium-status?userId=${userId}`, {
        method: "GET", // Use GET method
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("EYEEEE", data.hasPremiumAccess)
      setHasPremiumAccess(data.hasPremiumAccess); // Update state based on API response
    } catch (error) {
      console.error("Error checking premium status:", error);
    }
  };

  const goAbout = () => {
    router.push("/about");
  };

  const goPremiumPage = () => {
    if (hasPremiumAccess) {
      router.push("/generatepremium");
    } else {
      router.push("/services");
    }
  };

  const createCheckoutSession = async (priceId) => {
    if (!isSignedIn) {
      setOpenModal(true); // Open modal if the user is not signed in
      return;
    }

    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          referrer: window.location.href,  // Capture the current URL and pass it as the referrer
          userId: user.id, // Pass the Clerk user ID
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error creating checkout session:", data.error);
        return;
      }

      // Use the getStripe function to load the Stripe instance
      const stripe = await getStripe();
      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Failed to create checkout session:", err);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      checkPremiumStatus(user.id); // Call the API when the user is signed in
      if (hasPremiumAccess) {
        router.push("/generatepremium");
      }
    }
  }, [hasPremiumAccess, router, isLoaded, isSignedIn, user]);

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

      {/* Service Options Section */}
      <Box sx={{ backgroundColor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
          >
            Choose Your Plan
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", mb: 4, textAlign: "center" }}
          >
            Select the best plan that suits your needs. High Quality Results in an accessible format.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Basic Bundle
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#2B2D42",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    $5
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    Up to 50 image generations in a compressed folder
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 4,
                      display: "block",
                      mx: "auto",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    onClick={() => createCheckoutSession("price_1PvXtlL4uTCp4HsU4SVb4waA")}
                  >
                    Choose Basic Bundle
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Premium Bundle
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#2B2D42",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    $15
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", textAlign: "center", mt: 2 }}
                  >
                    Lifetime unlimited image generations in a compressed folder
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 4,
                      display: "block",
                      mx: "auto",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    onClick={() => createCheckoutSession("price_1PvXu7L4uTCp4HsUERiXqEuo")}
                  >
                    Choose Premium Bundle
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modal for Sign In Alert */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle>{"Sign In Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please sign in to continue with your purchase.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <SignInButton>
            <Button color="primary">Sign In</Button>
          </SignInButton>
        </DialogActions>
      </Dialog>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: "#2B2D42", py: 8, color: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "white" }}
          >
            Join our community
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
