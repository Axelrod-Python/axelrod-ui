import * as React from 'react';
import { Link } from 'react-router-dom';

import Display from './display';

const Navbar = () => (
  <div className="navbar__container" >
    <div id="navbar__inner-container">
      <div className="navbar__link">
        <i className="material-icons">home</i>
        <Link to="/">
        <span>home</span>
        </Link>
      </div>
      <div className="navbar__link">
        <i className="material-icons">info</i>
        <Link to="/about">about</Link>
      </div>
      <div className="navbar__link">
        <i className="material-icons">description</i>
        <a href="https://axelrod.readthedocs.io/en/latest/">docs</a>
      </div>
      <div className="navbar__link">
        <a href="https://github.com/erik-sn/axelrod-ui">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="github"
            height="30px"
          />
        </a>
      </div>
    </div>
    <Display />
  </div>
);

export default Navbar;
