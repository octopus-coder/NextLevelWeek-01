import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Collect" />
        </header>

        <main>
          <h1>Your marketplace of residue collection</h1>
          <p>
            We help people to find residue collection points efficiently.
          </p>
          <Link to="/create-point">
            <span>
              <FiLogIn/>
            </span>
            <strong>Register a Collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;