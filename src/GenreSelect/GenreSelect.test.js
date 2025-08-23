import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GenreSelect from './GenreSelect';

jest.mock('../SortControl/SortControl', () => (props) => (
  <div data-testid="sort-control">
    <button onClick={() => props.handleSortingBySetting('release_date')}>
      Sort by Date
    </button>
  </div>
));

describe('GenreSelect', () => {
  const mockGetCategorySortBy = jest.fn();
  const mockGetCategoryGenres = jest.fn();

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <GenreSelect
          getCategorySortBy={mockGetCategorySortBy}
          getCategoryGenres={mockGetCategoryGenres}
        />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component and all genre links', () => {
    renderComponent();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/documentary/i)).toBeInTheDocument();
    expect(screen.getByText(/comedy/i)).toBeInTheDocument();
    expect(screen.getByText(/horror/i)).toBeInTheDocument();
    expect(screen.getByText(/crime/i)).toBeInTheDocument();
    expect(screen.getByText(/drama/i)).toBeInTheDocument();
    expect(screen.getByTestId('sort-control')).toBeInTheDocument();
  });

  it('should have the "all" link as active by default', () => {
    renderComponent();
    expect(screen.getByText(/all/i)).toHaveClass('active-link');
  });

  it('should have all other genre links as inactive by default', () => {
    renderComponent();
    expect(screen.getByText(/documentary/i)).toHaveClass('inactive-link');
    expect(screen.getByText(/comedy/i)).toHaveClass('inactive-link');
    expect(screen.getByText(/horror/i)).toHaveClass('inactive-link');
    expect(screen.getByText(/crime/i)).toHaveClass('inactive-link');
    expect(screen.getByText(/drama/i)).toHaveClass('inactive-link');
  });

  it('should select a genre and call the prop function with the selected genre', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/documentary/i));

    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['documentary']);
    });

    expect(screen.getByText(/documentary/i)).toHaveClass('active-link');
    expect(screen.getByText(/all/i)).toHaveClass('inactive-link');
  });

  it('should deselect a genre on a second click', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/comedy/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['comedy']);
    });

    fireEvent.click(screen.getByText(/comedy/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
    });

    expect(screen.getByText(/comedy/i)).toHaveClass('inactive-link');
    expect(screen.getByText(/all/i)).toHaveClass('active-link');
  });

  it('should handle selecting multiple genres', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/horror/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['horror']);
    });
    expect(screen.getByText(/horror/i)).toHaveClass('active-link');

    fireEvent.click(screen.getByText(/crime/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['horror', 'crime']);
    });
    expect(screen.getByText(/crime/i)).toHaveClass('active-link');
  });

  it('should reset genres and activate the "all" link when "all" is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/drama/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['drama']);
    });

    fireEvent.click(screen.getByText(/all/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
    });

    expect(screen.getByText(/all/i)).toHaveClass('active-link');
    expect(screen.getByText(/drama/i)).toHaveClass('inactive-link');
  });

  it('should call the sort prop function when a sorting option is clicked', async () => {
    renderComponent();

    const sortButton = screen.getByText('Sort by Date');
    fireEvent.click(sortButton);

    expect(mockGetCategorySortBy).toHaveBeenCalledWith('release_date');
  });
});
