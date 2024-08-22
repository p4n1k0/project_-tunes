import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile" className="container d-flex justify-content-center">
        <Header />
      </div>
    );
  }
}

export default Profile;
