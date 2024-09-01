import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardMedia,
  TextField,
  IconButton,
} from '@mui/material';
import { Instagram, Facebook, Twitter } from '@mui/icons-material';

export default function Home() {
  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI Studio
        </Typography>
        <Button color="inherit">Services</Button>
        <>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </>
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg">
      <Grid container spacing={4} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Capturing Moments with Precision
          </Typography>
          <Typography variant="body1" paragraph>
            Transform your moments into lasting art with our expert studio photography services, 
            where precision meets creativity to deliver exceptional, high-quality images that speak volumes.
          </Typography>
          <Button variant="contained" color="primary">
            TRY IT OUT
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image="/path-to-your-studio-image.jpg"
              alt="Photography Studio"
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '4rem' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="/path-to-your-product-image.jpg"
              alt="Product Photography"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Subscribe to get access now
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email Address"
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" fullWidth>
            SUBSCRIBE
          </Button>
          <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
            ✓ Over 20 hours of video content
            ✓ Unlimited lifetime access
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4" align="center" style={{ margin: '4rem 0 2rem' }}>
        Join our community
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <IconButton>
            <Instagram />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <Twitter />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <Facebook />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={6} md={3} key={item}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`/path-to-your-image-${item}.jpg`}
                alt={`Photography sample ${item}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
}
