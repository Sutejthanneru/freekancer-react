import  { Component } from 'react';
import './App.css';
import { callApi, setSession } from './api.js';
import { FaTh, FaCheckCircle, FaBolt, FaCommentsDollar } from 'react-icons/fa';

class App extends Component {

    constructor()
    {
        super();
        this.userRegistration=this.userRegistration.bind(this);
        this.forgetPassword=this.forgetPassword.bind(this);
        this.signin=this.signin.bind(this);
    }
    
    showSignIn () {
        var popup = document.getElementById('popup');

        popup.style.display = 'block';
        var signin=document.getElementById('login');
        var signup=document.getElementById('signup');
        var popupheader=document.getElementById('popup-header');
        popupheader.innerHTML="Login";
        signin.style.display='block';
        signup.style.display='none';

        var username=document.getElementById('username');
        var password=document.getElementById('password');
        username.value="";
        password.value="";

    }

    showsignup(){
        

        var popup = document.getElementById('popup');
        popup.style.display = 'block';
        var signin=document.getElementById('login');
        var signup=document.getElementById('signup');
        var popupheader=document.getElementById('popup-header');
        popupheader.innerHTML='Create An Account';
        signin.style.display='none';
        signup.style.display='block';

        var fullname=document.getElementById('fullname');
        var email=document.getElementById('email');
        var role=document.getElementById('role');
        var signuppassword=document.getElementById('signuppassword');
        var confirmpassword=document.getElementById('confirmpassword');

        fullname.value="";
        email.value="";
        role.value="";
        signuppassword.value="";
        confirmpassword.value="";

    }

    closeSignIn (event) {
        if (event.target.id === 'popup') {
            let popup = document.getElementById('popup');
            popup.style.display = 'none';
        }
        
    }

    userRegistration(){
        var fullname=document.getElementById("fullname");
        var email=document.getElementById("email");
        var role=document.getElementById("role");
        var signuppassword=document.getElementById("signuppassword");
        var confirmpassword=document.getElementById("confirmpassword");

        fullname.style.border="";
        email.style.border="";
        role.style.border="";
        signuppassword.style.border="";
        confirmpassword.style.border="";

        if(fullname.value==="")
            {
              fullname.style.border = "1px solid red";
              fullname.focus();
              return;
            }
        if(email.value==="")
        {
            email.style.border = "1px solid red";
            email.focus();
            return;
          }
        if(role.value==="")
        {
          role.style.border = "1px solid red";
          role.focus();
          return;
        }
        if(signuppassword.value==="")
        {
            signuppassword.style.border = "1px solid red";
            signuppassword.focus();
            return;
        }
        if(confirmpassword.value==="")
        {
            confirmpassword.style.border = "1px solid red";
            confirmpassword.focus();
            return;
        }
        if(signuppassword.value != confirmpassword.value)
        {
            signuppassword.style.border = "1px solid red";
            signuppassword.focus();
            return;
        }

        var data=JSON.stringify({
            fullname:fullname.value,
            email:email.value,
            role:role.value,
            password:signuppassword.value
            

        });

        callApi("POST", "http://localhost:8087/users/signup", data, this.getResponse);

    }

    getResponse(res)
    {
        var resp = res.split('::');
        alert(resp[1]);
        if(resp[0]==="200")
        {
            let signin = document.getElementById("login");
            let signup = document.getElementById("signup");
            signin.style.display = "block";
            signup.style.display = "none";
        }
        
    }

