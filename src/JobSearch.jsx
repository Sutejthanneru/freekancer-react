import { Component } from 'react';
import { callApi } from './api.js';

export default class JobSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchTitle: '',
      joblist: [],
      filteredJobs: [],
      showResults: false
    };

    this.readJobsResponse = this.readJobsResponse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    callApi("GET", "http://localhost:8087/jobs/readjob", null, this.readJobsResponse);
  }

  readJobsResponse(res) {
    if (res.includes("401::")) {
      alert(res.split("::")[1]);
      return;
    }

    try {
      const data = JSON.parse(res);
      this.setState({ joblist: data });
    } catch (e) {
      console.error("Failed to parse job data:", e);
    }
  }

  handleInputChange(event) {
    this.setState({ searchTitle: event.target.value });
  }

  handleSearch() {
    const { searchTitle, joblist } = this.state;
    const lowerSearch = searchTitle.toLowerCase();

    const filtered = joblist.filter(job =>
      job?.title?.toLowerCase().includes(lowerSearch)
    );

    this.setState({ filteredJobs: filtered, showResults: true });
  }

  render() {
    const { searchTitle, filteredJobs, showResults } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Job Search</h2>
        <input
          type="text"
          placeholder="Enter job title"
          value={searchTitle}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>

        {showResults && (
          <div className="results">
            {filteredJobs.map((job, index) => (
              <div key={index} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <h4>{job.title || 'No title'}</h4>
                <p><b>Company:</b> {job.company || 'N/A'}</p>
                <p><b>Location:</b> {job.location || 'N/A'}</p>
                <p><b>Type:</b> {job.jobtype === "1" ? "Full-time" : "Part-time"}</p>
                <p><b>Salary:</b> {job.salary || 'N/A'}</p>
                <p><b>Description:</b> {job.description || 'No description'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
