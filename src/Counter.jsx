import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue || 0,
    };
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    return React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
      React.createElement('h1', null, this.state.value),
      React.createElement(
        'button',
        { onClick: this.handleDecrement },
        '-'
      ),
      React.createElement(
        'button',
        { onClick: this.handleIncrement },
        '+'
      )
    );
  }
}

export default Counter;