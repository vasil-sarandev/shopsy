export const BurgerIcon = ({ isActive = false, onClick = () => {} }) => {
  const iconClass = `hamburger${isActive ? ' isActive' : ' '}`
  return (
    <>
      <div className={iconClass} onClick={onClick}>
        <span className='line' />
        <span className='line' />
        <span className='line' />
      </div>
      <style jsx>{`
        .hamburger .line {
          width: 30px;
          height: 3px;
          background-color: var(--font-secondary2);
          display: block;
          margin: 4px auto;
          -webkit-transition: all 0.3s ease-in-out;
          -o-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
        }
        .hamburger.isActive .line {
          background-color: var(--info);
        }
        .hamburger:hover {
          cursor: pointer;
        }

        .hamburger.isActive .line:nth-child(2) {
          opacity: 0;
        }
        .hamburger.isActive .line:nth-child(1) {
          -webkit-transform: translateY(8px) rotate(45deg);
          -ms-transform: translateY(8px) rotate(45deg);
          -o-transform: translateY(8px) rotate(45deg);
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger.isActive .line:nth-child(3) {
          -webkit-transform: translateY(-6px) rotate(-45deg);
          -ms-transform: translateY(-6px) rotate(-45deg);
          -o-transform: translateY(-6px) rotate(-45deg);
          transform: translateY(-6px) rotate(-45deg);
        }
      `}</style>
    </>
  )
}
