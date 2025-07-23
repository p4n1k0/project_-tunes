import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';
import './Search.css';

const INITIAL_STATE = {
  artist: '',
  button: true,
  albums: [],
  loading: false,
  researched: '',
};

class Search extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleChange(event) {
    this.setState(
      { artist: event.target.value }, () => {
        const { artist } = this.state;

        if (artist.length >= 2) this.setState({ button: false },);
        else this.setState({ button: true },);
      },
    );
  };

  async handleClick() {
    const { artist } = this.state;

    this.setState({ artist, loading: true },

      async () => {
        const album = await searchAlbumsAPI(artist);
        this.setState({
          researched: artist,
          albums: album,
          loading: false,
        });
      },
    );
  };

  render() {
    const { button, researched, albums, loading } = this.state;

    return (
      <div className="search-main" data-testid="page-search">
        <form className="search-input-container">
          <Header />
          {loading ? (
            <Loading />
          ) : (
            <label htmlFor="search">
              <input
                name="search"
                data-testid="search-artist-input"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={button}
                onClick={this.handleClick}
              >
                Pesquisar
              </button>
            </label>
          )}
        </form>
        <span className="search-span-container">
          <div className="search-results-container">
            <h3>{`Resultado de ${researched}:`}</h3>
            {albums.length === 0
              ? (
                <h3>Nenhum álbum encontrado!</h3>
              ) : (
                albums.map((album) => (
                  <div key={album.collectionId}>
                    <Link
                      data-testid={`link-to-album-${album.collectionId}`}
                      to={`/album/${album.collectionId}`}
                      className="artist-card"
                    >
                      <img
                        src={album.artworkUrl100}
                        alt={album.collectionName}
                      />
                      <p>{album.artistName}</p>
                      <p>{album.collectionName}</p>
                    </Link>
                  </div>
                ))
              )}
          </div>
        </span>
      </div>
    );
  };
};

export default Search;
