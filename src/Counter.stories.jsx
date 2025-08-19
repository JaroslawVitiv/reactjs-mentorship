import React from 'react';
import Counter from './Counter';

export default {
  title: 'Components/Counter',
  component: Counter,
};

export const Default = () => <Counter />;
export const InitialValue = () => <Counter initialValue={10} />;
