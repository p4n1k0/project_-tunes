import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

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
      <main data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <label htmlFor="search">
            <input
              name="search"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ button }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </label>
        )}
        <div>
          <h3>{`Resultado de álbuns de: ${researched}`}</h3>
          {albums.length === 0 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            albums.map((album) => (
              <div key={ album.collectionId }>
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionName }
                />
                <p>{album.artistName}</p>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  {album.collectionName}
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    );
  };
};

export default Search;
