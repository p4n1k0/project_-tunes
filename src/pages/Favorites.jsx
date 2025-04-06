import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      test: false,
      loading: false,
    };
  };

  async componentDidMount() {
    await this.getFavorite();
  };

  getFavorite = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      loading: false,
    });
  };

  render() {
    const { favorites, test, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {test ? <span>Nenhuma musica favorita</span> : (
          <section>
            {favorites.map((element, index) => (
              <section key={index}>
                <MusicCard
                  musicName={element.trackName}
                  previewUrl={element.previewUrl}
                  trackId={element.trackId}
                  getFavorite={this.getFavorite}
                />
              </section>

            ))}
          </section>
        )}
      </div>
    );
  };
};

export default Favorites;
