// Analysis Results Entry Component
import React, { useState, useEffect } from 'react';
import './AnalysisResultsEntry.css';

const AnalysisResultsEntry = () => {
  // State for selected project
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectFields, setProjectFields] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isLoadingFields, setIsLoadingFields] = useState(false);
  
  // State for posts
  const [projectPosts, setProjectPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  
  // State for results
  const [resultValues, setResultValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // State for batch operation
  const [batchMode, setBatchMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [batchValues, setBatchValues] = useState({});
  const [batchFields, setBatchFields] = useState([]);
  
  // Progress tracking
  const [projectStats, setProjectStats] = useState({
    totalPosts: 0,
    completedPosts: 0,
    fieldCompletionRates: {}
  });

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
          { id: 1, name: 'Political Sentiment Analysis' },
          { id: 2, name: 'Marketing Effectiveness Study' },
          { id: 3, name: 'Public Health Messaging Research' },
          { id: 4, name: 'Brand Perception Analysis' }
        ];
        setProjects(mockProjects);
        setIsLoadingProjects(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setIsLoadingProjects(false);
    }
  };
  
  // Load project fields and posts when project changes
  useEffect(() => {
    if (selectedProject) {
      fetchProjectFields();
      fetchProjectPosts();
      fetchProjectStats();
      
      // Reset states when project changes
      setSelectedPost('');
      setResultValues({});
      setBatchMode(false);
      setSelectedPosts([]);
      setBatchValues({});
      setBatchFields([]);
      setMessage({ text: '', type: '' });
    } else {
      setProjectFields([]);
      setProjectPosts([]);
      setProjectStats({
        totalPosts: 0,
        completedPosts: 0,
        fieldCompletionRates: {}
      });
    }
  }, [selectedProject]);
  
  // Load post results when post is selected
  useEffect(() => {
    if (selectedPost) {
      fetchPostResults();
      setBatchMode(false);
    } else {
      setResultValues({});
    }
  }, [selectedPost]);
  
  // Fetch project fields from API
  const fetchProjectFields = async () => {
    setIsLoadingFields(true);
    try {
      // This would be an API call to fetch project fields
      // Simulating API response
      setTimeout(() => {
        let mockFields = [];
        
        // Different fields based on project ID
        switch(selectedProject) {
          case '1': // Political Sentiment Analysis
            mockFields = [
              { id: 1, name: 'politicalLeaning', label: 'Political Leaning', type: 'enum', options: ['left', 'center', 'right'] },
              { id: 2, name: 'sentiment', label: 'Overall Sentiment', type: 'enum', options: ['positive', 'neutral', 'negative'] },
              { id: 3, name: 'confidenceScore', label: 'Confidence Score', type: 'number' }
            ];
            break;
          case '2': // Marketing Effectiveness
            mockFields = [
              { id: 4, name: 'brandMention', label: 'Brand Mention', type: 'boolean' },
              { id: 5, name: 'productAttitude', label: 'Product Attitude', type: 'enum', options: ['positive', 'neutral', 'negative'] },
              { id: 6, name: 'purchaseIntent', label: 'Purchase Intent', type: 'enum', options: ['high', 'medium', 'low', 'none'] },
              { id: 7, name: 'demographicTarget', label: 'Demographic Target Match', type: 'boolean' },
              { id: 8, name: 'campaignReference', label: 'Campaign Reference', type: 'text' }
            ];
            break;
          case '3': // Public Health
            mockFields = [
              { id: 9, name: 'healthConcern', label: 'Health Concern', type: 'enum', options: ['high', 'medium', 'low'] },
              { id: 10, name: 'informationAccuracy', label: 'Information Accuracy', type: 'enum', options: ['accurate', 'partially accurate', 'inaccurate'] },
              { id: 11, name: 'sourceCredibility', label: 'Source Credibility', type: 'enum', options: ['credible', 'somewhat credible', 'not credible'] },
              { id: 12, name: 'actionableAdvice', label: 'Contains Actionable Advice', type: 'boolean' }
            ];
            break;
          case '4': // Brand Perception
            mockFields = [
              { id: 13, name: 'brandSentiment', label: 'Brand Sentiment', type: 'enum', options: ['positive', 'neutral', 'negative'] },
              { id: 14, name: 'competitorMention', label: 'Competitor Mention', type: 'boolean' }
            ];
            break;
          default:
            mockFields = [];
        }
        
        setProjectFields(mockFields);
        setIsLoadingFields(false);
      }, 600);
    } catch (error) {
      console.error('Error fetching project fields:', error);
      setIsLoadingFields(false);
    }
  };
  
  // Fetch project posts from API
  const fetchProjectPosts = async () => {
    setIsLoadingPosts(true);
    try {
      // This would be an API call to fetch posts associated with the project
      // Simulating API response
      setTimeout(() => {
        const mockPosts = [
          { 
            id: 101, 
            content: 'This new policy is going to change everything! #excited',
            platform: 'Twitter',
            username: 'policy_watcher',
            postDate: '2025-03-15T14:30:00',
            hasResults: true
          },
          { 
            id: 102, 
            content: 'I cannot believe the latest announcements. This is terrible for our community.',
            platform: 'Facebook',
            username: 'community_voice',
            postDate: '2025-03-14T09:15:00',
            hasResults: true
          },
          { 
            id: 103, 
            content: 'Just heard about the new initiative. Seems promising, but I have questions.',
            platform: 'Twitter',
            username: 'skeptical_citizen',
            postDate: '2025-03-16T11:45:00',
            hasResults: false
          },
          { 
            id: 104, 
            content: 'Looking forward to seeing how this plays out. Could be revolutionary!',
            platform: 'Instagram',
            username: 'future_thinker',
            postDate: '2025-03-15T16:20:00',
            hasResults: false
          },
          { 
            id: 105, 
            content: 'Another day, another policy change. When will they listen to what we actually need?',
            platform: 'Facebook',
            username: 'frustrated_voter',
            postDate: '2025-03-17T08:30:00',
            hasResults: false
          }
        ];
        
        setProjectPosts(mockPosts);
        setIsLoadingPosts(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching project posts:', error);
      setIsLoadingPosts(false);
    }
  };
  
  // Fetch project stats from API
  const fetchProjectStats = async () => {
    try {
      // This would be an API call to fetch project statistics
      // Simulating API response
      setTimeout(() => {
        const mockStats = {
          totalPosts: 5,
          completedPosts: 2,
          fieldCompletionRates: {
            // Different completion rates based on project
            ...(selectedProject === '1' ? {
              'politicalLeaning': 40,
              'sentiment': 40,
              'confidenceScore': 20
            } : {}),
            ...(selectedProject === '2' ? {
              'brandMention': 30,
              'productAttitude': 30,
              'purchaseIntent': 20,
              'demographicTarget': 10,
              'campaignReference': 10
            } : {}),
            ...(selectedProject === '3' ? {
              'healthConcern': 25,
              'informationAccuracy': 25,
              'sourceCredibility': 25,
              'actionableAdvice': 15
            } : {}),
            ...(selectedProject === '4' ? {
              'brandSentiment': 40,
              'competitorMention': 20
            } : {})
          }
        };
        
        setProjectStats(mockStats);
      }, 1000);
    } catch (error) {
      console.error('Error fetching project stats:', error);
    }
  };
  
  // Fetch post analysis results from API
  const fetchPostResults = async () => {
    if (!selectedPost) return;
    
    try {
      // This would be an API call to fetch results for a specific post
      // Simulating API response
      setTimeout(() => {
        let mockResults = {};
        
        // Only return results for posts that have them
        const post = projectPosts.find(p => p.id.toString() === selectedPost);
        
        if (post && post.hasResults) {
          // Different results based on project
          switch(selectedProject) {
            case '1': // Political Sentiment Analysis
              mockResults = {
                politicalLeaning: 'center',
                sentiment: 'positive',
                confidenceScore: '85'
              };
              break;
            case '2': // Marketing Effectiveness
              mockResults = {
                brandMention: 'true',
                productAttitude: 'positive',
                purchaseIntent: 'medium',
                demographicTarget: 'true',
                campaignReference: 'Spring Campaign 2025'
              };
              break;
            case '3': // Public Health
              mockResults = {
                healthConcern: 'medium',
                informationAccuracy: 'partially accurate',
                sourceCredibility: 'somewhat credible',
                actionableAdvice: 'true'
              };
              break;
            case '4': // Brand Perception
              mockResults = {
                brandSentiment: 'positive',
                competitorMention: 'false'
              };
              break;
            default:
              mockResults = {};
          }
        }
        
        setResultValues(mockResults);
      }, 500);
    } catch (error) {
      console.error('Error fetching post results:', error);
    }
  };
  
  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };
  
  // Handle post selection change
  const handlePostChange = (e) => {
    setSelectedPost(e.target.value);
  };
  
  // Handle result value change
  const handleResultChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResultValues({
      ...resultValues,
      [name]: type === 'checkbox' ? checked.toString() : value
    });
  };
  
  // Submit results for a single post
  const handleSubmitResults = async (e) => {
    e.preventDefault();
    
    if (!selectedProject || !selectedPost) {
      setMessage({ 
        text: 'Please select both a project and a post', 
        type: 'error' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      // This would be an API call to save results
      // Simulating API response
      setTimeout(() => {
        console.log('Submitting results:', resultValues);
        
        // Update local state to show post has results
        const updatedPosts = projectPosts.map(post => {
          if (post.id.toString() === selectedPost) {
            return { ...post, hasResults: true };
          }
          return post;
        });
        setProjectPosts(updatedPosts);
        
        // Update project stats
        const updatedStats = {
          ...projectStats,
          completedPosts: projectStats.completedPosts + (!projectPosts.find(p => p.id.toString() === selectedPost).hasResults ? 1 : 0)
        };
        setProjectStats(updatedStats);
        
        setIsSubmitting(false);
        setMessage({ 
          text: 'Results saved successfully', 
          type: 'success' 
        });
      }, 1000);
    } catch (error) {
      console.error('Error saving results:', error);
      setIsSubmitting(false);
      setMessage({ 
        text: 'Error saving results. Please try again.', 
        type: 'error' 
      });
    }
  };
  
  // Toggle batch mode
  const handleToggleBatchMode = () => {
    setBatchMode(!batchMode);
    if (!batchMode) {
      // Entering batch mode
      setSelectedPost('');
      setSelectedPosts([]);
      setBatchValues({});
      setBatchFields([]);
    }
  };
  
  // Handle batch field selection
  const handleBatchFieldToggle = (fieldId) => {
    if (batchFields.includes(fieldId)) {
      setBatchFields(batchFields.filter(id => id !== fieldId));
      
      // Remove values for unselected field
      const field = projectFields.find(f => f.id === fieldId);
      if (field) {
        const { [field.name]: removedValue, ...rest } = batchValues;
        setBatchValues(rest);
      }
    } else {
      setBatchFields([...batchFields, fieldId]);
    }
  };
  
  // Handle batch value change
  const handleBatchValueChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBatchValues({
      ...batchValues,
      [name]: type === 'checkbox' ? checked.toString() : value
    });
  };
  
  // Handle post selection for batch operation
  const handlePostSelection = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };
  
  // Submit batch results
  const handleSubmitBatchResults = async () => {
    if (!selectedProject || selectedPosts.length === 0 || Object.keys(batchValues).length === 0) {
      setMessage({ 
        text: 'Please select a project, at least one post, and at least one field value', 
        type: 'error' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      // This would be an API call to save batch results
      // Simulating API response
      setTimeout(() => {
        console.log('Submitting batch results for posts:', selectedPosts);
        console.log('Batch values:', batchValues);
        
        // Update local state to show posts have results
        const updatedPosts = projectPosts.map(post => {
          if (selectedPosts.includes(post.id.toString())) {
            return { ...post, hasResults: true };
          }
          return post;
        });
        setProjectPosts(updatedPosts);
        
        // Calculate how many posts were previously without results
        const newlyCompleted = selectedPosts.filter(id => {
          const post = projectPosts.find(p => p.id.toString() === id);
          return post && !post.hasResults;
        }).length;
        
        // Update project stats
        const updatedStats = {
          ...projectStats,
          completedPosts: projectStats.completedPosts + newlyCompleted
        };
        setProjectStats(updatedStats);
        
        // Reset batch selections
        setSelectedPosts([]);
        setBatchValues({});
        
        setIsSubmitting(false);
        setMessage({ 
          text: `Batch results saved successfully for ${selectedPosts.length} posts`, 
          type: 'success' 
        });
      }, 1500);
    } catch (error) {
      console.error('Error saving batch results:', error);
      setIsSubmitting(false);
      setMessage({ 
        text: 'Error saving batch results. Please try again.', 
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
  
  // Render form field based on field type
  const renderField = (field, value, handleChange) => {
    switch(field.type) {
      case 'enum':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
          >
            <option value="">-- Select {field.label} --</option>
            {field.options.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      
      case 'boolean':
        return (
          <div className="checkbox-field">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={value === 'true'}
              onChange={handleChange}
            />
            <label htmlFor={field.name} className="checkbox-label">
              {field.label}
            </label>
          </div>
        );
      
      case 'number':
        return (
          <input
            type="number"
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
          />
        );
      
      case 'text':
      default:
        return (
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
          />
        );
    }
    }
  };