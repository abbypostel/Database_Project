import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Active page state
  const [activePage, setActivePage] = useState('home');

  // Counter State (kept from original)
  const [count, setCount] = useState(0);

  // Form States (kept from original)
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  // Project form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    manager: '',
    institute: '',
    startDate: '',
    endDate: '',
    analysisFields: []
  });

  // Post form states
  const [postForm, setPostForm] = useState({
    content: '',
    platform: '',
    username: '',
    time: '',
    location: '',
    likes: 0,
    dislikes: 0
  });

  // User form states
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    countryBirth: '',
    countryResidence: '',
    age: '',
    gender: '',
    verified: false
  });

  // Query states
  const [queryParams, setQueryParams] = useState({
    platform: '',
    startDate: '',
    endDate: '',
    username: ''
  });

  // Function to handle page navigation
  const navigateTo = (page) => {
    setActivePage(page);
  };

  // Render active page content
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="jumbotron p-5 bg-light w-100">
            <h2 className="display-3 text-center">Welcome to the Database Project</h2>
            <p className="lead fs-3 text-center">Use the navigation above to access data entry and query features</p>
            <hr className="my-4" />
            <p className="fs-4 text-center">This application provides tools for managing social media research projects</p>
          </div>
        );
      
      case 'projectEntry':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Project Information Entry</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="projectName" className="form-label fs-4">Project Name</label>
                  <input type="text" className="form-control form-control-lg" id="projectName" placeholder="Enter project name" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="managerDetails" className="form-label fs-4">Manager Details</label>
                  <input type="text" className="form-control form-control-lg" id="managerDetails" placeholder="Enter manager details" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="instituteName" className="form-label fs-4">Institute Name</label>
                  <input type="text" className="form-control form-control-lg" id="instituteName" placeholder="Enter institute name" />
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="startDate" className="form-label fs-4">Start Date</label>
                    <input type="date" className="form-control form-control-lg" id="startDate" />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate" className="form-label fs-4">End Date</label>
                    <input type="date" className="form-control form-control-lg" id="endDate" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="analysisFields" className="form-label fs-4">Analysis Fields</label>
                  <textarea className="form-control form-control-lg" id="analysisFields" rows="3" placeholder="Enter analysis fields, one per line"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Submit Project</button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'postEntry':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Post Entry System</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="postContent" className="form-label fs-4">Post Content</label>
                  <textarea className="form-control form-control-lg" id="postContent" rows="3" placeholder="Enter post content"></textarea>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="sourcePlatform" className="form-label fs-4">Source Platform</label>
                  <select className="form-control form-control-lg" id="sourcePlatform">
                    <option>Twitter</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Reddit</option>
                    <option>LinkedIn</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="username" className="form-label fs-4">Username</label>
                  <input type="text" className="form-control form-control-lg" id="username" placeholder="Enter username" />
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="postTime" className="form-label fs-4">Post Time</label>
                    <input type="datetime-local" className="form-control form-control-lg" id="postTime" />
                  </div>
                  <div className="col">
                    <label htmlFor="postLocation" className="form-label fs-4">Location</label>
                    <input type="text" className="form-control form-control-lg" id="postLocation" placeholder="Enter location" />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="likes" className="form-label fs-4">Likes</label>
                    <input type="number" className="form-control form-control-lg" id="likes" min="0" />
                  </div>
                  <div className="col">
                    <label htmlFor="dislikes" className="form-label fs-4">Dislikes</label>
                    <input type="number" className="form-control form-control-lg" id="dislikes" min="0" />
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input type="checkbox" className="form-check-input" id="checkDuplicate" />
                  <label className="form-check-label fs-4" htmlFor="checkDuplicate">Check for duplicates</label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Submit Post</button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'userEntry':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">User Information Form</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="firstName" className="form-label fs-4">First Name</label>
                    <input type="text" className="form-control form-control-lg" id="firstName" placeholder="First name" />
                  </div>
                  <div className="col">
                    <label htmlFor="lastName" className="form-label fs-4">Last Name</label>
                    <input type="text" className="form-control form-control-lg" id="lastName" placeholder="Last name" />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="countryBirth" className="form-label fs-4">Country of Birth</label>
                    <input type="text" className="form-control form-control-lg" id="countryBirth" placeholder="Country of birth" />
                  </div>
                  <div className="col">
                    <label htmlFor="countryResidence" className="form-label fs-4">Country of Residence</label>
                    <input type="text" className="form-control form-control-lg" id="countryResidence" placeholder="Country of residence" />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="age" className="form-label fs-4">Age</label>
                    <input type="number" className="form-control form-control-lg" id="age" min="0" />
                  </div>
                  <div className="col">
                    <label htmlFor="gender" className="form-label fs-4">Gender</label>
                    <select className="form-control form-control-lg" id="gender">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input type="checkbox" className="form-check-input" id="verifiedStatus" />
                  <label className="form-check-label fs-4" htmlFor="verifiedStatus">Verified</label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Submit User</button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'projectPostAssociation':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Project-Post Association</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="projectSelect" className="form-label fs-4">Select Project</label>
                  <select className="form-control form-control-lg" id="projectSelect">
                    <option>Project 1</option>
                    <option>Project 2</option>
                    <option>Project 3</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="form-label fs-4">Select Posts to Associate</label>
                  <div className="list-group fs-4">
                    <div className="list-group-item p-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="post1" />
                        <label className="form-check-label" htmlFor="post1">
                          Post 1 - Twitter - @user1
                        </label>
                      </div>
                    </div>
                    <div className="list-group-item p-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="post2" />
                        <label className="form-check-label" htmlFor="post2">
                          Post 2 - Facebook - @user2
                        </label>
                      </div>
                    </div>
                    <div className="list-group-item p-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="post3" />
                        <label className="form-check-label" htmlFor="post3">
                          Post 3 - Instagram - @user3
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Associate Posts</button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'analysisResults':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Analysis Results Entry</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="projectSelect" className="form-label fs-4">Select Project</label>
                  <select className="form-control form-control-lg" id="projectSelect">
                    <option>Project 1</option>
                    <option>Project 2</option>
                    <option>Project 3</option>
                  </select>
                </div>
                <div className="dynamic-fields">
                  <h5 className="mb-3 fs-3">Project Analysis Fields</h5>
                  <div className="form-group mb-4">
                    <label htmlFor="field1" className="form-label fs-4">Sentiment Score</label>
                    <input type="number" step="0.01" className="form-control form-control-lg" id="field1" />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="field2" className="form-label fs-4">Topic Classification</label>
                    <input type="text" className="form-control form-control-lg" id="field2" />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="field3" className="form-label fs-4">Engagement Rate</label>
                    <input type="number" step="0.01" className="form-control form-control-lg" id="field3" />
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input type="checkbox" className="form-check-input" id="partialEntry" />
                  <label className="form-check-label fs-4" htmlFor="partialEntry">This is a partial entry (can be updated later)</label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Submit Results</button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 'postQuery':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Post Query System</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="platformFilter" className="form-label fs-4">Social Media Platform</label>
                  <select className="form-control form-control-lg" id="platformFilter">
                    <option value="">All Platforms</option>
                    <option>Twitter</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Reddit</option>
                    <option>LinkedIn</option>
                  </select>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="startDateFilter" className="form-label fs-4">From Date</label>
                    <input type="date" className="form-control form-control-lg" id="startDateFilter" />
                  </div>
                  <div className="col">
                    <label htmlFor="endDateFilter" className="form-label fs-4">To Date</label>
                    <input type="date" className="form-control form-control-lg" id="endDateFilter" />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="usernameFilter" className="form-label fs-4">Username</label>
                  <input type="text" className="form-control form-control-lg" id="usernameFilter" placeholder="Enter username" />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Search Posts</button>
                </div>
              </form>
              
              <div className="mt-5">
                <h5 className="mb-3 fs-3">Results</h5>
                <div className="list-group fs-4">
                  <div className="list-group-item p-4">
                    <h6 className="mb-2 fs-4 fw-bold">Post by @user1 on Twitter</h6>
                    <p className="mb-2 fs-5">This is a sample post content...</p>
                    <small className="fs-6">Posted on: 2023-05-15 | Experiments: Project 1, Project 3</small>
                  </div>
                  <div className="list-group-item p-4">
                    <h6 className="mb-2 fs-4 fw-bold">Post by @user2 on Facebook</h6>
                    <p className="mb-2 fs-5">Another sample post content...</p>
                    <small className="fs-6">Posted on: 2023-05-16 | Experiments: Project 2</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'projectQuery':
        return (
          <div className="card shadow w-100">
            <div className="card-header bg-primary text-white">
              <h3 className="display-6 text-center">Project Query System</h3>
            </div>
            <div className="card-body p-5">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="projectNameFilter" className="form-label fs-4">Project Name</label>
                  <input type="text" className="form-control form-control-lg" id="projectNameFilter" placeholder="Enter project name" />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3 fs-4">Search Projects</button>
                </div>
              </form>
              
              <div className="mt-5">
                <h5 className="mb-3 fs-3">Results</h5>
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h6 className="fs-3">Project 1</h6>
                  </div>
                  <div className="card-body p-4">
                    <p className="fs-4"><strong>Manager:</strong> John Doe</p>
                    <p className="fs-4"><strong>Institute:</strong> Research Institute A</p>
                    <p className="fs-4"><strong>Duration:</strong> 2023-01-01 to 2023-12-31</p>
                    <p className="fs-4"><strong>Completion:</strong> 75% of analysis fields completed</p>
                    
                    <h6 className="mt-4 fs-3">Associated Posts</h6>
                    <ul className="list-group fs-4 mb-4">
                      <li className="list-group-item p-3">Post 1 - Twitter - @user1</li>
                      <li className="list-group-item p-3">Post 3 - Instagram - @user3</li>
                    </ul>
                    
                    <h6 className="fs-3">Analysis Results</h6>
                    <table className="table table-striped table-hover fs-5">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Sentiment Score</td>
                          <td>0.75</td>
                        </tr>
                        <tr>
                          <td>Topic Classification</td>
                          <td>Technology</td>
                        </tr>
                        <tr>
                          <td>Engagement Rate</td>
                          <td>8.2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="container-fluid px-0" style={{minHeight: '100vh', textAlign: 'center'}}>
      <div className="row g-0 justify-content-center" style={{minHeight: '100vh'}}>
        <div className="col-12">
          <div className="my-4">
            <h1 className="text-center display-2 mb-4">Database Project</h1>
            
            {/* Navigation */}
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 rounded shadow">
                <div className="container-fluid">
                  <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav fs-4 mx-auto">
                      <li className="nav-item px-3">
                        <button 
                          className={`nav-link btn ${activePage === 'home' ? 'active' : ''}`} 
                          onClick={() => navigateTo('home')}
                        >
                          Home
                        </button>
                      </li>
                      
                      {/* Data Entry Interface Dropdown */}
                      <li className="nav-item dropdown px-3">
                        <button 
                          className="nav-link dropdown-toggle btn" 
                          id="dataEntryDropdown"
                          onClick={() => {
                            // Just a simple toggle for demo purposes
                            const dropdown = document.getElementById('dataEntryMenu');
                            if (dropdown.style.display === 'block') {
                              dropdown.style.display = 'none';
                            } else {
                              dropdown.style.display = 'block';
                            }
                          }}
                        >
                          Data Entry
                        </button>
                        <div className="dropdown-menu p-0" id="dataEntryMenu" style={{display: 'none'}}>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('projectEntry')}>Project Information</button>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('postEntry')}>Post Entry</button>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('userEntry')}>User Information</button>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('projectPostAssociation')}>Project-Post Association</button>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('analysisResults')}>Analysis Results</button>
                        </div>
                      </li>
                      
                      {/* Query Interface Dropdown */}
                      <li className="nav-item dropdown px-3">
                        <button 
                          className="nav-link dropdown-toggle btn" 
                          id="queryDropdown"
                          onClick={() => {
                            // Just a simple toggle for demo purposes
                            const dropdown = document.getElementById('queryMenu');
                            if (dropdown.style.display === 'block') {
                              dropdown.style.display = 'none';
                            } else {
                              dropdown.style.display = 'block';
                            }
                          }}
                        >
                          Query Interface
                        </button>
                        <div className="dropdown-menu p-0" id="queryMenu" style={{display: 'none'}}>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('postQuery')}>Post Query</button>
                          <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('projectQuery')}>Project Query</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            
            {/* Page Content */}
            <div className="container">
              <div className="main-content mb-5">
                {renderPageContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;