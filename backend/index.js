const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?next=10', {
      headers: { 'x-apisports-key': process.env.API_KEY }
    });

    const matches = response.data.response.map(match => ({
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      date: match.fixture.date
    }));

    res.json(matches);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
