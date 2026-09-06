import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
          <Link to='/'>
           <img src={logo} alt="Logo" style={{ height: 50 }} />
          </Link>
        </div>
    );
};

export default Logo;