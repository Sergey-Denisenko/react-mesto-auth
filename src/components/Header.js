import React from 'react';
import headerPath from '../images/Vector_white.svg';
import { Link } from 'react-router-dom';
import menuIconPath from '../images/menu-icon.png';

function Header({routePathName, routePath, emailUser, loggedIn, onSignOut}) {

  return (
    loggedIn === true ? (
      <header className="header">
        <div className="header__auth">
          <img className="header__auth_menu-icon" src={menuIconPath} alt="Menu Icon" />
          <p className="header__auth_email-user header__auth_email-user_visible">{emailUser}</p>
          <button onClick={onSignOut} className="header__auth_link header__auth_link-exit header__auth_link_visible" href={routePath}>{routePathName}</button>
        </div>
        <img className="header__logo" src={headerPath} alt="Логотип"/>
        <div className="header__auth">
          <img className="header__auth_menu-icon" src={menuIconPath} alt="Menu Icon" />
          <p className="header__auth_email-user header__auth_email-user_visible">{emailUser}</p>
          <button onClick={onSignOut} className="header__auth_link header__auth_link-exit header__auth_link_visible" href={routePath}>{routePathName}</button>
        </div>

      </header>
    ) : (
      <header className="header">
        <img className="header__logo" src={headerPath} alt="Логотип"/>
        <div className="header__auth">
          <Link to={routePath} className="header__auth_link">{routePathName}</Link>
        </div>
      </header>
    )
  );
}

export default Header;


// import React from 'react';
// import headerPath from '../images/Vector_white.svg';
// import { Link } from 'react-router-dom';

// function Header({routePathName, routePath, emailUser, loggedIn, onSignOut}) {

//   return (
//     loggedIn === true ? (
//       <header className="header">
//         <img className="header__logo" src={headerPath} alt="Логотип"/>
//         <div className="header__auth">
//           <p className="header__auth_email-user">{emailUser}</p>
//           <button onClick={onSignOut} className="header__auth_link header__auth_link-exit" href={routePath}>{routePathName}</button>
//         </div>
//       </header>
//     ) : (
//       <header className="header">
//         <img className="header__logo" src={headerPath} alt="Логотип"/>
//         <div className="header__auth">
//           <Link to={routePath} className="header__auth_link">{routePathName}</Link>
//         </div>
//       </header>
//     )
//   );
// }

// export default Header;