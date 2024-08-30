import { useContext } from 'react';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
// import './NavBar.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar-custom">
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/" className="nav-link">
                <i className="bx bxs-home bx-sm"></i>
                <span className="ms-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/songs/" className="nav-link">
                <i className="bx bxs-music bx-sm"></i>
                <span className="ms-2">Songs</span>
              </Link>
            </li>
            <li>
              <Link to="/songs/new/" className="nav-link">
                <i className="bx bxs-plus-square bx-sm"></i>
                <span className="ms-2">Add new song</span>
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout} className="nav-link">
                <i className="bx bxs-log-out bx-sm"></i>
                <span className="ms-2">Sign out</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="nav-link">
                <i className="bx bxs-log-in bx-sm"></i>
                <span className="ms-2">Log in</span>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">
                <i className="bx bxs-user-plus bx-sm"></i>
                <span className="ms-2">Sign up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar