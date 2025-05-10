import  { Component } from 'react';
import './MyProfile.css';
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        email: '',
        phone: '',  
        about: '',
        github: '',
        linkedin: ''
      },
      isEditable: false, 
    };
  }


  componentDidMount() {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      this.setState({ profile: savedProfile });
    }
  }

  
  toggleEdit = () => {
    this.setState(prevState => ({ isEditable: !prevState.isEditable }));
  };

 
  handleProfileChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      profile: { ...this.state.profile, [name]: value }
    });
  };

  
  saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(this.state.profile));
    this.setState({ isEditable: false });
  };

 render() {
  const { profile, isEditable } = this.state;

  return (
    <div className="my-profile-container">
      <h2 className="myprofile-heading">My Profile</h2>

      {profile ? (
        <div className="my-profile-details">
          <div className="profile-field">
            <p><strong>Name:</strong> {isEditable ? <input type="text" name="name" value={profile.name} onChange={this.handleProfileChange} /> : profile.name}</p>
          </div>
          <div className="profile-field">
            <p><strong>Email:</strong> {isEditable ? <input type="email" name="email" value={profile.email} onChange={this.handleProfileChange} /> : profile.email}</p>
          </div>
          <div className="profile-field">
            <p><strong>Phone:</strong> {isEditable ? <input type="text" name="phone" value={profile.phone} onChange={this.handleProfileChange} /> : profile.phone}</p>
          </div>
          <div className="profile-field">
            <p><strong>About:</strong> {isEditable ? <textarea name="about" value={profile.about} onChange={this.handleProfileChange} /> : profile.about}</p>
          </div>
          <div className="profile-field">
            <p><strong>Github:</strong> {isEditable ? <input type="text" name="github" value={profile.github} onChange={this.handleProfileChange} /> : profile.github}</p>
          </div>
          <div className="profile-field">
            <p><strong>LinkedIn:</strong> {isEditable ? <input type="text" name="linkedin" value={profile.linkedin} onChange={this.handleProfileChange} /> : profile.linkedin}</p>
          </div>

          <div className="profile-buttons">
            <button onClick={this.toggleEdit}>{isEditable ? 'Cancel' : 'Edit'}</button>
            {isEditable && <button onClick={this.saveProfile}>Save</button>}
          </div>
        </div>
      ) : (
        <p className="no-profile-message">No profile data available. Please edit your profile.</p>
      )}
    </div>
  );
}
}