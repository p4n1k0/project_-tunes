import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

const INITIAL_STATE = { checked: false, loading: false };

class MusicCard extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  };

  async componentDidMount() {
    const { trackId } = this.props;

    const listFavorite = await getFavoriteSongs();
    const isFavorite = listFavorite.some((music) => music.trackId === trackId);

    if (isFavorite) this.setState({ checked: true });
  };

  addFavorite = async () => {
    const { getFavorite } = this.props;

    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: !prevState.loading,
    }));

    await addSong(this.props);

    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));

    const { checked } = this.state;

    if (!checked) removeSong(this.props);
    if (typeof getFavorite === 'function') getFavorite();
  };

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;

    return (
      <div className="music-card">
        {loading ? <Loading /> : (
          <>
            <p className="music-name">{musicName}</p>
            <audio
              data-testid="audio-component"
              src={previewUrl}
              controls
              className="music-player"
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <form>
              <label htmlFor="favorite" className="favorito-container">
                Favorita
                <input
                  name="favorite"
                  id="favorite"
                  type="checkbox"
                  data-testid={`checkbox-music-${trackId}`}
                  checked={checked}
                  onChange={this.addFavorite}
                />
              </label>
            </form>
          </>)}
      </div>
    );
  };
};

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,

  getFavorite: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
};

export default MusicCard;
