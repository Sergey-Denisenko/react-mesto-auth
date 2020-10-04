import React from 'react';
import headerPath from '../images/Vector_white.svg';

function Header({routePathName, routePath}) {
  return (
    <header className="header">
      <img className="header__logo" src={headerPath} alt="Логотип"/>
      <div className="header__auth">
        <a className="header__auth_link" href={routePath}>{routePathName}</a>
      </div>
    </header>
  );
}

export default Header;
