import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from './SearchForm';

const mockFindSearchBy = jest.fn();

describe('SearchForm Component', () => {
  test('renders the input field and search button', () => {
    render(<SearchForm findSearchBy={mockFindSearchBy} />);
    
    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates the input value when the user types', () => {
    render(<SearchForm findSearchBy={mockFindSearchBy} />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');

    fireEvent.change(searchInput, { target: { value: 'The Matrix' } });

    expect(searchInput.value).toBe('The Matrix');
  });

  test('calls the findSearchBy prop with the correct input value on button click', () => {
    render(<SearchForm findSearchBy={mockFindSearchBy} />);
    const searchInput = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    
    fireEvent.click(searchButton);

    expect(mockFindSearchBy).toHaveBeenCalledTimes(1);
    
    expect(mockFindSearchBy).toHaveBeenCalledWith('Inception');
  });

  test('calls the findSearchBy prop with an empty string when the input is empty', () => {
    render(<SearchForm findSearchBy={mockFindSearchBy} />);
    const searchButton = screen.getByRole('button', { name: /search/i });

    mockFindSearchBy.mockClear();

    fireEvent.click(searchButton);

    expect(mockFindSearchBy).toHaveBeenCalledWith('');
  });
});
