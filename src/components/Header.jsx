import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = { name: '', loading: true };
  }

  async componentDidMount() {
    this.setState(
      { loading: true },

      async () => {
        const user = await getUser();

        this.setState(
          { loading: false, name: user.name },
        );
      },
    );
  }

  render() {
    const { loading, name } = this.state;

    return (
      <div class="d-flex flex-row mb-3">
        <div class="p-2">
          <header data-testid="header-component">
            {loading ? <Loading /> : <p data-testid="header-user-name">{name}</p>}
          </header>
        </div>
        <div class="p-2">
          <Link data-testid="link-to-search" to="/search">
            Search
          </Link>
        </div>
        <div class="p-2">
          <Link data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
        </div>
        <div class="p-2">
          <Link data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
