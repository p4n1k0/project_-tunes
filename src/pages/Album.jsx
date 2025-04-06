import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      music: [],
      artistName: '',
      collectionName: '',
    };
  };

  async componentDidMount() {
    const { match } = this.props;
    const soundtrack = await getMusics(match.params.id);

    this.setState({
      music: soundtrack,
      artistName: soundtrack[0].artistName,
      collectionName: soundtrack[0].collectionName,
    });
  };


  render() {
    const { music, artistName, collectionName } = this.state;
    const tracks = music.filter((element) => element.kind === 'song');

    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {tracks.map((element, index) => (
          <section key={index}>
            <MusicCard
              musicName={element.trackName}
              previewUrl={element.previewUrl}
              trackId={element.trackId}
            />
          </section>
        ))}
      </div>
    );
  };
};

Album.propTypes = { match: PropTypes.object.isRequired };

export default Album;
