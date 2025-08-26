import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import MovieDetails from './MovieDetails';
import movieDetailsSlice from './movieDetailsSlice';

const mockStore = configureStore([]);
const { openMovieDetails } = movieDetailsSlice.actions;

describe('MovieDetails Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders the MovieDetails component correctly with item prop', () => {
    const item = {
      poster_path: '/path/to/poster.jpg',
      title: 'Inception',
      vote_average: 8.8,
      genres: ['Action', 'Sci-Fi'],
      release_date: '2010-07-16',
      runtime: 148,
      overview: 'A mind-bending journey through dreams.',
    };

    render(
      <Provider store={store}>
        <MovieDetails item={item} />
      </Provider>,
    );

    expect(screen.getByRole('img', { name: /inception movie poster/i })).toHaveAttribute('src', '/path/to/poster.jpg');
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('148min')).toBeInTheDocument();
    expect(screen.getByText('A mind-bending journey through dreams.')).toBeInTheDocument();
  });

  it('dispatches openMovieDetails with null when close button is clicked', () => {
    const item = {
      poster_path: '/path/to/poster.jpg',
      title: 'Inception',
    };

    render(
      <Provider store={store}>
        <MovieDetails item={item} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('link', { name: /close movie details/i }));

    expect(store.dispatch).toHaveBeenCalledWith(openMovieDetails(null));
  });

  it('handles missing data gracefully', () => {
    const item = {
      title: 'Unknown Movie',
    };

    render(
      <Provider store={store}>
        <MovieDetails item={item} />
      </Provider>,
    );

    expect(screen.getByText('Unknown Movie')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeNull();
  });
});
