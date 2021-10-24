import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../Contexts/loginContext';
import LogOut from './LogOut';

export default function Header() {
  const { data } = useLoginContext();

  return (
    <nav className="nav-bar">
      <div className="logo">donateKaro</div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        {/* <Link to="/">
          {' '}
          <li>Our Products</li>
        </Link> */}
        {/* <li>About Us</li>
        <li>Contact</li> */}
        {data?.id && (
          <Link to="/profile/products">
            <li>Profile</li>
          </Link>
        )}
        {data?.id ? (
          <li style={{ cursor: 'pointer' }}>
            <LogOut />
          </li>
        ) : (
          <Link to="/login-signup">
            <li>Login/SignUp</li>
          </Link>
        )}
      </ul>
      <div className="search">
        <i className="fa fa-search"></i>
        <i className="fa fa-shopping-basket"></i>
      </div>
    </nav>
  );
}
