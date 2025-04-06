import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      descriptionSaved: '',
      emailSaved: '',
      imageSaved: '',
      nameSaved: '',
    };
  };

  async componentDidMount() {
    const { description, email, image, name } = await getUser();
    this.setState({
      loading: false,
      descriptionSaved: description,
      emailSaved: email,
      imageSaved: image,
      nameSaved: name,
    });
  };

  render() {
    const { loading, descriptionSaved, emailSaved, imageSaved, nameSaved } = this.state;
    return (

      <div data-testid="page-profile">
        {loading && <Loading />}
        <section>
          <Header />
          <h1>Profile</h1>
          <p>{descriptionSaved}</p>
          <p>{emailSaved}</p>
          <p>{nameSaved}</p>
          <img src={imageSaved} alt="imagem de perfil" data-testid="profile-image" />
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </section>
      </div>
    );
  };
};

export default Profile;
