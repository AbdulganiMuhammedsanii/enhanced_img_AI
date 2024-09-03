"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";


export default function Services() {
  const router = useRouter();

  const createCheckoutSession = async (priceId) => {
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error("Error creating checkout session:", data.error);
        return;
      }
  
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Failed to create checkout session:", err);
    }
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
            }}
          >
            Recovery AI
          </Typography>
          <Button
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
          <Button
            color="inherit"
            sx={{ mx: 1, color: "white", "&:hover": { color: "lightgray" } }}
          >
            Contact
          </Button>
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
            paragraphsx={{ color: "#666", mb: 4, textAlign: "center" }}
            >
              Select the best plan that suits your needs. Start with a 7-day free trial or jump straight to our premium plan for advanced features.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Card elevation={8} sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                    >
                      Basic Plan
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "#2B2D42", textAlign: "center", mt: 2 }}
                    >
                      $5/month
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", textAlign: "center", mt: 2 }}
                    >
                      7-day free trial
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 4, display: "block", mx: "auto" }}
                      onClick={() => createCheckoutSession("basic")}
                    >
                      Choose Basic
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={8} sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                    >
                      Premium Plan
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "#2B2D42", textAlign: "center", mt: 2 }}
                    >
                      $15/month
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", textAlign: "center", mt: 2 }}
                    >
                      Access to all features
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 4, display: "block", mx: "auto" }}
                      onClick={() => createCheckoutSession("premium")}
                    >
                      Choose Premium
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
  
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
