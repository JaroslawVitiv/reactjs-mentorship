import './Hamburger.css';
import React from 'react';

interface HamburgerProps {
  handleHamburger: (isClicked: boolean) => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ handleHamburger }) => {
  const click = (isClicked: boolean) => {
    handleHamburger(isClicked);
  };

  return (
    <div
      className="menu-hamburger"
      onClick={() => click(true)}
    >
      <div className="first-dot" />
      <div className="second-dot" />
      <div className="third-dot" />
    </div>
  );
};

export default Hamburger;
