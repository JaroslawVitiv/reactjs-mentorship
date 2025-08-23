import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { within, userEvent } from '@storybook/test';
import MovieForm from './MovieForm';

const MockGenreDropdown = ({ item, getGenres }) => (
  <div style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
    Mock Genre Dropdown
  </div>
);

const MockSuccessMessage = ({ type }) => (
  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '5px' }}>
    <h2 style={{ color: '#2e7d32' }}>Success!</h2>
    <p>Movie {type} successfully.</p>
  </div>
);

const mockModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    submitModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

const mockStore = configureStore({
  reducer: {
    modal: mockModalSlice.reducer,
  },
});

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'The movie data to pre-populate the form for editing. Leave empty for "Add" mode.',
    },
  },
};

const Template = (args) => <MovieForm {...args} />;

const SuccessTemplate = (args) => <MockSuccessMessage {...args} />;

const withMockedDependencies = (Story, context) => {
  const { isSuccess = false } = context.args;
  
  if (isSuccess) {
    return <SuccessTemplate />;
  }
  
  return <Story />;
};

const WrapperWithMocks = ({ item }) => {
  const [success, setSuccess] = React.useState(false);
  
  if (success) {
    return <MockSuccessMessage type={item ? 'updated' : 'added'} />;
  }
  
  return (
    <MovieForm 
      item={item} 
      SuccessMessage={MockSuccessMessage}
      GenreDropdown={MockGenreDropdown}
    />
  );
};

export const AddMovieForm = {
  args: {
    item: null,
  },
  render: (args) => <WrapperWithMocks {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.type(canvas.getByLabelText(/Title/i), 'New Action Movie');
    await userEvent.type(canvas.getByLabelText(/Release date/i), '2024-05-15');
    await userEvent.type(canvas.getByLabelText(/Movie URL/i), 'http://example.com/poster.jpg');
    await userEvent.type(canvas.getByLabelText(/Rating/i), '7.5');
    await userEvent.type(canvas.getByLabelText(/Runtime/i), '120');
    await userEvent.type(canvas.getByLabelText(/Overview/i), 'A thrilling new action film.');

    const submitButton = canvas.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
  },
};

export const EditMovieForm = {
  args: {
    item: {
      title: 'The Matrix',
      vote_average: 8.7,
      release_date: '1999-03-31',
      overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
      genres: ['Action', 'Sci-Fi'],
      runtime: 136,
      poster_path: 'https://image.tmdb.org/t/p/w500/f8VjKqf8zC6Hh2L8J6d5y7rG9E8.jpg',
    },
  },
  render: (args) => <WrapperWithMocks {...args} />,
};

export const FormSubmissionSuccess = {
  args: {
    isSuccess: true,
  },
  render: (args) => <MockSuccessMessage type={'added'} />,
};