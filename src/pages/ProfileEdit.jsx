import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

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
    if (loading) return <Loading />

    return (
      <form className="user-tools-edit-container">
        <Header />
        <span className="user-tools-edit-box">
          {
            image === ''
              ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="foto padrao de pessoa usuaria"
                />
              )
              : (
                <img
                  src={image}
                  alt="foto de perfil da pessoa usuaria"
                />
              )
          }
          <span className="user-image-options">
            <h2>Editar foto do perfil</h2>
            <label htmlFor="image" className="image-input-label">
              Cole aqui a URL da imagem:
              <input
                data-testid="edit-input-image"
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={this.changeProfile}
                className="image-input"
              />
              <br />
            </label>
            <p>Ou escolha uma foto do seu computador</p>
            <label htmlFor="inter-image" className="intern-image-input-label">
              Enviar arquivo
              <input
                name="intern-image"
                id="inter-image"
                type="file"
                onChange={this.changeProfile}
                className="intern-image-input"
              />
            </label>
          </span>
        </span>
        <span className="user-info-edit-box">
          <h2>Nome</h2>
          <input
            data-testid="edit-input-name"
            type="text"
            id="name-user"
            name="name"
            value={name}
            onChange={this.changeProfile}
            className="edit-input-name"
          />
          <h2>E-mail</h2>
          <span className="user-email-box">
            <input
              data-testid="edit-input-email"
              type="email"
              id="email-user"
              name="email"
              value={email}
              onChange={this.changeProfile}
            />
          </span>
          <h2>Descrição</h2>
          <textarea
            data-testid="edit-input-description"
            id="description-user"
            name="description"
            value={description}
            onChange={this.changeProfile}
          />
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={isDisabled}
            onClick={this.saveUser}
          >
            Salvar
          </button>
        </span>
      </form>
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
