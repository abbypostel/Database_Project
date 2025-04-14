// User/Poster Information Form Component
import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    socialMediaPlatform: '',
    username: '',
    firstName: '',
    lastName: '',
    countryOfBirth: '',
    countryOfResidence: '',
    age: '',
    gender: '',
    isVerified: false
  });

  // State for available platforms (would be loaded from API in a real implementation)
  const [platforms, setPlatforms] = useState([
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Instagram' },
    { id: 3, name: 'Twitter' },
    { id: 4, name: 'LinkedIn' },
    { id: 5, name: 'TikTok' }
  ]);

  // State for commonly used countries
  const [countries, setCountries] = useState([
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'India', 'Japan', 'China', 'Brazil', 'Mexico', 'South Africa',
    'Spain', 'Italy', 'Netherlands', 'Russia', 'South Korea', 'Singapore',
    'Other'
  ]);

  // State for checking if user exists
  const [userExists, setUserExists] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const [mode, setMode] = useState('create'); // 'create' or 'update'

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Search for existing user
  const searchUser = async () => {
    if (!formData.socialMediaPlatform || !formData.username) {
      setErrors({
        ...errors,
        username: !formData.username ? 'Username is required for search' : '',
        socialMediaPlatform: !formData.socialMediaPlatform ? 'Platform is required for search' : ''
      });
      return;
    }

    setIsSearching(true);
    try {
      // This would be an API call to search for a user
      // Simulate API response
      setTimeout(() => {
        // Random chance of finding user for demo purposes
        const userFound = Math.random() > 0.7;
        
        if (userFound) {
          // Simulated user data from database
          const foundUser = {
            socialMediaPlatform: formData.socialMediaPlatform,
            username: formData.username,
            firstName: 'John',
            lastName: 'Doe',
            countryOfBirth: 'United States',
            countryOfResidence: 'Canada',
            age: '32',
            gender: 'Male',
            isVerified: true
          };
          
          setExistingUser(foundUser);
          setUserExists(true);
          setMode('update');
          
          // Update form with existing data
          setFormData(foundUser);
        } else {
          setUserExists(false);
          setExistingUser(null);
          setMode('create');
        }
        
        setIsSearching(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching for user:', error);
      setIsSearching(false);
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.socialMediaPlatform) newErrors.socialMediaPlatform = 'Platform is required';
    if (!formData.username) newErrors.username = 'Username is required';
    
    // Username length validation
    if (formData.username && formData.username.length > 40) {
      newErrors.username = 'Username must be 40 characters or less';
    }

    // Age validation (if provided)
    if (formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age between 0 and 120';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      socialMediaPlatform: '',
      username: '',
      firstName: '',
      lastName: '',
      countryOfBirth: '',
      countryOfResidence: '',
      age: '',
      gender: '',
      isVerified: false
    });
    setUserExists(false);
    setExistingUser(null);
    setMode('create');
    setErrors({});
    setSubmitMessage({ text: '', type: '' });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ text: '', type: '' });

    // Validate form
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        // This would be an API call to save or update the user
        const endpoint = mode === 'create' ? '/api/users' : `/api/users/${formData.username}`;
        const method = mode === 'create' ? 'POST' : 'PUT';
        
        console.log(`${method} request to ${endpoint} with data:`, formData);
        
        // Simulate successful API response
        setTimeout(() => {
          setSubmitMessage({
            text: mode === 'create' ? 'User created successfully!' : 'User updated successfully!',
            type: 'success'
          });
          
          if (mode === 'create') {
            // Reset form after creating new user
            resetForm();
          } else {
            // Keep data but update mode
            setMode('update');
            setUserExists(true);
          }
          
          setIsSubmitting(false);
        }, 1500);
      } catch (error) {
        console.error('Error saving user:', error);
        setSubmitMessage({
          text: 'Error saving user information. Please try again.',
          type: 'error'
        });
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>{mode === 'create' ? 'Add New User' : 'Update User Information'}</h2>
      
      <div className="user-search-section">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="socialMediaPlatform">Social Media Platform *</label>
            <select
              id="socialMediaPlatform"
              name="socialMediaPlatform"
              value={formData.socialMediaPlatform}
              onChange={handleChange}
              className={errors.socialMediaPlatform ? 'error' : ''}
            >
              <option value="">Select Platform</option>
              {platforms.map(platform => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
            {errors.socialMediaPlatform && (
              <div className="error-message">{errors.socialMediaPlatform}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              maxLength={40}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group search-btn-group">
            <button 
              type="button" 
              className="search-btn"
              onClick={searchUser}
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search User'}
            </button>
            <button 
              type="button" 
              className="reset-btn"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </div>
        
        {userExists && (
          <div className="user-found-message">
            User found! You can update their information below.
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="countryOfBirth">Country of Birth</label>
              <select
                id="countryOfBirth"
                name="countryOfBirth"
                value={formData.countryOfBirth}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="countryOfResidence">Country of Residence</label>
              <select
                id="countryOfResidence"
                name="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="120"
                className={errors.age ? 'error' : ''}
              />
              {errors.age && (
                <div className="error-message">{errors.age}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleChange}
              />
              Verified User
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (mode === 'create' ? 'Create User' : 'Update User')}
          </button>
        </div>

        {submitMessage.text && (
          <div className={`submit-message ${submitMessage.type}`}>
            {submitMessage.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;