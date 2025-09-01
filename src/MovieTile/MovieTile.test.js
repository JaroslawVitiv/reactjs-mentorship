import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieTile from './MovieTile';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../Hamburger/Hamburger', () => ({ handleHamburger }) => (
  <div data-testid="hamburger-mock" onClick={handleHamburger}>
    Hamburger
  </div>
));
jest.mock('../EditDeleteMenu/EditDeleteMenu', () => ({ handleCloseEditDeleteMenu }) => (
  <div data-testid="edit-delete-menu-mock" onClick={() => handleCloseEditDeleteMenu(true)}>
    EditDeleteMenu
  </div>
));

const mockItem = {
  id: 1,
  title: 'Test Movie',
  release_date: '2020-10-26T00:00:00.000Z',
  genres: ['Comedy', 'Drama'],
  poster_path: 'http://example.com/poster.jpg',
};

describe('MovieTile', () => {
  test('renders with correct movie details', () => {
    render(
      <Router>
        <MovieTile item={mockItem} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /Test Movie/i });
    expect(linkElement).toHaveAttribute('href', '/movie/1');

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Comedy, Drama')).toBeInTheDocument();
  });

  test('changes opacity and shows hamburger on mouse over', () => {
    render(
      <Router>
        <MovieTile item={mockItem} />
      </Router>
    );

    const movieTile = screen.getByText('Test Movie').closest('.movie-tile');
    const backgroundDiv = movieTile.querySelector('div[style*="background-image"]');
    
    expect(backgroundDiv).toHaveStyle('opacity: 1');
    expect(screen.queryByTestId('hamburger-mock')).toBeNull();

    fireEvent.mouseOver(movieTile);

    expect(backgroundDiv).toHaveStyle('opacity: 0.5');
    expect(screen.getByTestId('hamburger-mock')).toBeInTheDocument();
  });

  test('reverts opacity and hides hamburger on mouse out', () => {
    render(
      <Router>
        <MovieTile item={mockItem} />
      </Router>
    );

    const movieTile = screen.getByText('Test Movie').closest('.movie-tile');
    const backgroundDiv = movieTile.querySelector('div[style*="background-image"]');

    fireEvent.mouseOver(movieTile);
    fireEvent.mouseOut(movieTile);

    expect(backgroundDiv).toHaveStyle('opacity: 1');
    expect(screen.queryByTestId('hamburger-mock')).toBeNull();
  });

  test('hides hamburger and shows edit/delete menu on hamburger click', () => {
    render(
      <Router>
        <MovieTile item={mockItem} />
      </Router>
    );

    const movieTile = screen.getByText('Test Movie').closest('.movie-tile');
    fireEvent.mouseOver(movieTile);
    
    const hamburger = screen.getByTestId('hamburger-mock');
    fireEvent.click(hamburger);

    expect(screen.queryByTestId('hamburger-mock')).toBeNull();
    expect(screen.getByTestId('edit-delete-menu-mock')).toBeInTheDocument();
  });

  test('hides edit/delete menu when close handler is called', () => {
    render(
      <Router>
        <MovieTile item={mockItem} />
      </Router>
    );

    const movieTile = screen.getByText('Test Movie').closest('.movie-tile');
    fireEvent.mouseOver(movieTile);
    fireEvent.click(screen.getByTestId('hamburger-mock'));
    
    const editDeleteMenu = screen.getByTestId('edit-delete-menu-mock');
    fireEvent.click(editDeleteMenu);

    expect(screen.queryByTestId('edit-delete-menu-mock')).toBeNull();
  });
});
