// fakeApi.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/energy/history', (req, res) => {
  res.json([
    { date: '2025-10-03', kWh: 120 },
    { date: '2025-10-04', kWh: 140 },
    { date: '2025-10-05', kWh: 130 },
    { date: '2025-10-06', kWh: 160 },
    { date: '2025-10-07', kWh: 150 },
    { date: '2025-10-08', kWh: 170 },
    { date: '2025-10-09', kWh: 180 },
  ]);
});

app.get('/energy/top-consumers', (req, res) => {
  res.json([
    { device: 'Fridge', kWh: 80 },
    { device: 'AC', kWh: 150 },
    { device: 'Heater', kWh: 90 },
    { device: 'Washing Machine', kWh: 60 },
    { device: 'TV', kWh: 40 },
  ]);
});

app.listen(port, () => {
  console.log(`Fake API running at http://localhost:${port}`);
});
