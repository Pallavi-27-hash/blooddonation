// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Donor from './models/Donor.js'; // include `.js` extension

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/blood-donation');

app.post('/api/donors', async (req, res) => {
  const { name, gender, bloodGroup, phone, city, district } = req.body;
  if (!name || !gender || !bloodGroup || !phone || !city || !district) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const donor = new Donor(req.body);
  await donor.save();
  res.status(201).json({ message: 'Donor added' });
});

app.get('/api/donors', async (req, res) => {
  const { bloodGroup, city, district } = req.query;
  const query = {};
  if (bloodGroup) query.bloodGroup = bloodGroup;
  if (city) query.city = city;
  if (district) query.district = district;

  let donors = await Donor.find(query);

  if (donors.length === 0 && city && district) {
    donors = await Donor.find({ city, district });
  }

  res.json(donors);
});

app.listen(5000, () => console.log('Server running on port 5000'));
