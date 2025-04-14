// Post Entry Component using React
import React, { useState, useEffect } from 'react';
import './PostForm.css';

const PostForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    socialMediaPlatform: '',
    username: '',
    content: '',
    postDate: '',
    postTime: '',
    city: '',
    state: '',
    country: '',
    likes: '',
    dislikes: '',
    hasMultimedia: false,
    isRepost: false,
    repostUsername: '',
    repostDate: '',
    repostTime: ''
  });

  // State for available platforms (would be loaded from API in a real implementation)
  const [platforms, setPlatforms] = useState([
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Instagram' },
    { id: 3, name: 'Twitter' },
    { id: 4, name: 'LinkedIn' },
    { id: 5, name: 'TikTok' }
  ]);

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Reset duplicate flag when post content changes
    if (name === 'content' || name === 'socialMediaPlatform' || name === 'username') {
      setIsDuplicate(false);
    }
  };

  // Check if post already exists (to prevent duplicates)
  const checkDuplicatePost = async () => {
    if (formData.content && formData.socialMediaPlatform && formData.username) {
      try {
        // This would be an API call to check if post exists
        // Simulating API response
        const response = Math.random() > 0.8; // 20% chance of duplicate for demo
        setIsDuplicate(response);
        return response;
      } catch (error) {
        console.error('Error checking duplicate post:', error);
        return false;
      }
    }
    return false;
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.socialMediaPlatform) newErrors.socialMediaPlatform = 'Platform is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.content) newErrors.content = 'Post content is required';
    if (!formData.postDate) newErrors.postDate = 'Post date is required';
    if (!formData.postTime) newErrors.postTime = 'Post time is required';

    // Number validation for likes/dislikes
    if (formData.likes && (isNaN(formData.likes) || parseInt(formData.likes) < 0)) {
      newErrors.likes = 'Likes must be a non-negative number';
    }
    if (formData.dislikes && (isNaN(formData.dislikes) || parseInt(formData.dislikes) < 0)) {
      newErrors.dislikes = 'Dislikes must be a non-negative number';
    }

    // Repost validation
    if (formData.isRepost) {
      if (!formData.repostUsername) newErrors.repostUsername = 'Repost username is required';
      if (!formData.repostDate) newErrors.repostDate = 'Repost date is required';
      if (!formData.repostTime) newErrors.repostTime = 'Repost time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ text: '', type: '' });

    // Validate form
    const isFormValid = validateForm();
    
    // Check for duplicate post
    const isDuplicatePost = await checkDuplicatePost();
    
    if (isDuplicatePost) {
      setSubmitMessage({
        text: 'This post already exists in the database.',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    if (isFormValid) {
      try {
        // Prepare data for submission
        const submissionData = {
          ...formData,
          // Convert likes/dislikes to numbers
          likes: formData.likes ? parseInt(formData.likes) : 0,
          dislikes: formData.dislikes ? parseInt(formData.dislikes) : 0,
          // Combine date and time fields
          postDateTime: `${formData.postDate}T${formData.postTime}`,
          repostDateTime: formData.isRepost ? `${formData.repostDate}T${formData.repostTime}` : null
        };

        // This would be an API call to save the post
        console.log('Submitting post data:', submissionData);
        
        // Simulate successful API response
        setTimeout(() => {
          setSubmitMessage({
            text: 'Post saved successfully!',
            type: 'success'
          });
          
          // Reset form after successful submission
          setFormData({
            socialMediaPlatform: '',
            username: '',
            content: '',
            postDate: '',
            postTime: '',
            city: '',
            state: '',
            country: '',
            likes: '',
            dislikes: '',
            hasMultimedia: false,
            isRepost: false,
            repostUsername: '',
            repostDate: '',
            repostTime: ''
          });
          
          setIsSubmitting(false);
        }, 1500);
      } catch (error) {
        console.error('Error saving post:', error);
        setSubmitMessage({
          text: 'Error saving post. Please try again.',
          type: 'error'
        });
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-form-container">
      <h2>Enter Social Media Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-section">
          <h3>Post Source</h3>
          
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
          </div>
        </div>

        <div className="form-section">
          <h3>Post Content</h3>
          
          <div className="form-group">
            <label htmlFor="content">Post Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur={checkDuplicatePost}
              className={errors.content || isDuplicate ? 'error' : ''}
              rows={6}
            />
            {errors.content && (
              <div className="error-message">{errors.content}</div>
            )}
            {isDuplicate && (
              <div className="error-message">This post already exists in the database.</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postDate">Post Date *</label>
              <input
                type="date"
                id="postDate"
                name="postDate"
                value={formData.postDate}
                onChange={handleChange}
                className={errors.postDate ? 'error' : ''}
              />
              {errors.postDate && (
                <div className="error-message">{errors.postDate}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="postTime">Post Time *</label>
              <input
                type="time"
                id="postTime"
                name="postTime"
                value={formData.postTime}
                onChange={handleChange}
                className={errors.postTime ? 'error' : ''}
              />
              {errors.postTime && (
                <div className="error-message">{errors.postTime}</div>
              )}
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasMultimedia"
                  checked={formData.hasMultimedia}
                  onChange={handleChange}
                />
                Contains multimedia (video, audio)
              </label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Optional Information</h3>
          
          <div className="form-subsection">
            <h4>Location</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form-subsection">
            <h4>Engagement</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="likes">Likes</label>
                <input
                  type="number"
                  id="likes"
                  name="likes"
                  value={formData.likes}
                  onChange={handleChange}
                  min="0"
                  className={errors.likes ? 'error' : ''}
                />
                {errors.likes && (
                  <div className="error-message">{errors.likes}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="dislikes">Dislikes</label>
                <input
                  type="number"
                  id="dislikes"
                  name="dislikes"
                  value={formData.dislikes}
                  onChange={handleChange}
                  min="0"
                  className={errors.dislikes ? 'error' : ''}
                />
                {errors.dislikes && (
                  <div className="error-message">{errors.dislikes}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isRepost"
                checked={formData.isRepost}
                onChange={handleChange}
              />
              This is a repost
            </label>
          </div>

          {formData.isRepost && (
            <div className="repost-info">
              <h4>Repost Information</h4>
              
              <div className="form-group">
                <label htmlFor="repostUsername">Reposted by (Username) *</label>
                <input
                  type="text"
                  id="repostUsername"
                  name="repostUsername"
                  value={formData.repostUsername}
                  onChange={handleChange}
                  className={errors.repostUsername ? 'error' : ''}
                  maxLength={40}
                />
                {errors.repostUsername && (
                  <div className="error-message">{errors.repostUsername}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="repostDate">Repost Date *</label>
                  <input
                    type="date"
                    id="repostDate"
                    name="repostDate"
                    value={formData.repostDate}
                    onChange={handleChange}
                    className={errors.repostDate ? 'error' : ''}
                  />
                  {errors.repostDate && (
                    <div className="error-message">{errors.repostDate}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="repostTime">Repost Time *</label>
                  <input
                    type="time"
                    id="repostTime"
                    name="repostTime"
                    value={formData.repostTime}
                    onChange={handleChange}
                    className={errors.repostTime ? 'error' : ''}
                  />
                  {errors.repostTime && (
                    <div className="error-message">{errors.repostTime}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting || isDuplicate}>
            {isSubmitting ? 'Saving Post...' : 'Save Post'}
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

export default PostForm;