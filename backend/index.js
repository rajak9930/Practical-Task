const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Search countries by name
app.get('/api/countries', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Country not found or API error' });
  }
});

// Get country by code 
app.get('/api/countries/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    res.json(response.data[0]);
  } catch (error) {
    res.status(404).json({ error: 'Country code not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
