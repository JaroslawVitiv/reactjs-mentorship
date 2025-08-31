import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'react-router-dom';
import SearchForm from './SearchForm';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe('SearchForm', () => {
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render and initialize with an empty search value', () => {
    render(<SearchForm />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');
  });

  test('should initialize with a search value from URL parameters', () => {
    useSearchParams.mockReturnValue([
      new URLSearchParams('search=test%20movie'),
      mockSetSearchParams,
    ]);
    render(<SearchForm />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');
    expect(searchInput.value).toBe('test movie');
  });

  test('should update input value on user typing', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');
    await user.type(searchInput, 'Inception');
    expect(searchInput.value).toBe('Inception');
  });

  test('should call setSearchParams with correct values on form submission', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchInput, 'Interstellar');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled();
    });

    const expectedSearchParams = new URLSearchParams();
    expectedSearchParams.set('searchBy', 'title');
    expectedSearchParams.set('search', 'Interstellar');

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = mockSetSearchParams.mock.calls[0][0];
    const newParams = updateFunction(new URLSearchParams());
    expect(newParams.get('searchBy')).toBe('title');
    expect(newParams.get('search')).toBe('Interstellar');
  });
});
