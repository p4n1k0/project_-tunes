import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';


const INITIAL_STATE = {
  name: '',
  button: true,
  endpoint: false,
};

class Login extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ name: value }, () => {
      const { name } = this.state;

      if (name.length >= 3) this.setState({ button: false });
      else this.setState({ button: true });
    });
  };

  async handleClick(event) {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ endpoint: true }, async () => {
      const { endpoint } = this.state;
      const { history } = this.props;

      await createUser({ name });

      if (endpoint) return history.push('/search');
      this.setState({ endpoint: false });
    });
  }

  render() {
    const { button, endpoint } = this.state;
    return (
      <div className="login-container">
        {endpoint ? (
          <Loading />
        ) : (
          <div className="form-container" data-testid="page-login">
            <form className="formulario">
              <h1>GTUNES</h1>
              <input
                placeholder="Insira seu nome de usuário"
                data-testid="login-name-input"
                name="name"
                type="text"
                required
                onChange={this.handleChange}
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                onClick={this.handleClick}
                disabled={button}
              >
                ENTRAR
              </button>
            </form>
            <img
              src="https://i.pinimg.com/originals/fe/35/45/fe3545469a6d65137b921656ae976c3e.gif"
              alt="gatinho ouvindo musica"
            />
          </div>
        )}
      </div>
    );
  }
}

Login.defaultProps = { history: PropTypes.push };

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Login;
