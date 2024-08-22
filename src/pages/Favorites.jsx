import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div
        data-testid="page-favorites"
        className="container d-flex justify-content-center">
        <Header />
      </div>
    );
  }
}

export default Favorites;
