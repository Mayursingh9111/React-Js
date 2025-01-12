import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file

// Utility function to calculate age from DOB
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const DirectoryApp = () => {
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'retrieve'
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', dob: '', aadhar: '', mobile: '', age: '' });
  const [searchAadhar, setSearchAadhar] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  // Load persons from localStorage on component mount
  useEffect(() => {
    const storedPersons = JSON.parse(localStorage.getItem('persons')) || [];
    setPersons(storedPersons);
  }, []);

  // Handle input changes for adding a new person
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the newPerson state
    setNewPerson((prev) => {
      const updatedPerson = { ...prev, [name]: value };

      // Automatically calculate age if DOB is changed
      if (name === 'dob' && value) {
        updatedPerson.age = calculateAge(value);
      }

      return updatedPerson;
    });
  };

  // Save a new person to localStorage
  const savePerson = () => {
    // Validation checks
    const { name, dob, aadhar, mobile } = newPerson;
    if (!name || !dob || !aadhar || !mobile) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{12}$/.test(aadhar)) {
      setError('Aadhar Number must be exactly 12 digits.');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile Number must be exactly 10 digits.');
      return;
    }

    // Check for duplicate Aadhar Number
    const duplicate = persons.find((person) => person.aadhar === aadhar);
    if (duplicate) {
      setError('A person with this Aadhar Number already exists.');
      return;
    }

    // Add the new person
    const updatedPersons = [...persons, newPerson];
    setPersons(updatedPersons);
    localStorage.setItem('persons', JSON.stringify(updatedPersons));

    // Reset the form
    setNewPerson({ name: '', dob: '', aadhar: '', mobile: '', age: '' });
    setError('');
    alert('Person added successfully!');
  };

  // Delete a person from localStorage
  const deletePerson = (aadharToDelete) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      const updatedPersons = persons.filter((person) => person.aadhar !== aadharToDelete);
      setPersons(updatedPersons);
      localStorage.setItem('persons', JSON.stringify(updatedPersons));
      alert('Person deleted successfully!');
    }
  };

  // Retrieve person information based on Aadhar Number
  const retrievePerson = () => {
    if (!/^\d{12}$/.test(searchAadhar)) {
      setSearchResult('Please enter a valid 12-digit Aadhar Number.');
      return;
    }

    const person = persons.find((p) => p.aadhar === searchAadhar);
    setSearchResult(person || 'No match found.');
  };

  return (
    <div className="directory-app">
      <h1>📇 Directory App</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add New Person
        </button>
        <button
          className={`tab-button ${activeTab === 'retrieve' ? 'active' : ''}`}
          onClick={() => setActiveTab('retrieve')}
        >
          🔍 Retrieve Information
        </button>
      </div>

      {/* Add New Person Tab */}
      {activeTab === 'add' && (
        <div className="tab-content add-person">
          <h2>Add New Person</h2>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Input Form */}
          <div className="form-container">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newPerson.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={newPerson.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Aadhar Number:</label>
              <input
                type="text"
                name="aadhar"
                value={newPerson.aadhar}
                onChange={handleInputChange}
                placeholder="12-digit Aadhar Number"
                maxLength="12"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobile"
                value={newPerson.mobile}
                onChange={handleInputChange}
                placeholder="10-digit Mobile Number"
                maxLength="10"
              />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={newPerson.age}
                readOnly
                placeholder="Auto-calculated age"
              />
            </div>

            <button className="save-button" onClick={savePerson}>
              💾 Save Person
            </button>
          </div>

          {/* Existing Persons Table */}
          <h3>Existing Persons</h3>
          {persons.length > 0 ? (
            <table className="persons-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Aadhar Number</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {persons.map((person, index) => (
                  <tr key={index}>
                    <td>{person.name}</td>
                    <td>{person.dob}</td>
                    <td>{person.aadhar}</td>
                    <td>{person.mobile}</td>
                    <td>{person.age}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deletePerson(person.aadhar)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No persons added yet.</p>
          )}
        </div>
      )}

      {/* Retrieve Information Tab */}
      {activeTab === 'retrieve' && (
        <div className="tab-content retrieve-information">
          <h2>Retrieve Information</h2>

          {/* Search Form */}
          <div className="search-container">
            <input
              type="text"
              value={searchAadhar}
              onChange={(e) => setSearchAadhar(e.target.value)}
              placeholder="Enter 12-digit Aadhar Number"
              maxLength="12"
            />
            <button className="retrieve-button" onClick={retrievePerson}>
              🔍 Retrieve
            </button>
          </div>

          {/* Search Result */}
          <div className="search-result">
            {searchResult && (
              typeof searchResult === 'object' ? (
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Aadhar Number</th>
                      <th>Mobile Number</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{searchResult.name}</td>
                      <td>{searchResult.dob}</td>
                      <td>{searchResult.aadhar}</td>
                      <td>{searchResult.mobile}</td>
                      <td>{searchResult.age}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="no-match">{searchResult}</p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryApp;
