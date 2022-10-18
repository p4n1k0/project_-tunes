import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      music: [],
      tracks: '',
      favorites: [],
    };
  }

  componentDidMount() { this.handleStatus(); }

  componentDidUpdate() { this.handleStatus(); }

  async handleStatus() {
    const { match } = this.props;
    const soundtrack = await getMusics(match.params.id);
    const favorites = await getFavoriteSongs();

    this.setState({
      music: soundtrack,
      tracks: soundtrack[0],
      favorites,
    });
  }

  render() {
    const { music, tracks, favorites } = this.state;
    const newSong = music.filter((_, index) => index !== 0);

    return (
      <div data-testid="page-album">
        <Header />
        {newSong.map((song) => (<MusicCard
          key={ song.trackId }
          music={ newSong }
          name={ song.trackName }
          song={ song.previewUrl }
          trackId={ song.trackId }
          checked={ favorites.find((favorite) => (
            favorite.trackId === song.trackId
          )) }
        />
        ))}
        <p data-testid="artist-name">{ tracks.artistName }</p>
        <p data-testid="album-name">{ tracks.collectionName }</p>
        <img src={ tracks.artworkUrl100 } alt={ tracks.collectionName } />
      </div>
    );
  }
}

Album.propTypes = { match: PropTypes.arrayOf(PropTypes.array).isRequired };

export default Album;
