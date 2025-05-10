import React, { Component } from 'react';
import './Dashboard.css';
import { callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';
import JobPosting from './JobPosting';
import JobSearch from './JobSearch';
import MyProfile from './MyProfile';

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      activeComponent: null,
      showSettingsPopup: false,
      activeSettingsTab: 'about',
    };
    this.fullnameResponse = this.fullnameResponse.bind(this);
    this.loadComponents = this.loadComponents.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleSettingsPopup = this.toggleSettingsPopup.bind(this);
    this.changeSettingsTab = this.changeSettingsTab.bind(this);
  }

  componentDidMount() {
    const csr = getSession("csrid");
    if (csr === "") {
      this.logout();
      return;
    }

    const data = JSON.stringify({ csrid: csr });
    callApi("POST", "http://localhost:8087/users/getfullname", data, this.fullnameResponse);
  }

  fullnameResponse(response) {
    this.setState({ fullname: response });
  }

  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }

  loadComponents(mid) {
    const componentMap = {
      "1": <JobPosting />,
      "2": <JobSearch />,
      "3": <MyProfile />,
    };

    this.setState({ activeComponent: componentMap[mid] || null });
  }

  toggleSettingsPopup() {
    this.setState((prevState) => ({ showSettingsPopup: !prevState.showSettingsPopup }));
  }

  changeSettingsTab(tab) {
    this.setState({ activeSettingsTab: tab });
  }

  render() {
    const { fullname, activeComponent, showSettingsPopup, activeSettingsTab } = this.state;

    const settingsContent = {
      about: (
        <div>
          <h2>About Our Website</h2>
          <p>
            Welcome to <strong>Freelancer Marketplace</strong>, your one-stop platform for connecting talented freelancers with clients worldwide.
            Our mission is to provide seamless experiences, enabling users to find the right opportunities and solutions effortlessly.
          </p>
          <p>
            Whether you're looking to hire skilled professionals or showcase your expertise, our platform offers intuitive tools,
            secure transactions, and excellent customer support to make your journey smooth and rewarding.
          </p>
        </div>
      ),
      privacy: (
        <div>
          <h2>Privacy Policy</h2>
          <p>
            At <strong>Freelancer Marketplace</strong>, we prioritize your privacy. We are committed to safeguarding your personal information
            and ensuring transparency in how we collect, use, and protect your data.
          </p>
          <p>
            Our privacy policy covers details about data collection, cookies, third-party services, and security measures.
            For more information, please review our full privacy policy.
          </p>
        </div>
      ),
      projects: (
        <div>
          <h2>Previous Projects</h2>
          <p>
            Over the years, we have successfully delivered numerous projects across industries such as technology, design, marketing, and more.
            Our portfolio showcases our dedication to excellence and innovation.
          </p>
          <ul>
            <li>Developing custom software solutions for startups</li>
            <li>Designing user-friendly websites for e-commerce businesses</li>
            <li>Creating impactful marketing campaigns for global brands</li>
          </ul>
        </div>
      ),
      rating: (
        <div>
          <h2>Rate Us</h2>
          <p>
            Your feedback is invaluable to us! We strive to improve continuously, and your ratings help us deliver better services.
            Please take a moment to rate your experience with our platform.
          </p>
          <p>
            Honest reviews ensure we stay on track in providing the best possible service. Thank you for helping us grow!
          </p>
        </div>
      ),
      payments: (
        <div>
          <h2>Payments</h2>
          <p>
            Our payment system is secure, efficient, and user-friendly. We support multiple payment methods to ensure convenience and flexibility for our users.
          </p>
          <h4>Available Payment Methods:</h4>
          <ul>
            <li>Credit/Debit Cards (Visa, MasterCard, RuPay)</li>
            <li>UPI (Google Pay, PhonePe, Paytm)</li>
            <li>Net Banking (All major banks supported)</li>
            <li>Wallets (Paytm Wallet, Amazon Pay, etc.)</li>
          </ul>
          <h4>Tax & Charges:</h4>
          <p>
            - All transactions are subject to an 18% GST as per government regulations. <br />
            - A small platform fee may be applied for secure processing and maintenance.
          </p>
          <h4>Invoice & Amount Breakdown:</h4>
          <ul>
            <li>Service Fee: ₹1,000</li>
            <li>Platform Charges: ₹50</li>
            <li>GST (18%): ₹189</li>
            <li><strong>Total Payable: ₹1,239</strong></li>
          </ul>
          <p>
            For any payment-related issues or invoice requests, please reach out to our support team at <strong>support@freelancermarketplace.com</strong>.
          </p>
        </div>
      ),
    };

    return (
      <div className="dashboard">
        <div className="header">
          <div className="logoText"><span>Freelancer</span> Marketplace</div>
          <img
            className="logout"
            src="./logout.png"
            alt="Logout"
            onClick={this.logout}
          />
          <label>{fullname}</label>
          <button className="settings-button" onClick={this.toggleSettingsPopup}>Settings</button>
        </div>

        <div className="menu">
          <MenuBar onMenuClick={this.loadComponents} />
        </div>

        <div className="outlet">
          {activeComponent}
        </div>

        {/* Settings Popup */}
        {showSettingsPopup && (
          <div className="popup-backdrop">
            <div className="popup">
              <h3>Settings</h3>
              <div className="settings-menu">
                <button onClick={() => this.changeSettingsTab('about')} className={activeSettingsTab === 'about' ? 'active-tab' : ''}>About</button>
                <button onClick={() => this.changeSettingsTab('privacy')} className={activeSettingsTab === 'privacy' ? 'active-tab' : ''}>Privacy Policy</button>
                <button onClick={() => this.changeSettingsTab('projects')} className={activeSettingsTab === 'projects' ? 'active-tab' : ''}>Previous Projects</button>
                <button onClick={() => this.changeSettingsTab('rating')} className={activeSettingsTab === 'rating' ? 'active-tab' : ''}>Rating</button>
                <button onClick={() => this.changeSettingsTab('payments')} className={activeSettingsTab === 'payments' ? 'active-tab' : ''}>Payments</button>
              </div>
              <div className="popup-content">
                {settingsContent[activeSettingsTab]}
              </div>
              <button className="close-button" onClick={this.toggleSettingsPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
