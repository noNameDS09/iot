const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const energyRoutes = require('./routes/energy');
require('./utils/db'); // this ensures DB is initialized

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/energy', energyRoutes);

app.get('/', (req, res) => {
  res.send('IoT Energy Monitoring API is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
