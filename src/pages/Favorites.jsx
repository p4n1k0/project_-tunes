import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

const INITIAL_STATE = {
  favorites: [],
  loading: false
}

class Favorites extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  };

  async componentDidMount() {
    await this.getFavorite();
  };

  getFavorite = async () => {
    this.setState({ loading: true });
    this.setState({
      favorites: await getFavoriteSongs(),
      loading: false,
    });
  };

  render() {
    const { favorites, loading } = this.state;

    if (loading) return <Loading />
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <Header />
        <span className="album-music-container">
          {
            favorites.length === 0
              ? (
                <span className="not-favorited-message">
                  <h3>Nenhuma música favorita</h3>
                </span>
              ) : (
                favorites.map(({
                  musicName,
                  previewUrl,
                  trackId
                }) => (
                  <MusicCard
                    key={trackId}
                    musicName={musicName}
                    previewUrl={previewUrl}
                    trackId={trackId}
                    getFavorite={this.getFavorite}
                  />
                ))
              )}
        </span>
      </div>
    );
  };
};

export default Favorites;
