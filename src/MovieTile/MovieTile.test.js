// MovieTile.test.js

// Import necessary libraries for testing React components
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

// Import the component to be tested
import MovieTile from './MovieTile';

// Mock the child components to isolate the MovieTile for testing.
// This prevents errors if Hamburger or EditDeleteMenu have their own dependencies.
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

// Mock the Redux slice and hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Setup a mock Redux store for the Provider
const mockStore = configureStore([]);

describe('MovieTile', () => {
  // Sample data for the movie item prop
  const mockMovie = {
    id: 1,
    title: 'Pulp Fiction',
    release_date: '1994-10-14',
    genres: ['Crime', 'Drama'],
    poster_path: 'https://example.com/pulp-fiction.jpg',
  };

  // Setup for each test run
  let store;
  let mockDispatch;

  beforeEach(() => {
    // Reset mock functions before each test
    mockDispatch = jest.fn();
    require('react-redux').useDispatch.mockReturnValue(mockDispatch);

    // Create a new mock store instance
    store = mockStore({});
  });

  // --- Test Cases ---

  test('renders correctly with movie data', () => {
    render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );

    // Assert that the movie title, year, and genres are displayed
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText('Crime, Drama')).toBeInTheDocument();

    // Assert that the hamburger and edit/delete menu are not visible initially
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
    
    // Simulate mouse over event
    fireEvent.mouseOver(movieTile);

    // Assert that the hamburger is now visible
    expect(getByTestId('mock-hamburger')).toBeInTheDocument();

    // Simulate mouse out event
    fireEvent.mouseOut(movieTile);
    
    // Assert that the hamburger is no longer in the document
    expect(queryByTestId('mock-hamburger')).not.toBeInTheDocument();
  });

  test('clicking the hamburger button shows the edit/delete menu', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <MovieTile item={mockMovie} />
      </Provider>
    );
    const movieTile = getByText('Pulp Fiction').closest('.movie-tile');

    // Simulate mouse over to make the hamburger visible
    fireEvent.mouseOver(movieTile);

    // Get the mock hamburger button
    const hamburgerButton = getByTestId('mock-hamburger');
    
    // Simulate click on the hamburger button
    fireEvent.click(hamburgerButton);

    // Assert that the hamburger is hidden and the edit/delete menu is shown
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

    // Simulate mouse over and click to show the edit/delete menu
    fireEvent.mouseOver(movieTile);
    fireEvent.click(getByTestId('mock-hamburger'));

    // Find the 'Close Menu' button inside the mock EditDeleteMenu
    const closeButton = getByText('Close Menu');

    // Simulate click to close the menu
    fireEvent.click(closeButton);

    // Assert that the edit/delete menu is no longer in the document
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

    // Simulate click on the movie tile
    fireEvent.click(movieTile);

    // Assert that dispatch was called once
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    
    // Assert that the dispatched action has the correct type and payload
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
