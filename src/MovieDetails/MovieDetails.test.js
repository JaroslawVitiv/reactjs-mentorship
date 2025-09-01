import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from './MovieDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockMovie = {
  id: 1,
  title: 'Pulp Fiction',
  vote_average: 8.9,
  genres: ['Crime', 'Drama'],
  release_date: '1994-05-21',
  runtime: 154,
  overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  poster_path: 'https://image.tmdb.org/t/p/w500/d5iY7E5y0eB5q30Fq9o3n9L9tQ5.jpg',
};

describe('MovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ movieId: '1' });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovie),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render "Loading..." initially and then movie details after successful fetch', async () => {
    render(<MovieDetails />);
    
    expect(screen.getByText('Loading movie details...')).toBeInTheDocument();

    const movieTitleElement = await screen.findByText(mockMovie.title);

    expect(movieTitleElement).toBeInTheDocument();

    expect(screen.getByText(mockMovie.vote_average)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres.join(', '))).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.runtime}min`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    
    const posterImage = screen.getByAltText(`${mockMovie.title} movie poster`);
    expect(posterImage).toHaveAttribute('src', mockMovie.poster_path);
  });

  test('should not call fetch if movieId is not present in params', () => {
    useParams.mockReturnValue({ movieId: undefined });
    render(<MovieDetails />);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText('Loading movie details...')).toBeInTheDocument();
  });
  
  test('should handle a failed fetch and remain in loading state', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      })
    );
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<MovieDetails />);
    
    await waitFor(() => {
      expect(screen.getByText('Loading movie details...')).toBeInTheDocument();
      expect(screen.queryByText(mockMovie.title)).toBeNull();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Could not fetch movie details:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });

  test('should call navigate to "/" when the close button is clicked', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    render(<MovieDetails />);
    
    await screen.findByText(mockMovie.title);

    const closeButton = screen.getByRole('link', { name: 'Close movie details' });
    
    fireEvent.click(closeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
