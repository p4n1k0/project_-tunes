import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

const INITAL_STATE = {
  loading: false,
  description: '',
  email: '',
  image: '',
  name: '',
};

class Profile extends Component {
  constructor() {
    super();
    this.state = INITAL_STATE;
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

  render() {
    const { loading, description, email, image, name } = this.state;
    if (loading) return <Loading />

    return (
      <div data-testid="page-profile" className="profile-card-container">
        <Header />
        <span className="user-tools-box">
          {
            image === ''
              ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="foto padrão de pessoa usuária"
                  width={100}
                />
              )
              : (
                <img
                  src={image}
                  alt="imagem de perfil"
                  data-testid="profile-image"
                />
              )
          }
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </span>
        <span className="user-info-box">
          <h2>Nome de usuário</h2>
          <p>{name}</p>
          <h2>E-mail</h2>
          <p>{email}</p>
          <fieldset>
            <legend>Descrição</legend>
            <p>{description}</p>
          </fieldset>
        </span>
      </div>
    );
  };
};

export default Profile;
