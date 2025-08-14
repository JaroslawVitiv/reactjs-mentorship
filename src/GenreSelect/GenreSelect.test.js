import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TextEncoder, TextDecoder } from 'util';
import GenreSelect from './GenreSelect'; // Adjust the import path as needed

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

beforeAll(() => {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
});

describe('GenreSelect', () => {
  const mockGetCategorySortBy = jest.fn();
  const mockGetCategoryGenres = jest.fn();

  test('renders with default genre "all" active and "title" as default sort', () => {
    renderWithRouter(
      <GenreSelect
        getCategorySortBy={mockGetCategorySortBy}
        getCategoryGenres={mockGetCategoryGenres}
      />
    );

    const allLink = screen.getByRole('link', { name: /all/i });
    expect(allLink).toHaveClass('active-link');
    
    const documentaryLink = screen.getByRole('link', { name: /documentary/i });
    expect(documentaryLink).toHaveClass('inactive-link');

    const sortByDisplay = screen.getByText(/title/i);
    expect(sortByDisplay).toBeInTheDocument();
  });

  test('toggles the sort-by dropdown when clicked', () => {
    renderWithRouter(
      <GenreSelect
        getCategorySortBy={mockGetCategorySortBy}
        getCategoryGenres={mockGetCategoryGenres}
      />
    );

    const dropdownButton = screen.getByText('sort by');
    fireEvent.click(dropdownButton);

    expect(screen.getByText(/vote count/i)).toBeInTheDocument();
    expect(screen.getByText(/release date/i)).toBeInTheDocument();
    
    fireEvent.click(dropdownButton);

    expect(screen.queryByText(/vote count/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/release date/i)).not.toBeInTheDocument();
  });

  test('selects and deselects a genre correctly', () => {
    renderWithRouter(
      <GenreSelect
        getCategorySortBy={mockGetCategorySortBy}
        getCategoryGenres={mockGetCategoryGenres}
      />
    );

    const comedyLink = screen.getByRole('link', { name: /comedy/i });
    const allLink = screen.getByRole('link', { name: /all/i });

    expect(comedyLink).toHaveClass('inactive-link');
    expect(allLink).toHaveClass('active-link');
    
    fireEvent.click(comedyLink);

    expect(comedyLink).toHaveClass('active-link');
    expect(allLink).toHaveClass('inactive-link');
    expect(mockGetCategoryGenres).toHaveBeenCalledWith(['comedy']);

    fireEvent.click(comedyLink);

    expect(comedyLink).toHaveClass('inactive-link');
    expect(allLink).toHaveClass('active-link'); // "all" should be active again because genres are now empty
    expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
  });

  test('handles "all" genre selection to clear genres', () => {
    renderWithRouter(
      <GenreSelect
        getCategorySortBy={mockGetCategorySortBy}
        getCategoryGenres={mockGetCategoryGenres}
      />
    );
    
    const comedyLink = screen.getByRole('link', { name: /comedy/i });
    const allLink = screen.getByRole('link', { name: /all/i });

    fireEvent.click(comedyLink);
    expect(mockGetCategoryGenres).toHaveBeenCalledWith(['comedy']);
    
    fireEvent.click(allLink);
    
    expect(allLink).toHaveClass('active-link');
    expect(comedyLink).toHaveClass('inactive-link');
    expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
  });

  test('handles sort-by option selection', () => {
    renderWithRouter(
      <GenreSelect
        getCategorySortBy={mockGetCategorySortBy}
        getCategoryGenres={mockGetCategoryGenres}
      />
    );

    const dropdownButton = screen.getByText('sort by');
    fireEvent.click(dropdownButton); // Open dropdown

    const voteCountOption = screen.getByText(/vote count/i);
    fireEvent.click(voteCountOption); // Select "vote count"

    const sortByDisplay = screen.getByText(/vote count/i);
    expect(sortByDisplay).toBeInTheDocument();
    
    expect(mockGetCategorySortBy).toHaveBeenCalledWith('vote_count');

    expect(screen.queryByText(/release date/i)).not.toBeInTheDocument();
  });
});