    forgetPassword()
    {
        var username=document.getElementById("username");
        username.style.border="";
        if(username.value==="")
        {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        let url = "http://localhost:8087/users/forgetpassword/"+username.value;
        callApi("GET", url, "", this.forgetPasswordResponse);
    
    }
    forgetPasswordResponse(res)
    {
        var responseDiv10=document.getElementById("responseDiv1");
        let data = res.split('::');
        if (data[0] === "200") {
            responseDiv10.innerHTML = `<br/><label style = 'color:green' >${data[1]}</label>`;
        }
        else {
            responseDiv10.innerHTML = `<br/><label style = 'color:red' >${data[1]}</label>`;
        }

    }
    signin()
    {
        var username=document.getElementById("username");
        var password=document.getElementById("password");
        var responseDiv10=document.getElementById("responseDiv1");
        username.style.border="";
        password.style.border="";
        responseDiv10.innerHTML = "";
        if(username.value==="")
        {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        if(password.value==="")
        {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }
        let data=JSON.stringify({
            email:username.value,
            password:password.value
        });
        callApi("POST", "http://localhost:8087/users/signin", data, this.signinResponse);
    }
    signinResponse(res)
    {
        var responseDiv10=document.getElementById("responseDiv10")
        let rdata = res.split('::');
        if (rdata[0] === "200") {
            setSession("csrid", rdata[1], 1);
            window.location.replace("/dashboard");
        }
        else {
            responseDiv10.innerHTML = `<br/><br/><lable style = 'color:red' >${rdata[1]}</lable>`;
        }
    }
    render() {
        return (
            <div id = 'container'>
                <div id='popup' onClick={this.closeSignIn}>
                    <div id='popup-window'>
                        <div id='popup-header'><p>Login</p></div>
                        <div id='login'>
                            <label className='username-label'>User Name</label>
                            <input type='text' id='username' />
                            <label className='password-label'>Password</label>
                            <input type='password' id='password' />
                            <div className='forgot-password'>Forgot <label onClick={this.forgetPassword}>Password?</label></div>
                            <button className='login-button' onClick={this.signin}>Login</button>
                            <div className='div10' id = 'responseDiv1'></div>
                            <div className='20'>Dont have an Account
                                <div><label className='signup'onClick={this.showsignup}>  Sign Up </label></div>
                            </div>
                        </div>
                        <div id='signup'>
                            <label className='fullname'>Full Name</label>
                            <input type='text' id='fullname' />
                            <label className='email'>email id</label>
                            <input type='text' id='email' />
                           <div> <label >Select Role</label>
                              <select id="role">
                                <option value=''></option>
                                <option value='1'>Admin</option>
                                <option value='2'>Client</option>
                                <option value='3'>Freelancer</option>
                              </select>
                              </div> 
                            <label className='password'>Password</label>
                            <input type='password' id='signuppassword' />
                            <label className='confirmpassword'>Confirm Password</label>
                            <input type='password' id='confirmpassword' />
                            <button onClick={this.userRegistration}>Register</button>
                            <div className='div30'>Already have an Account
                                <div><label className='signin'onClick={this.showSignIn}>  Sign In </label></div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div> 

                <div id='header1'>
                `           `
                    <div className='logo-text'>
                       Freelancer  <span> Marketplace</span>
                    </div>
                        <img className='sign-in-img' src='user.png' alt='sign-in' onClick={this.showSignIn} />
                        <div className='sign-in-text' onClick={this.showSignIn}>
                        Log-In
                    </div>
                    



                </div>
                <div id='body'>
                    
                 <section className="intro-section">
                <div className="intro-box">
                    <h2>We bring people together to turn ideas into reality</h2>
                    <p>Find skilled professionals or post job opportunities with a seamless and efficient platform.</p>
                </div>
            </section>
             <section className="categories-section">
                <h2>Browse talent by category</h2>
                <h4>Looking for work? <span className='job'>Browse jobs</span></h4>
                <div className="categories-list">
                    <div className="category-item">
                        <div className="category-content">
                            <p>Web Development</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Graphic Design</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Content Writing</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Digital Marketing</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Ai-Services</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>SEO Services</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Mobile App Development</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-content">
                            <p>Data Analysis</p>
                            <div className="ratingbox">
                                <span><span className="star">&#9733;</span>4.85/5 </span>
                                <span className='skill'>1853 skills</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              <section className="additional-content-section">
                <div className="additional-content">
                    <div className="additional-image">
                        <img src="freelancer.jpg" alt="Work Game" />
                    </div>
                    <div className="additional-text">
                        <h2>Enhance your productivity—it’s simple!</h2>
                        <ul>
                            <li><p><b>  <i className="fa fa-check-circle"></i> No cost to join: </b> <hr />Register and browse talent profiles, explore projects, or even book a consultation.</p></li>
                            <li><p><b><i className="fa fa-check-circle"></i> Post a job and hire top talent:</b> <hr />Finding talent doesn’t have to be a chore. Post a job or we can search for you! </p></li>
                            <li><p><b > <i className="fa fa-check-circle"></i>Work with the best—without breaking the bank: </b> <hr />Upwork makes it affordable to up your work and take advantage of low transaction rates.</p></li>
                        </ul>
                        <div className='signup'>
                            <div className="signup-button-container">
                                <button className="signup-buttonn" onClick={() =>{this.showsignup()}}>Sign Up for Free</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                    <section className="popular-services-section">
                <h2>Popular Services</h2>
                <div className="popular-services-grid">
                    <div className="service-card" style={{ backgroundColor: '#ea7d11' }}>
                        <img src="webdevleopment.png" alt="Website Development" className="service-image" />
                        <h3 className="service-title">Website Development</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#ea5611' }}>
                        <img src="logodesign.png" alt="Logo Design" className="service-image" />
                        <h3 className="service-title">Logo Design</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#13b60b' }}>
                        <img src="ecommerce.png" alt="SEO" className="service-image" />
                        <h3 className="service-title">E-commerce Marketing</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#eeb615' }}>
                        <img src="datascience.png" alt="Website Development" className="service-image" />
                        <h3 className="service-title">DataScience & ML</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#1082cc' }}>
                        <img src="socialmedia.png" alt="Logo Design" className="service-image" />
                        <h3 className="service-title">Social Media Marketing</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#cc10ad' }}>
                        <img src="videoediting.png" alt="SEO" className="service-image" />
                        <h3 className="service-title">Video Editing</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#b2590f' }}>
                        <img src="contentwriting.png" alt="Website Development" className="service-image" />
                        <h3 className="service-title">Content Writing</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#1a296c' }}>
                        <img src="voiceover.png" alt="Logo Design" className="service-image" />
                        <h3 className="service-title">Voice Over</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#a70da9' }}>
                        <img src="software.png" alt="Website Development" className="service-image" />
                        <h3 className="service-title">Software Development</h3>
                    </div>
                    <div className="service-card" style={{ backgroundColor: '#084535' }}>
                        <img src="camera.png" alt="Logo Design" className="service-image" />
                        <h3 className="service-title">Product Photography</h3>
                    </div>
                </div>
            </section>
             <section className="freelancer-section">
                <h2>Make it all happen with freelancers</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <FaTh className="feature-icon" />
                        <h3>Access a pool of top talent across 700 categories</h3>
                    </div>
                    <div className="feature-item">
                        <FaCheckCircle className="feature-icon" />
                        <h3>Enjoy a simple, easy-to-use matching experience</h3>
                    </div>
                    <div className="feature-item">
                        <FaBolt className="feature-icon" />
                        <h3>Get quality work done quickly and within budget</h3>
                    </div>
                    <div className="feature-item">
                        <FaCommentsDollar className="feature-icon" />
                        <h3>Only pay when you’re happy</h3>
                    </div>
                </div>
                <div className="cta-button-container">
                    <button className="freelancer-button" onClick={() =>{this.showsignup()}}>Join now</button>
                </div>
            </section>
                </div>
                <footer className="footer1">
                <div className="footer-container">
                    <div className="footer-section">
                        <h4>Categories</h4>
                        <ul>
                            <li><a href="#">Graphics & Design</a></li>
                            <li><a href="#">Digital Marketing</a></li>
                            <li><a href="#">Writing & Translation</a></li>
                            <li><a href="#">Video & Animation</a></li>
                            <li><a href="#">Music & Audio</a></li>
                            <li><a href="#">Programming & Tech</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Lifestyle</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>For Clients</h4>
                        <ul>
                            <li><a href="#">How it Works</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>For Freelancers</h4>
                        <ul>
                            <li><a href="#">Become a Freelancer</a></li>
                            <li><a href="#">Freelancer Guide</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Business Solutions</h4>
                        <ul>
                            <li><a href="#">Enterprise</a></li>
                            <li><a href="#">Business</a></li>
                            <li><a href="#">Affiliate Program</a></li>
                            <li><a href="#">Partnerships</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press & News</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
            </div>
            
        );
    }
}

export default App;