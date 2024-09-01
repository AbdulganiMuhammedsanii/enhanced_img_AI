import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  TextField,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { Instagram, Facebook, Twitter } from '@mui/icons-material';

//image array
const imageSources = [
  '/replicate(1).jpg',
  '/replicate(2).jpg',
  '/replicate(3).jpg',
  '/replicate(4).jpg',
];

export default function Home() {
  return (
    <Box>
      <AppBar position="static" color="primary" elevation={4} sx={{ backgroundColor: '#2B2D42' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white', '&:hover': { color: 'lightgray' } }}>
            AI Studio
          </Typography>
          <Button color="inherit" sx={{ mx: 1, color: 'white', '&:hover': { color: 'lightgray' } }}>Services</Button>
          <Button color="inherit" sx={{ mx: 1, color: 'white', '&:hover': { color: 'lightgray' } }}>About</Button>
          <Button color="inherit" sx={{ mx: 1, color: 'white', '&:hover': { color: 'lightgray' } }}>Contact</Button>
        </Toolbar>
      </AppBar>

      {/* First section - White background */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Capturing Moments with Precision
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4 }}>
                Transform your moments into lasting art with our expert studio photography services, 
                where precision meets creativity to deliver exceptional, high-quality images that speak volumes.
              </Typography>
              <Button variant="contained" color="primary" size="small" sx={{ px: 10, py: 0.75, borderRadius: 10, backgroundColor: 'black', '&:hover': { backgroundColor: '#848080' } }} >
                TRY IT OUT
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={8}>
                <CardMedia
                  component="img"
                  height="520"
                  image="/replicate(1).png"
                  alt="Photography Studio"
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Second section - Dark background */}
      <Box sx={{ backgroundColor: '#2B2D42', py: 8, color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={8}>
                <CardMedia
                  component="img"
                  height="520"
                  image="/repl.png"
                  alt="Product Photography"
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 4, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                  Subscribe to get access now
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email Address"
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'lightgray' }, '& input': { color: 'white' } } }}
                />
                <Button variant="contained" color="primary" size="small" sx={{ px: 10, py: 0.75, borderRadius: 10, backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'lightgray' } }} >
                  SUBSCRIBE
                </Button>
                <Typography variant="body2" sx={{ mt: 2, color: 'lightgray' }}>
                  ✓ Over 20 hours of video content<br />
                  ✓ Unlimited lifetime access
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Third section - White background */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
            Join our community
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mb: 8 }}>
            <IconButton sx={{ mx: 1, color: '#2B2D42' }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ mx: 1, color: '#2B2D42' }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ mx: 1, color: '#2B2D42' }}>
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
                    sx={{ objectFit: 'cover' }}
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