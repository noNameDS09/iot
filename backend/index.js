const express = require('express');
const app = express();
const port = 3000;
const mainRoutes = require('./routes/index.js');
const alertRoutes = require('./routes/alerts.js');

// Mount the router on the app
app.use('/', mainRoutes);
app.use('/alerts', alertRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
