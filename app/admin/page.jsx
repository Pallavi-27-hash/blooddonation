'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [message, setMessage] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const cities = ['Hyderabad', 'Bangalore', 'Chennai'];
  const districtsByCity = {
    Hyderabad: ['Ranga Reddy', 'Medchal', 'Hyderabad'],
    Bangalore: ['Bangalore Urban', 'Bangalore Rural'],
    Chennai: ['Chennai Central', 'Chennai South'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/donors', {
        name,
        gender,
        bloodGroup,
        phone,
        city,
        district,
      });
      setMessage('Donor added successfully!');
      setName('');
      setGender('');
      setBloodGroup('');
      setPhone('');
      setCity('');
      setDistrict('');
    } catch (error) {
      setMessage('Error adding donor. Please fill all fields correctly.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Add Donor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded" required />

        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-300 p-2 rounded" required>
          <option value="">Select Gender</option>
          {genders.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>

        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full border border-gray-300 p-2 rounded" required>
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
        </select>

        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded" required pattern="[0-9]{10}" />

        <select value={city} onChange={(e) => {
          setCity(e.target.value);
          setDistrict('');
        }} className="w-full border border-gray-300 p-2 rounded" required>
          <option value="">Select City</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border border-gray-300 p-2 rounded" required>
          <option value="">Select District</option>
          {(districtsByCity[city] || []).map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Add Donor
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}
