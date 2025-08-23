import React from 'react';
import GenreDropdown from './GenreDropdown';

export default {
  title: 'Components/GenreDropdown',
  component: GenreDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'An object containing the `genres` array to pre-select items.',
    },
    getGenres: {
      action: 'genres selected',
      description: 'A callback function that receives the array of selected genres.',
    },
  },
};

const Template = (args) => <GenreDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: { genres: [] },
};
Default.storyName = 'Empty Dropdown';

export const WithPreselectedGenres = Template.bind({});
WithPreselectedGenres.args = {
  item: {
    genres: ['Drama', 'Action']
  },
};
WithPreselectedGenres.storyName = 'With Pre-selected Genres';

export const ClosedDropdown = Template.bind({});
ClosedDropdown.args = {
  item: { genres: [] },
};
ClosedDropdown.parameters = {
  docs: {
    description: {
      story: 'This story demonstrates the dropdown in its initial, closed state.',
    },
  },
};

export const OpenDropdown = Template.bind({});
OpenDropdown.args = {
  item: { genres: [] },
};
OpenDropdown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dropdownInput = canvas.getByRole('button', { name: /select options/i });
  await userEvent.click(dropdownInput);
};
OpenDropdown.parameters = {
  docs: {
    description: {
      story: 'This story shows the dropdown in its open state, ready for selection.',
    },
  },
};
