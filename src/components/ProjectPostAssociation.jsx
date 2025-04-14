// Project-Post Association Component
import React, { useState, useEffect } from 'react';
import './ProjectPostAssociation.css';

const ProjectPostAssociation = () => {
  // State for selected project
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  
  // State for post search and results
  const [searchParams, setSearchParams] = useState({
    socialMediaPlatform: '',
    username: '',
    startDate: '',
    endDate: '',
    keyword: ''
  });
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // State for selection and association
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [associatedPosts, setAssociatedPosts] = useState([]);
  const [isAssociating, setIsAssociating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Social media platforms
  const [platforms, setPlatforms] = useState([
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Instagram' },
    { id: 3, name: 'Twitter' },
    { id: 4, name: 'LinkedIn' },
    { id: 5, name: 'TikTok' }
  ]);

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);
  
  // Fetch projects from API
  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      // This would be an API call to fetch projects
      // Simulating API response
      setTimeout(() => {
        const mockProjects = [
          { id: 1, name: 'Political Sentiment Analysis', fieldsCount: 3 },
          { id: 2, name: 'Marketing Effectiveness Study', fieldsCount: 5 },
          { id: 3, name: 'Public Health Messaging Research', fieldsCount: 4 },
          { id: 4, name: 'Brand Perception Analysis', fieldsCount: 2 }
        ];
        setProjects(mockProjects);
        setIsLoadingProjects(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setIsLoadingProjects(false);
    }
  };
  
  // Load associated posts when project changes
  useEffect(() => {
    if (selectedProject) {
      fetchAssociatedPosts();
    } else {
      setAssociatedPosts([]);
    }
  }, [selectedProject]);
  
  // Fetch posts already associated with selected project
  const fetchAssociatedPosts = async () => {
    try {
      // This would be an API call to fetch associated posts
      // Simulating API response
      setTimeout(() => {
        const mockAssociatedPosts = [
          { 
            id: 101, 
            content: 'This new policy is going to change everything! #excited',
            platform: 'Twitter',
            username: 'policy_watcher',
            postDate: '2025-03-15T14:30:00',
            isAssociated: true
          },
          { 
            id: 102, 
            content: 'I cannot believe the latest announcements. This is terrible for our community.',
            platform: 'Facebook',
            username: 'community_voice',
            postDate: '2025-03-14T09:15:00',
            isAssociated: true
          }
        ];
        setAssociatedPosts(mockAssociatedPosts);
      }, 600);
    } catch (error) {
      console.error('Error fetching associated posts:', error);
    }
  };
  
  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setSelectedPosts([]);
    setMessage({ text: '', type: '' });
  };
  
  // Handle search parameters change
  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  // Search for posts
  const handleSearch = async () => {
    if (!validateSearch()) return;
    
    setIsSearching(true);
    setMessage({ text: '', type: '' });
    
    try {
      // This would be an API call to search for posts
      // Simulating API response
      setTimeout(() => {
        const mockSearchResults = [
          { 
            id: 101, 
            content: 'This new policy is going to change everything! #excited',
            platform: 'Twitter',
            username: 'policy_watcher',
            postDate: '2025-03-15T14:30:00',
            isAssociated: true
          },
          { 
            id: 102, 
            content: 'I cannot believe the latest announcements. This is terrible for our community.',
            platform: 'Facebook',
            username: 'community_voice',
            postDate: '2025-03-14T09:15:00',
            isAssociated: true
          },
          { 
            id: 103, 
            content: 'Just heard about the new initiative. Seems promising, but I have questions.',
            platform: 'Twitter',
            username: 'skeptical_citizen',
            postDate: '2025-03-16T11:45:00',
            isAssociated: false
          },
          { 
            id: 104, 
            content: 'Looking forward to seeing how this plays out. Could be revolutionary!',
            platform: 'Instagram',
            username: 'future_thinker',
            postDate: '2025-03-15T16:20:00',
            isAssociated: false
          },
          { 
            id: 105, 
            content: 'Another day, another policy change. When will they listen to what we actually need?',
            platform: 'Facebook',
            username: 'frustrated_voter',
            postDate: '2025-03-17T08:30:00',
            isAssociated: false
          }
        ];
        
        setPosts(mockSearchResults);
        
        // Filter out posts already associated with project
        const notAssociated = mockSearchResults.filter(post => !post.isAssociated);
        setFilteredPosts(notAssociated);
        
        setIsSearching(false);
        
        if (notAssociated.length === 0 && mockSearchResults.length > 0) {
          setMessage({ 
            text: 'All found posts are already associated with this project', 
            type: 'info' 
          });
        } else if (mockSearchResults.length === 0) {
          setMessage({ 
            text: 'No posts found matching your criteria', 
            type: 'info' 
          });
        }
      }, 1200);
    } catch (error) {
      console.error('Error searching posts:', error);
      setIsSearching(false);
      setMessage({ 
        text: 'Error searching for posts. Please try again.', 
        type: 'error' 
      });
    }
  };
  
  // Validate search parameters
  const validateSearch = () => {
    // If all search parameters are empty, show error
    if (
      !searchParams.socialMediaPlatform && 
      !searchParams.username && 
      !searchParams.startDate && 
      !searchParams.endDate && 
      !searchParams.keyword
    ) {
      setMessage({ 
        text: 'Please enter at least one search criteria', 
        type: 'error' 
      });
      return false;
    }
    
    // Validate date range if both dates are provided
    if (searchParams.startDate && searchParams.endDate) {
      if (new Date(searchParams.startDate) > new Date(searchParams.endDate)) {
        setMessage({ 
          text: 'End date must be on or after start date', 
          type: 'error' 
        });
        return false;
      }
    }
    
    return true;
  };
  
  // Handle post selection
  const handlePostSelection = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };
  
  // Select all posts
  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      // If all are selected, unselect all
      setSelectedPosts([]);
    } else {
      // Otherwise select all
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };
  
  // Associate selected posts with project
  const handleAssociatePosts = async () => {
    if (!selectedProject) {
      setMessage({ 
        text: 'Please select a project first', 
        type: 'error' 
      });
      return;
    }
    
    if (selectedPosts.length === 0) {
      setMessage({ 
        text: 'No posts selected to associate', 
        type: 'error' 
      });
      return;
    }
    
    setIsAssociating(true);
    setMessage({ text: '', type: '' });
    
    try {
      // This would be an API call to associate posts with project
      // Simulating API response
      setTimeout(() => {
        // Update local state to reflect the association
        const newlyAssociated = filteredPosts.filter(post => selectedPosts.includes(post.id));
        
        // Add them to associated posts
        setAssociatedPosts([...associatedPosts, ...newlyAssociated]);
        
        // Remove them from filtered posts
        setFilteredPosts(filteredPosts.filter(post => !selectedPosts.includes(post.id)));
        
        // Clear selection
        setSelectedPosts([]);
        
        setIsAssociating(false);
        setMessage({ 
          text: `Successfully associated ${newlyAssociated.length} posts with project`, 
          type: 'success' 
        });
      }, 1500);
    } catch (error) {
      console.error('Error associating posts:', error);
      setIsAssociating(false);
      setMessage({ 
        text: 'Error associating posts with project. Please try again.', 
        type: 'error' 
      });
    }
  };
  
  // Remove post from project association
  const handleRemoveAssociation = async (postId) => {
    if (!selectedProject) return;
    
    try {
      // This would be an API call to remove association
      // Simulating API response
      const postToRemove = associatedPosts.find(post => post.id === postId);
      
      // Update local state
      setAssociatedPosts(associatedPosts.filter(post => post.id !== postId));
      
      // Add back to filtered posts if it matches current search criteria
      const matchesSearch = true; // In real app, would check if it matches current search
      if (matchesSearch) {
        setFilteredPosts([...filteredPosts, {...postToRemove, isAssociated: false}]);
      }
      
      setMessage({ 
        text: 'Post removed from project', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Error removing association:', error);
      setMessage({ 
        text: 'Error removing post from project. Please try again.', 
        type: 'error' 
      });
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Truncate text for display
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="project-post-association-container">
      <h2>Associate Posts with Projects</h2>
      
      <div className="project-selection-section">
        <div className="form-group">
          <label htmlFor="projectSelect">Select Project</label>
          <select
            id="projectSelect"
            value={selectedProject}
            onChange={handleProjectChange}
            disabled={isLoadingProjects}
          >
            <option value="">-- Select a Project --</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name} ({project.fieldsCount} fields)
              </option>
            ))}
          </select>
          {isLoadingProjects && <div className="loading-indicator">Loading projects...</div>}
        </div>
      </div>
      
      {selectedProject && (
        <>
          <div className="search-section">
            <h3>Search Posts</h3>
            <div className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="socialMediaPlatform">Platform</label>
                  <select
                    id="socialMediaPlatform"
                    name="socialMediaPlatform"
                    value={searchParams.socialMediaPlatform}
                    onChange={handleSearchParamChange}
                  >
                    <option value="">Any Platform</option>
                    {platforms.map(platform => (
                      <option key={platform.id} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={searchParams.username}
                    onChange={handleSearchParamChange}
                    placeholder="Enter username"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={searchParams.startDate}
                    onChange={handleSearchParamChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={searchParams.endDate}
                    onChange={handleSearchParamChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group keyword-group">
                  <label htmlFor="keyword">Keyword</label>
                  <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    value={searchParams.keyword}
                    onChange={handleSearchParamChange}
                    placeholder="Search in post content"
                  />
                </div>
                
                <div className="form-group search-btn-group">
                  <button 
                    type="button" 
                    className="search-btn"
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching...' : 'Search Posts'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <div className="results-container">
            <div className="search-results">
              <h3>Available Posts {filteredPosts.length > 0 && `(${filteredPosts.length})`}</h3>
              
              {isSearching ? (
                <div className="loading-indicator">Searching for posts...</div>
              ) : filteredPosts.length > 0 ? (
                <>
                  <div className="batch-actions">
                    <button 
                      type="button" 
                      className="select-all-btn"
                      onClick={handleSelectAll}
                    >
                      {selectedPosts.length === filteredPosts.length ? 'Unselect All' : 'Select All'}
                    </button>
                    
                    <button 
                      type="button" 
                      className="associate-btn"
                      onClick={handleAssociatePosts}
                      disabled={isAssociating || selectedPosts.length === 0}
                    >
                      {isAssociating ? 'Associating...' : `Associate Selected (${selectedPosts.length})`}
                    </button>
                  </div>
                  
                  <div className="posts-list">
                    {filteredPosts.map(post => (
                      <div 
                        key={post.id} 
                        className={`post-item ${selectedPosts.includes(post.id) ? 'selected' : ''}`}
                        onClick={() => handlePostSelection(post.id)}
                      >
                        <div className="post-checkbox">
                          <input 
                            type="checkbox" 
                            checked={selectedPosts.includes(post.id)}
                            onChange={() => {}}  // Handled by div click
                          />
                        </div>
                        <div className="post-content">
                          <div className="post-text">{truncateText(post.content)}</div>
                          <div className="post-meta">
                            <span className="platform">{post.platform}</span>
                            <span className="username">@{post.username}</span>
                            <span className="date">{formatDate(post.postDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  {posts.length > 0 
                    ? 'All found posts are already associated with this project.'
                    : 'No posts found. Try different search criteria.'}
                </div>
              )}
            </div>
            
            <div className="associated-posts">
              <h3>Associated Posts {associatedPosts.length > 0 && `(${associatedPosts.length})`}</h3>
              
              {associatedPosts.length > 0 ? (
                <div className="posts-list">
                  {associatedPosts.map(post => (
                    <div key={post.id} className="post-item">
                      <div className="post-content">
                        <div className="post-text">{truncateText(post.content)}</div>
                        <div className="post-meta">
                          <span className="platform">{post.platform}</span>
                          <span className="username">@{post.username}</span>
                          <span className="date">{formatDate(post.postDate)}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => handleRemoveAssociation(post.id)}
                        title="Remove from project"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  No posts associated with this project yet.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectPostAssociation;