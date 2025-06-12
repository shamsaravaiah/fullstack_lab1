const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dishRoutes = require('./routes/dishes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/dishes', dishRoutes);

// Database connection
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.log(err.message));
