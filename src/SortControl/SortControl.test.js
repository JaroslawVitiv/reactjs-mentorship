import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div data-testid="fa-icon"></div>,
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faCaretDown: 'faCaretDown',
}));

describe('SortControl', () => {
  const mockHandleSortingBySetting = jest.fn();

  const defaultProps = {
    handleSortingBySetting: mockHandleSortingBySetting,
    sortBy: 'title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the sort control with the current sortBy value', () => {
    render(<SortControl {...defaultProps} />);
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.sortBy)).toBeInTheDocument();
    expect(screen.queryByText(/release date/i)).not.toBeInTheDocument();
  });

  it('should toggle dropdown visibility when the control is clicked', () => {
    const { rerender } = render(<SortControl {...defaultProps} />);
    
    fireEvent.click(screen.getByText(/sort by/i).closest('li'));

    expect(screen.getAllByText(/title/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/release date/i)[0]).toBeInTheDocument();

    fireEvent.click(screen.getByText(/sort by/i).closest('li'));
    
    expect(screen.queryByText(/release date/i)).not.toBeInTheDocument();
  });

  it('should call handleSortingBySetting with "title" when "title" is clicked', () => {
    render(<SortControl {...defaultProps} />);
    fireEvent.click(screen.getByText(/sort by/i));
    
    fireEvent.click(screen.getAllByText(/title/i)[1]);
    
    expect(mockHandleSortingBySetting).toHaveBeenCalledWith('title');
  });

  it('should call handleSortingBySetting with "release_date" when "release date" is clicked', () => {
    render(<SortControl {...defaultProps} />);
    fireEvent.click(screen.getByText(/sort by/i).closest('li'));
    
    fireEvent.click(screen.getByText(/release date/i));
    
    expect(mockHandleSortingBySetting).toHaveBeenCalledWith('release_date');
  });
});
