const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// House price prediction endpoint (mocked for demonstration)
app.post('/api/predict', async (req, res) => {
  const { area, bedrooms, bathrooms, parking, stories, furnishingstatus } = req.body;

  // Mock price prediction logic
  const price = (area * 1000) + (bedrooms * 20000) + (bathrooms * 15000) + (parking * 10000) + (stories * 25000);
  res.json({ price });
});

// Nearby locations endpoint using GoMap API
app.get('/api/nearby', async (req, res) => {
  const { lat, lng } = req.query;
  const API_KEY = 'AlzaSyW7y4VxZn-jwC7Y9ayXE7hT_fLoTwkNGDB'; // Replace with your actual GoMap API key

  try {
    const response = await axios.get('https://gomaps.pro/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 1500,
        key: API_KEY,
      },
    });

    const nearbyLocations = response.data.results.map(result => ({
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      name: result.name,
    }));
    
    res.json(nearbyLocations);
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    res.status(500).json({ error: 'Error fetching nearby locations' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
