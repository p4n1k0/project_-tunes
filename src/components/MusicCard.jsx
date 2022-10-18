import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = { loading: false, check: false };
  }

  async handleFavorite(song) {
    this.setState(
      { loading: true },
      async () => {
        await addSong(song);

        this.setState({ loading: false, check: true });
      },
    );
  }

  render() {
    const { music, key, name, song, trackId, checked } = this.props;
    const { loading, check } = this.state;

    return (
      <main>
        {loading ? (
          <Loading />
        ) : (
          <div key={ key }>
            <p>{ name }</p>
            <audio data-testid="audio-component" src={ song } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                name="favorite"
                type="checkbox"
                onClick={ () => this.handleFavorite(music) }
                checked={ check || checked }
              />
            </label>
          </div>
        )}
      </main>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  key: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
