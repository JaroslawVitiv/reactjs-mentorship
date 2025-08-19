import React from 'react';
import SearchForm from './SearchForm';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
};

export const Default = () => (
  <SearchForm findSearchBy={(searchBy) => alert(`Searching for: ${searchBy}`)} />
);
