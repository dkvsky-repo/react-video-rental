import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => {
      return m._id !== movie._id;
    });
    this.setState({ movies });
  };

  handleLike = movie => {
    const moviesCopy = [...this.state.movies];
    const index = moviesCopy.indexOf(movie);
    moviesCopy[index] = { ...moviesCopy[index] };
    moviesCopy[index].liked = !moviesCopy[index].liked;
    this.setState({ movies: moviesCopy });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    if (count === 0) {
      return <p>No movies in the database.</p>;
    }

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <main className="container">
        <div className="row">
          <div className="col-sm-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col-sm-9">
            <h1>Movie rental app</h1>
            <p>Available movies: {filtered.length}.</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}
