import React from 'react';
import Dialog from './Dialog';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/test';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const MockMovieForm = ({ item }) => (
  <div style={{ padding: '20px', border: '1px solid lightgray', borderRadius: '5px' }}>
    <h3>Mock Movie Form</h3>
    <p>Editing movie: {item?.title || 'New Movie'}</p>
    <p>This is a placeholder for the actual MovieForm component.</p>
  </div>
);

const MockDelete = ({ item }) => (
  <div style={{ padding: '20px', border: '1px solid lightgray', borderRadius: '5px' }}>
    <h3>Mock Delete Confirmation</h3>
    <p>Are you sure you want to delete movie: <strong>{item?.title}</strong>?</p>
  </div>
);

const DialogWrapper = ({ item, ...args }) => {
  const content = item?.operation === 'delete' ? <MockDelete item={item} /> : <MockMovieForm item={item} />;
  
  if (!args.isOpen) {
    return null;
  }
  
  return (
    <div className="modal">
      <a onClick={args.onClose}>
        <span><FontAwesomeIcon icon={faClose} /></span>
      </a>
      {content}
    </div>
  );
};

export default {
  title: 'Components/Dialog',
  component: Dialog,
  render: (args) => <DialogWrapper {...args} />,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the dialog.',
    },
    item: {
      control: 'object',
      description: 'The data object passed to the nested component (MovieForm or Delete).',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback function when the dialog is closed.',
    },
  },
};

export const Closed = {
  args: {
    isOpen: false,
    item: {},
  },
};

export const AddMovie = {
  args: {
    isOpen: true,
    item: {
      operation: 'add'
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = canvas.getByRole('button');
    await userEvent.click(closeButton);
  },
};

export const EditMovie = {
  args: {
    isOpen: true,
    item: {
      operation: 'edit',
      title: 'The Matrix',
      genres: ['Action', 'Sci-Fi'],
      releaseDate: '1999-03-31'
    },
  },
};

export const DeleteMovie = {
  args: {
    isOpen: true,
    item: {
      operation: 'delete',
      title: 'The Matrix',
    },
  },
};
