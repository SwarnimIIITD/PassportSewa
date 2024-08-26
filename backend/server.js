const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection string
const MONGO_URI = 'mongodb+srv://swarnim21567:Swarnim%4045@passportsewa.lv3ev.mongodb.net/?retryWrites=true&w=majority&appName=passportSewa';

// Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build'))); // Add this line

// Routes
app.use('/api/auth', authRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // Add this line
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
