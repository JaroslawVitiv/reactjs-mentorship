import './Hamburger.css';

function Hamburger({ handleHamburger }) {

  const click = (isClicked) => {
    handleHamburger(isClicked);
  }

  return (  
    <>
      <div 
        className='menu-hamburger' 
        onClick={() => click(true)} 
      >
        <div className='first-dot' />
        <div className='second-dot' />
        <div className='third-dot' />
      </div>
    </>
  );
}

export default Hamburger;
