import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

const INITIAL_STATE = {
  favorites: [],
  favorited: false,
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
    const { favorites, favorited, loading } = this.state;
    
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {!favorited ? <span>Nenhuma música favorita</span> : (
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
