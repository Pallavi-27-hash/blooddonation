// backend/models/Donor.js
import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
});

export default mongoose.model('Donor', donorSchema);




