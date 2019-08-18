import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

export default class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => {
      return m._id !== movie._id;
    });
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return <p>No movies in the database.</p>;
    }
    return (
      <React.Fragment>
        <h1>Movie inventory</h1>
        <p>Available movies: {count}.</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
