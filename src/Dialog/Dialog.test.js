import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dialog from './Dialog';

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
    mockOnClose.mockClear();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<Dialog isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render MovieForm for adding a new movie', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'add' }} />);
    expect(screen.getByTestId('movie-form-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-mock')).toBeNull();
  });

  it('should render MovieForm for editing a movie', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'edit' }} />);
    expect(screen.getByTestId('movie-form-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-mock')).toBeNull();
  });

  it('should render Delete component when operation is "delete"', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} item={{ operation: 'delete' }} />);
    expect(screen.getByTestId('delete-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('movie-form-mock')).toBeNull();
  });

  it('should call onClose when the close button is clicked', () => {
    render(<Dialog isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByTestId('close-icon').closest('a');
    
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
