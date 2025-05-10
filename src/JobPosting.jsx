import  { Component } from 'react';
import './JobPosting.css';
import {callApi} from './api.js';
class JobPosting extends Component {
       constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            company: '',
            location: '',
            jobtype: '',
            salary: '',
            description: '',
          
        };
        this.state={joblist:[]};

        this.readJobsResponse = this.readJobsResponse.bind(this);
        this.updateJobResponse = this.updateJobResponse.bind(this);
        this.savejobResponse = this.savejobResponse.bind(this);
    }
componentDidMount() {
        callApi("GET", "http://localhost:8087/jobs/readjob", null, this.readJobsResponse);
    }
    readJobsResponse(res)
    {
        if(res.includes("401::"))
        {
            alert(res.split("::")[1]);
            return;
        }
        let data=JSON.parse(res);
        this.setState({joblist:data});
    }
    loadInputChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    saveJobDetails() {
        let data = JSON.stringify(this.state);
        if (this.state.id === '')
            callApi("POST", "http://localhost:8087/jobs/insert", data, this.savejobResponse);
        else
            callApi("PUT", "http://localhost:8087/jobs/update", data, this.savejobResponse);
    }
    savejobResponse(res)
    {
        let data=res.split("::");
        alert(data[1]);
        this.componentDidMount();

    }
   showPopup() {
        document.getElementById('jppopup').style.display = 'block';
    }

    closePopup() {
        document.getElementById('jppopup').style.display = 'none';
    }


   updateJob(id) {
        callApi("GET", "http://localhost:8087/jobs/getjob/" + id, "", this.updateJobResponse);
    }

    updateJobResponse(res)
    {
        if(res.includes("401::"))
            {
                alert(res.split("::")[1]);
                return;
            }
            let data=JSON.parse(res);
            this.setState({
                id:data.id,
                title:data.title,
                company:data.company,
                location:data.location,
                jobtype:data.jobtype,
                salary:data.salary,
                description:data.description
            });
            this.showPopup();
    }

deleteJob(id) {
        let resp = window.confirm("Are you sure you want to delete this job?");
        if (resp === true) {
            
            callApi("DELETE", "http://localhost:8087/jobs/delete/" + id, "", this.savejobResponse);
        } else {
            alert("Job not deleted.");
            return;
        }
    }
    render() {
        const { id, title, company, location, jobtype, salary, description } = this.state;
        const { joblist } = this.state;
        return (
            <div className='JPContainer'>
                <div id='jppopup' className='popup'>
                    <div className='popupwindow'>
                        <div className='popupheader'>
                            <label>Add job details</label>
                            <span onClick={()=>this.closePopup()}>&times;</span>
                        </div>
                        <div className='popupcontent'>
                            <label>Job Title*</label>
                            <input type='text' id="T1" name='title' value={ title } onChange={(event)=>this.loadInputChange(event)}/>

                            <label>Company Name*</label>
                            <input type='text' id="T2" name='company' value={company}  onChange={(event)=>this.loadInputChange(event)}/>

                            <label>Location*</label>
                            <input type='text' id="T3" name='location' value={location} onChange={(event)=>this.loadInputChange(event)}/>
                            <label>Job Type*</label>
                            <select id='T4' name='jobtype' value={jobtype} onChange={(event)=>this.loadInputChange(event)}>
                                <option value="0"></option>
                                <option value="1">Full-time</option>
                                <option value="2">Part-time</option>
                            </select>

                            <label>Salary*</label>
                            <input type='text' id="T5" name='salary' value={salary} onChange={(event)=>this.loadInputChange(event)}/>

                            <label>Job Description*</label>
                            <textarea id='T6' rows="5" name='description' value={description} onChange={(event)=>this.loadInputChange(event)}></textarea>
                            
                            <button onClick={()=>this.saveJobDetails()}>Save</button>
                        </div>
                        <div className='popupfooter'></div>
                    </div>
                </div>
                <div className='header'>
                    <label>Available Jobs</label>
                </div>
                <div className='content'>
                   {joblist.map((data, key) => (
  <div className='result' key={key}>
    <div className='div1'>
      <label>{data.title}</label>
      <span>{data.salary}</span>
      <img src='/edit.png' alt='edit' onClick={() => this.updateJob(data.id)} />
      <img src='/delete.png' alt='delete' onClick={() => this.deleteJob(data.id)} />
    </div>
    <div className='div2'>
  <p>  <span>Company Name </span> : {data.company} <br /> </p> 
  <p>  <span>Location </span>     : {data.location} <br /> </p> 
  <p>  <span>Job-Type </span>     : {data.jobtype === "1" ? "Full-time" : "Part-time"} </p> 
    </div>
    <div className='div3'>
        <p>  <span>Job Description </span> :{data.description} <br /> </p>
     
    </div>
  </div>
))}
                 
                </div>
                <div className='footer'>
                    <button className='addjob' onClick={()=>this.showPopup()}>Add Job</button>
                </div>
                
            </div>
        );
    }
}

export default JobPosting;