// SearchForm.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from './SearchForm';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  const setSearchParamsMock = jest.fn();

  return {
    ...original,
    useSearchParams: () => {
      const urlParams = new URLSearchParams(global.window.location.search);
      return [urlParams, setSearchParamsMock];
    },
    Outlet: () => <div data-testid="mock-outlet">Outlet content</div>,
    __esModule: true,
    __setSearchParamsMock: setSearchParamsMock,
  };
});

describe('SearchForm', () => {
  let setSearchParamsMock;

  beforeEach(() => {
    // Access the mock from the module
    setSearchParamsMock = require('react-router-dom').__setSearchParamsMock;
    jest.clearAllMocks();
    window.history.pushState({}, '', '/'); // reset URL
  });

  test('renders correctly with default values', () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    expect(screen.getByText(/Find your movie/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/What do you want to watch?/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  test('renders with initial search param', () => {
    window.history.pushState({}, '', '/?search=matrix');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/What do you want to watch?/i)).toHaveValue('matrix');
  });

  test('updates input value on typing', async () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/What do you want to watch?/i);
    await userEvent.type(input, 'inception');

    expect(input).toHaveValue('inception');
  });

  test('submits form and updates search params', async () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/What do you want to watch?/i);
    await userEvent.type(input, 'avatar');

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);

    // Check callback behavior
    const callback = setSearchParamsMock.mock.calls[0][0];
    const params = new URLSearchParams();
    const updatedParams = callback(params);

    expect(updatedParams.get('search')).toBe('avatar');
    expect(updatedParams.get('searchBy')).toBe('title');
  });

  test('submitting without typing keeps existing value', async () => {
    window.history.pushState({}, '', '/?search=batman');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);

    const callback = setSearchParamsMock.mock.calls[0][0];
    const params = new URLSearchParams();
    const updatedParams = callback(params);

    expect(updatedParams.get('search')).toBe('batman');
    expect(updatedParams.get('searchBy')).toBe('title');
  });
});
