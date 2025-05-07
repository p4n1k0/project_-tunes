import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

const INITIAL_STATE = {
  loading: false,
  description: '',
  email: '',
  image: '',
  name: '',
  isDisabled: true,
};

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  };

  async componentDidMount() {
    const { description, email, image, name } = await getUser();
    this.setState({
      loading: false,
      description: description,
      email: email,
      image: image,
      name: name,
    });
  };

  changeProfile = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value, }, () => this.buttonVerify());
  };

  buttonVerify = () => {
    const { description, email, image, name } = this.state;

    if (name !== '' && email !== '' && image !== '' && description !== '') this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  };

  saveUser = async () => {
    const { description, email, image, name } = this.state;
    const { history } = this.props;

    const userUpdate = {
      name: name,
      email: email,
      image: image,
      description: description
    };
    this.setState({
      loading: true,
    });
    await updateUser(userUpdate);
    history.push('/profile');
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, description, email, image, name, isDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <section>
          <Header />
          <h1>ProfileEdit</h1>
          <form>
            <label htmlFor="name-user">
              Nome
              <input
                data-testid="edit-input-name"
                type="text"
                id="name-user"
                name="name"
                value={name}
                onChange={this.changeProfile}
              />
            </label>
            <br />
            <label htmlFor="email-user">
              E-mail
              <input
                data-testid="edit-input-email"
                type="email"
                id="email-user"
                name="email"
                value={email}
                onChange={this.changeProfile}
              />
              <br />
            </label>
            <label htmlFor="description-user">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description-user"
                name="description"
                value={description}
                onChange={this.changeProfile}
              />
              <br />
            </label>
            <label htmlFor="image-user">
              Alterar Imagem
              <input
                data-testid="edit-input-image"
                type="text"
                id="image-user"
                name="image"
                value={image}
                onChange={this.changeProfile}
              />
              <br />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={isDisabled}
              onClick={this.saveUser}
            >
              Editar perfil
            </button>
          </form>
        </section>
        {loading && <Loading />}
      </div>
    );
  };
};

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default ProfileEdit;
