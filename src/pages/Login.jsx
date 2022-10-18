import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      button: true,
      endpoint: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;

    this.setState({ name: value }, () => {
      const { name } = this.state;
      const minCharacter = 3;

      if (name.length >= minCharacter) {
        this.setState({ button: false });
      } else {
        this.setState({ button: true });
      }
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { name } = this.state;

    this.setState({ endpoint: true }, async () => {
      const { endpoint } = this.state;
      const { history } = this.props;
      await createUser({ name });

      if (endpoint) {
        return history.push('/search');
      }
      this.setState({ endpoint: false });
    });
  }

  render() {
    const { button, endpoint } = this.state;
    return (
      <main>
        {endpoint ? (
          <Loading />
        ) : (
          <div
            className="container d-flex justify-content-center"
            data-testid="page-login"
          >
            <label htmlFor="name">
              <div className="border border-dark align-self-center">
                <input
                  id="ipt-lgn"
                  placeholder="Digite seu login"
                  data-testid="login-name-input"
                  name="name"
                  type="text"
                  required
                  onChange={ this.handleChange }
                />
                <Button
                  id="btn-login"
                  variant="danger"
                  data-testid="login-submit-button"
                  type="button"
                  onClick={ this.handleClick }
                  disabled={ button }
                >
                  LOGIN
                </Button>
              </div>
            </label>
          </div>
        )}
      </main>
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
