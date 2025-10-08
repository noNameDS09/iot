const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const energyRoutes = require('./routes/energy'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mount energy routes
app.use('/energy', energyRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('IoT API is running ');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
