// Jest test file: GenreSelect.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GenreSelect from './GenreSelect';

// Mock the SortControl component to isolate the GenreSelect component's behavior
// We only need to check if the props are passed correctly and if the component is rendered.
jest.mock('../SortControl/SortControl', () => (props) => (
  <div data-testid="sort-control">
    {/* Simulate a click on the sort control to test its behavior */}
    <button onClick={() => props.handleSortingBySetting('release_date')}>
      Sort by Date
    </button>
  </div>
));

describe('GenreSelect', () => {
  // Mock the prop functions to check if they are called correctly
  const mockGetCategorySortBy = jest.fn();
  const mockGetCategoryGenres = jest.fn();

  // Helper function to render the component with a router
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

  // Reset mocks before each test to ensure a clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Initial Render and State Tests ---
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

  // --- Genre Selection and Deselection Tests ---
  it('should select a genre and call the prop function with the selected genre', async () => {
    renderComponent();

    // Click on the 'documentary' link
    fireEvent.click(screen.getByText(/documentary/i));

    // Wait for the state to update and the prop function to be called
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['documentary']);
    });

    // Verify that the 'documentary' link is now active
    expect(screen.getByText(/documentary/i)).toHaveClass('active-link');
    // Verify that the 'all' link is now inactive
    expect(screen.getByText(/all/i)).toHaveClass('inactive-link');
  });

  it('should deselect a genre on a second click', async () => {
    renderComponent();

    // Select the 'comedy' genre
    fireEvent.click(screen.getByText(/comedy/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['comedy']);
    });

    // Deselect the 'comedy' genre
    fireEvent.click(screen.getByText(/comedy/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
    });

    // Verify the link is now inactive again
    expect(screen.getByText(/comedy/i)).toHaveClass('inactive-link');
    // Verify the 'all' link is now active again
    expect(screen.getByText(/all/i)).toHaveClass('active-link');
  });

  it('should handle selecting multiple genres', async () => {
    renderComponent();

    // Select 'horror'
    fireEvent.click(screen.getByText(/horror/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['horror']);
    });
    expect(screen.getByText(/horror/i)).toHaveClass('active-link');

    // Select 'crime'
    fireEvent.click(screen.getByText(/crime/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['horror', 'crime']);
    });
    expect(screen.getByText(/crime/i)).toHaveClass('active-link');
  });

  it('should reset genres and activate the "all" link when "all" is clicked', async () => {
    renderComponent();

    // First, select a genre to get out of the initial state
    fireEvent.click(screen.getByText(/drama/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith(['drama']);
    });

    // Now, click the 'all' link
    fireEvent.click(screen.getByText(/all/i));
    await waitFor(() => {
      expect(mockGetCategoryGenres).toHaveBeenCalledWith([]);
    });

    // Verify the 'all' link is active and 'drama' is inactive
    expect(screen.getByText(/all/i)).toHaveClass('active-link');
    expect(screen.getByText(/drama/i)).toHaveClass('inactive-link');
  });

  // --- Sorting Functionality Tests ---
  it('should call the sort prop function when a sorting option is clicked', async () => {
    renderComponent();

    // The mock SortControl has a button that calls the prop function
    const sortButton = screen.getByText('Sort by Date');
    fireEvent.click(sortButton);

    // Since the alert has been removed, we can directly assert the prop call
    expect(mockGetCategorySortBy).toHaveBeenCalledWith('release_date');
  });
});
