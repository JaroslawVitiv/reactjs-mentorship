import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieForm from './MovieForm';
import { useDispatch } from 'react-redux';
import modalSlice from '../Modal/modalSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../GenreDropdown/GenreDropdown', () => {
  return function MockGenreDropdown({ item, getGenres }) {
    return <div data-testid="genre-dropdown-mock" onClick={() => getGenres(['Action', 'Drama'])}>Mock Genre Dropdown</div>;
  };
});

jest.mock('../SuccessMessage/SuccessMessage', () => {
  return function MockSuccessMessage({ type }) {
    return <div data-testid="success-message-mock">Success! Movie {type}d</div>;
  };
});

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('MovieForm', () => {
  const mockDispatch = jest.fn();
  const mockSubmitModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    modalSlice.actions.submitModal = mockSubmitModal;
  });

  it('should render the form with "Add movie" title for new movie', () => {
    render(<MovieForm item={null} />);
    expect(screen.getByText('Add movie')).toBeInTheDocument();
  });

  it('should render the form with "Edit movie" title for existing movie', () => {
    const mockMovie = { title: 'The Matrix' };
    render(<MovieForm item={mockMovie} />);
    expect(screen.getByText('Edit movie')).toBeInTheDocument();
  });

  it('should pre-populate the form with movie data when `item` is provided', () => {
    const mockMovie = {
      title: 'The Matrix',
      release_date: '1999-03-31',
      poster_path: 'url-to-poster',
      vote_average: 8.7,
      runtime: 136,
      overview: 'A hacker learns the truth about reality.'
    };
    render(<MovieForm item={mockMovie} />);

    expect(screen.getByLabelText(/Title/i)).toHaveValue('The Matrix');
    expect(screen.getByLabelText(/Release date/i)).toHaveValue('1999-03-31');
    expect(screen.getByLabelText(/Movie URL/i)).toHaveValue('url-to-poster');
    expect(screen.getByLabelText(/Rating/i)).toHaveValue('8.7');
    expect(screen.getByLabelText(/Runtime/i)).toHaveValue('136');
    expect(screen.getByLabelText(/Overview/i)).toHaveValue('A hacker learns the truth about reality.');
  });

  it('should update state on input change', () => {
    render(<MovieForm item={null} />);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'New Movie Title' } });
    expect(titleInput).toHaveValue('New Movie Title');
  });

  it('should reset the form to empty values when "Reset" is clicked for a new movie', () => {
    render(<MovieForm item={null} />);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'Some Title' } });
    expect(titleInput).toHaveValue('Some Title');

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(titleInput).toHaveValue('');
  });

  it('should reset the form to original values when "Reset" is clicked for an existing movie', () => {
    const mockMovie = { title: 'The Matrix' };
    render(<MovieForm item={mockMovie} />);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'Edited Title' } });
    expect(titleInput).toHaveValue('Edited Title');

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(titleInput).toHaveValue('The Matrix');
  });

  it('should make a POST request on submit for a new movie', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    render(<MovieForm item={null} />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
    });
  });

  it('should make a PUT request on submit for an existing movie', async () => {
    const mockMovie = { id: 1, title: 'The Matrix' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockMovie, title: 'The Matrix Reloaded' }),
    });

    render(<MovieForm item={mockMovie} />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/movies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
    });
  });

  it('should display success message and dispatch on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });
    
    render(<MovieForm item={null} />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockSubmitModal).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('success-message-mock')).toBeInTheDocument();
    });
  });

  it('should handle API errors and display a status message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });

    render(<MovieForm item={null} />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error: Server error/i)).toBeInTheDocument();
    });
  });
});
