import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import HouseStructure from './housestructure'; // Adjust the path as needed
import MapComponent from './MapComponent'; // Import the map component

const App = () => {
  const [location, setLocation] = useState({});
  const [pricePrediction, setPricePrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    bathrooms: '',
    parking: '',
    stories: '',
    airconditioning_yes: false,
    bedrooms: '',
    furnishingstatus: 'unfurnished',
    prefarea_yes: false,
    basement_yes: false,
    hotwaterheating_yes: false,
    guestroom_yes: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]); // State to hold search results

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/predict', { ...formData, location });
      setPricePrediction(response.data.price);
    } catch (error) {
      console.error('Error predicting price:', error);
      setPricePrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (location.lat && location.lng) {
      try {
        const response = await axios.get(`http://localhost:5000/api/nearby`, {
          params: {
            lat: location.lat,
            lng: location.lng,
            term: searchTerm,
          },
        });
        console.log('Nearby locations:', response.data);
        setLocations(response.data); // Update locations state with search results
      } catch (error) {
        console.error('Error fetching nearby locations:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>House Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleInputChange} required />
        <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleInputChange} required />
        <input type="number" name="parking" placeholder="Parking" onChange={handleInputChange} required />
        <input type="number" name="stories" placeholder="Stories" onChange={handleInputChange} required />
        <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleInputChange} required />

        <label>
          Air Conditioning:
          <input type="checkbox" name="airconditioning_yes" onChange={handleInputChange} />
        </label>
        <label>
          Preferred Area:
          <input type="checkbox" name="prefarea_yes" onChange={handleInputChange} />
        </label>
        <label>
          Basement:
          <input type="checkbox" name="basement_yes" onChange={handleInputChange} />
        </label>
        <label>
          Hot Water Heating:
          <input type="checkbox" name="hotwaterheating_yes" onChange={handleInputChange} />
        </label>
        <label>
          Guestroom:
          <input type="checkbox" name="guestroom_yes" onChange={handleInputChange} />
        </label>

        <select name="furnishingstatus" onChange={handleInputChange}>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi-furnished">Semi-furnished</option>
          <option value="furnished">Furnished</option>
        </select>

        <button type="submit" disabled={loading}>Predict Price</button>
      </form>

      {loading && <p>Loading...</p>}
      {pricePrediction && <h2>Predicted Price: {pricePrediction}</h2>}

      <HouseStructure 
        area={parseFloat(formData.area) || 0} 
        bedrooms={parseInt(formData.bedrooms) || 0} 
        bathrooms={parseInt(formData.bathrooms) || 0} 
        stories={parseInt(formData.stories) || 0} 
      />

      <input
        type="text"
        placeholder="Search for nearby locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Render the MapComponent with search results */}
      <MapComponent locations={locations} />
    </div>
  );
};

export default App;
