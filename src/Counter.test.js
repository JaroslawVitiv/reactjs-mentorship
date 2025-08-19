import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';
import '@testing-library/jest-dom';

describe('Counter Component', () => {
  test('renders with initial value of 0 when no prop is provided', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders with the initial value provided via props', () => {
    const initialValue = 5;
    render(<Counter initialValue={initialValue} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('increments the value when the "+" button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('+');
    
    fireEvent.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
    
    fireEvent.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('decrements the value when the "-" button is clicked', () => {
    render(<Counter initialValue={3} />);
    const decrementButton = screen.getByText('-');
    
    fireEvent.click(decrementButton);

    expect(screen.getByText('2')).toBeInTheDocument();
    
    fireEvent.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('buttons for increment and decrement are rendered', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
  });
});
