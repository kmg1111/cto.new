const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/container-home-designer')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

const designsRouter = require('./routes/designs');
app.use('/api/designs', designsRouter);

app.get('/', (req, res) => {
  res.json({ message: '3D Container Home Designer API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
