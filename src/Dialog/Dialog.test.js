// Dialog.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dialog from './Dialog';

// Mock the nested components and the FontAwesomeIcon to isolate the Dialog component.
jest.mock('../MovieForm/MovieForm', () => {
  return function MockMovieForm({ item }) {
    return <div data-testid="movie-form-mock">MovieForm Component</div>;
  };
});

jest.mock('../Delete/Delete', () => {
  return function MockDelete({ item }) {
    return <div data-testid="delete-mock">Delete Component</div>;
  };
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="close-icon">Close Icon</span>,
}));

describe('Dialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Clear mock calls before each test to prevent test pollution
    mockOnClose.mockClear();
  });

  // Test Case 1: The dialog should not render when isOpen is false.
  it('should not render when isOpen is false', () => {
    const { container } = render(<Dialog isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  // Test Case 2: The dialog should render when isOpen is true.
  it('should render when isOpen is true', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // Test Case 3: The MovieForm component should render for a new movie.
  it('should render MovieForm for adding a new movie', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'add' }} />);
    expect(screen.getByTestId('movie-form-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-mock')).toBeNull();
  });

  // Test Case 4: The MovieForm component should render for editing an existing movie.
  it('should render MovieForm for editing a movie', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'edit' }} />);
    expect(screen.getByTestId('movie-form-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-mock')).toBeNull();
  });

  // Test Case 5: The Delete component should render when the operation is 'delete'.
  it('should render Delete component when operation is "delete"', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'delete' }} />);
    expect(screen.getByTestId('delete-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-form-mock')).toBeNull();
  });

  // Test Case 6: The onClose function should be called when the close button is clicked.
  it('should call onClose when the close button is clicked', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByTestId('close-icon').closest('a');
    
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});