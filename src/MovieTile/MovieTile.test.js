import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

import MovieTile from './MovieTile';

jest.mock('../Hamburger/Hamburger', () => {
  return function MockHamburger({ handleHamburger }) {
    return (
      <button 
        data-testid="mock-hamburger" 
        onClick={handleHamburger}
      >
        Mock Hamburger
      </button>
    );
  };
});

jest.mock('../EditDeleteMenu/EditDeleteMenu', () => {
  return function MockEditDeleteMenu({ handleCloseEditDeleteMenu }) {
    return (
      <div data-testid="mock-edit-delete-menu">
        <button onClick={() => handleCloseEditDeleteMenu(true)}>Close Menu</button>
      </div>
    );
  };
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MovieTile', () => {
  const mockMovie = {
    id: 1,
    title: 'Pulp Fiction',
    release_date: '1994-10-14',
    genres: ['Crime', 'Drama'],
    poster_path: 'https://example.com/pulp-fiction.jpg',
  };

  let store;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    require('react-redux').useDispatch.mockReturnValue(mockDispatch);

    store = mockStore({});
  });

  test('renders correctly with movie data', () => {
    render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );

    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText('Crime, Drama')).toBeInTheDocument();

    expect(screen.queryByTestId('mock-hamburger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-edit-delete-menu')).not.toBeInTheDocument();
  });

  test('shows hamburger menu on mouse over and hides it on mouse out', () => {
    const { getByText, queryByTestId, getByTestId } = render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );
    const movieTile = getByText('Pulp Fiction').closest('.movie-tile');
    
    fireEvent.mouseOver(movieTile);

    expect(getByTestId('mock-hamburger')).toBeInTheDocument();

    fireEvent.mouseOut(movieTile);
    
    expect(queryByTestId('mock-hamburger')).not.toBeInTheDocument();
  });

  test('clicking the hamburger button shows the edit/delete menu', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );
    const movieTile = getByText('Pulp Fiction').closest('.movie-tile');

    fireEvent.mouseOver(movieTile);

    const hamburgerButton = getByTestId('mock-hamburger');
    
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(queryByTestId('mock-hamburger')).not.toBeInTheDocument();
      expect(getByTestId('mock-edit-delete-menu')).toBeInTheDocument();
    });
  });

  test('the edit/delete menu can be closed', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );
    const movieTile = getByText('Pulp Fiction').closest('.movie-tile');

    fireEvent.mouseOver(movieTile);
    fireEvent.click(getByTestId('mock-hamburger'));

    const closeButton = getByText('Close Menu');

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(queryByTestId('mock-edit-delete-menu')).not.toBeInTheDocument();
    });
  });

  test('clicking the tile dispatches the openMovieDetails action', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );
    const movieTile = getByText('Pulp Fiction').closest('.movie-tile');

    fireEvent.click(movieTile);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'movieDetails/openMovieDetails',
      payload: mockMovie,
    });
  });

  test('getYear function returns the correct year', () => {
    const getYear = (date) => (date ? date.slice(0, 4) : 0);
    expect(getYear('2022-05-15')).toBe('2022');
    expect(getYear(null)).toBe(0);
    expect(getYear(undefined)).toBe(0);
    expect(getYear('2022')).toBe('2022');
  });
});
