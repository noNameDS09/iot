const express = require('express');
const alertRoutes = require('./routes/alerts.js');
// Assuming you will have user routes from your lambda functions adapted for express
// import userRoutes from './routes/users.js'; 

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/v1/alerts', alertRoutes);
// app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Aura IoT Backend is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
