import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

const INITIAL_STATE = { name: '', loading: false };

class Header extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  };

  async componentDidMount() {
    this.setState({ loading: true },
      async () => {
        const user = await getUser();

        this.setState({
          name: user.name,
          loading: false
        },);
      },
    );
  };

  render() {
    const { loading, name } = this.state;

    return (
      <div>
          <header data-testid="header-component" className="header-container">
            {loading ? <Loading /> : <p data-testid="header-user-name">{name}</p>}
            <h1>GTUNES</h1>
          </header>
          <nav className="nav-container">
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisar
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritos
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </nav>
      </div>
    );
  };
};

export default Header;
