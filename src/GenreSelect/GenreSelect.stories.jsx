import React from 'react';
import GenreSelect from './GenreSelect';
import { BrowserRouter as Router } from 'react-router-dom';
import { fn } from 'storybook/test';
import './GenreSelect.css';

export default {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

const Template = (args) => <GenreSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  getCategorySortBy: fn(),
  getCategoryGenres: fn()
};
