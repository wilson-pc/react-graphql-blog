import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth/action';

export default function NavBar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function logoutClick() {
    dispatch(logout());
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to={{ pathname: '/' }}>
          Posts
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to={{ pathname: '/' }}
              >
                Home
              </Link>
            </li>
          </ul>

          {auth ? (
            <ul className='navbar-nav justify-content-end '>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {auth?.user.email}
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={{ pathname: '/my-posts' }}
                    >
                      My posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={{ pathname: '/create-post' }}
                    >
                      Create post
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='dropdown-item'
                      to={{ pathname: '/update-user' }}
                    >
                      Update user
                    </Link>
                  </li>
                  <li>
                    <a className='dropdown-item' onClick={logoutClick}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav justify-content-end '>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to={{
                    pathname: '/register',
                  }}
                >
                  Registrarse
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to={{
                    pathname: '/login',
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
