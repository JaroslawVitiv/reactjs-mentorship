import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import modalSlice from '../Modal/modalSlice';
import { MemoryRouter } from 'react-router-dom';


jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useMatch: jest.fn(),
}));

jest.mock('../SearchForm/SearchForm', () => ({ searchMovies }) => (
  <div data-testid="search-form">
    <button onClick={() => searchMovies('test query')}>Search Button</button>
  </div>
));

jest.mock('../MovieDetails/MovieDetails', () => () => (
  <div data-testid="movie-details">Movie Details</div>
));

describe('Header component', () => {
  let dispatchMock;
  let searchMovieMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    searchMovieMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo link', () => {
    useMatch.mockReturnValue(null); 
    render(
      <MemoryRouter>
        <Header searchMovie={searchMovieMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/netflix/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /netflix roulette/i }))
  });

  test('renders add movie button and search form when not on movie route', () => {
    useMatch.mockReturnValue(null); // Not on movie route
    render(
      <MemoryRouter>
        <Header searchMovie={searchMovieMock} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /\+ add movie/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  test('dispatches openModal when add movie button clicked', () => {
    useMatch.mockReturnValue(null);
    render(
      <MemoryRouter>
        <Header searchMovie={searchMovieMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ add movie/i }));

    expect(dispatchMock).toHaveBeenCalledWith(modalSlice.actions.openModal(null));
  });

  test('calls searchMovie when SearchForm triggers search', () => {
    useMatch.mockReturnValue(null);
    render(
      <MemoryRouter>
        <Header searchMovie={searchMovieMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/search button/i));

    expect(searchMovieMock).toHaveBeenCalledWith('test query');
  });

  test('renders MovieDetails when on movie route', () => {
    useMatch.mockReturnValue({ params: { movieId: '123' } });
    render(
      <MemoryRouter initialEntries={['/movie/123']}>
        <Header searchMovie={searchMovieMock} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('movie-details')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /\+ add movie/i })).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-form')).not.toBeInTheDocument();
  });
});
