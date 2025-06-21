'use client';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const searchRef = useRef(null);
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = ['Hyderabad', 'Bangalore', 'Chennai'];
  const districtsByCity = {
    Hyderabad: ['Ranga Reddy', 'Medchal', 'Hyderabad'],
    Bangalore: ['Bangalore Urban', 'Bangalore Rural'],
    Chennai: ['Chennai Central', 'Chennai South'],
  };

  const handleSearch = async () => {
    setSearched(false);
    try {
      const res = await axios.get('http://localhost:5000/api/donors', {
        params: { bloodGroup, city, district },
      });
      setDonors(res.data);
    } catch (error) {
      console.error('Search error:', error);
      setDonors([]);
    }
    setSearched(true);
  };

  const scrollToSearch = () => {
    setShowSearch(true);
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/donation.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-5xl font-bold mb-6 text-center">Donate Blood, Save Lives</h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Your blood can give someone another chance at life. Become a hero by becoming a donor today.
          </p>
          <button
            onClick={scrollToSearch}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold text-lg shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {showSearch && (
        <section ref={searchRef} className="bg-white shadow-lg rounded-xl p-8 mt-[-50px] z-10 relative max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Find a Blood Donor</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="border-2 border-red-300 rounded-md p-3">
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>

            <select value={city} onChange={e => {
              setCity(e.target.value);
              setDistrict('');
            }} className="border-2 border-red-300 rounded-md p-3">
              <option value="">Select City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={district} onChange={e => setDistrict(e.target.value)} className="border-2 border-red-300 rounded-md p-3">
              <option value="">Select District</option>
              {(districtsByCity[city] || []).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button onClick={handleSearch} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium">Search</button>
          </div>

          {searched && (
            <div className="mt-10">
              {donors.length > 0 ? (
                <div className="overflow-x-auto">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Matching Donors</h3>
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-red-600 text-white">
                      <tr>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Gender</th>
                        <th className="py-3 px-6 text-left">Blood Group</th>
                        <th className="py-3 px-6 text-left">Phone</th>
                        <th className="py-3 px-6 text-left">City</th>
                        <th className="py-3 px-6 text-left">District</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.map((donor, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-100">
                          <td className="py-3 px-6">{donor.name}</td>
                          <td className="py-3 px-6">{donor.gender}</td>
                          <td className="py-3 px-6">{donor.bloodGroup}</td>
                          <td className="py-3 px-6">{donor.phone}</td>
                          <td className="py-3 px-6">{donor.city}</td>
                          <td className="py-3 px-6">{donor.district}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-red-600 text-xl font-medium p-6 border rounded bg-red-50">
                  Oops! No matching donors found.
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}

