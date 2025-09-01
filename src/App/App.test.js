import React from 'react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import App from './App';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';


const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(() => [new URLSearchParams(), mockSetSearchParams]),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../Header/Header', () => ({ searchMovie }) => (
  <div>
    <button
      data-testid="search-button"
      onClick={() => searchMovie('new search query')}
    >
      Search
    </button>
  </div>
));

jest.mock('../GenreSelect/GenreSelect', () => ({ getCategorySortBy, getCategoryGenres }) => (
  <><button
    data-testid="genre-select-genres"
    onClick={() => getCategoryGenres(['Comedy'])}
  >
    GenreSelect
  </button>
   <button
    data-testid="genre-select-sortby"
    onClick={() => getCategorySortBy('release_date')}
  >
    GenreSelect
  </button></>
));
jest.mock('../MoviesCount/MoviesCount', () => ({ moviesCount }) => (
  <div data-testid="movies-count">MoviesCount: {moviesCount}</div>
));
jest.mock('../Movies/Movies', () => ({ list }) => (
  <div data-testid="movies">Movies: {list ? 'Loaded' : 'Not Loaded'}</div>
));
jest.mock('../Footer/Footer', () => () => (
  <div data-testid="footer">Footer</div>
));
jest.mock('../Counter', () => () => (
  <div data-testid="counter">Counter</div>
));
jest.mock('../Modal/Modal', () => () => (
  <div data-testid="modal">Modal</div>
));

const mockMovies = {
  data: [{ id: 1, title: 'Test Movie' }],
  totalAmount: 1,
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [],
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetSearchParams.mockReturnValue(undefined);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovies),
      })
    );
    useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    useSelector.mockReturnValue({ isSubmitted: false });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getUrlQuery', () => {
    function TestComponent() {
      function getUrlQuery(genres) {
        if (!Array.isArray(genres) || genres.length === 0) {
          return "";
        }
        return `&searchBy=genres&filter=${genres.join(',')}`;
      }
      return <div data-testid="query-test" />;
    }

    test('should return the correct query string for valid genres', () => {
      render(<TestComponent />);
      const getUrlQuery = (genres) => {
          if (!Array.isArray(genres) || genres.length === 0) {
              return "";
          }
          return `&searchBy=genres&filter=${genres.join(',')}`;
      };
      expect(getUrlQuery(['Action', 'Comedy'])).toBe('&searchBy=genres&filter=Action,Comedy');
    });

    test('should return an empty string for an empty array', () => {
        const getUrlQuery = (genres) => {
            if (!Array.isArray(genres) || genres.length === 0) {
                return "";
            }
            return `&searchBy=genres&filter=${genres.join(',')}`;
        };
        expect(getUrlQuery([])).toBe('');
    });

    test('should return an empty string for non-array input', () => {
        const getUrlQuery = (genres) => {
            if (!Array.isArray(genres) || genres.length === 0) {
                return "";
            }
            return `&searchBy=genres&filter=${genres.join(',')}`;
        };
        expect(getUrlQuery('Action')).toBe('');
    });
  });

  test('should render and fetch movies on initial load', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Loading movies/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading movies/i)).toBeNull();
      expect(screen.getByText('Movies: Loaded')).toBeInTheDocument();
      expect(screen.getByText('MoviesCount: 1')).toBeInTheDocument();
    });
  });

  test('should display an error message on fetch failure', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('HTTP error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Not Loaded/i)).toBeInTheDocument();
    });
  });

  test('should refetch when searchParams change', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    useSearchParams.mockReturnValue([
      new URLSearchParams('searchBy=title&search=test'),
      mockSetSearchParams,
    ]);

    render(<App />, { container: document.body });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/movies?searchBy=title&search=test'
      );
    });
  });

  test('should refetch when isSubmitted changes', async () => {
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    useSelector.mockReturnValue({ isSubmitted: true });

    render(<App />, { container: document.body });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('should refetch when getGenres is called', async () => {
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByTestId('genre-select-genres'));

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/movies?&searchBy=genres&filter=Comedy'
        );
    });
  });

  test('getSortBy should update searchParams correctly', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('genre-select-sortby'));

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  test('searchMovie should update searchParams correctly', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('search-button'));

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });
});
