import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FiBell,
  FiChevronDown,
  FiMenu,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../components/Dashboard/Sidebar"
import useRole from "../Hooks/useRole";
import Logo from "../components/Logo/Logo";

const DashboardLayout = () => {
  const {user, signOutUser} = useAuth();
  const {role} = useRole();
  const navigate = useNavigate();

  const logOut = () =>{
    signOutUser()
    .then(()=>{
      navigate('/');
    })
    .catch()
  }

  return (
    <div className="zip-dashboard">
      <input id="dashboard-drawer" type="checkbox" className="zip-dashboard-toggle" />
      <aside className="zip-dashboard-side">
        <div className="zip-dashboard-brand"><Logo target="_blank" /></div>
        <Sidebar />
      </aside>
      <label htmlFor="dashboard-drawer" aria-label="Close dashboard menu" className="zip-dashboard-overlay" />

      <div className="zip-dashboard-main">
        <header className="zip-dashboard-header flex justify-between">
          <label htmlFor="dashboard-drawer" className="zip-dashboard-menu" aria-label="Toggle dashboard menu">
            <FiMenu size={19} />
          </label>
          <div className="zip-dashboard-actions">
            <button className="zip-dashboard-icon-button" aria-label="Notifications" type="button">
              <FiBell size={17} />
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="zip-dashboard-profile">
                <div className="zip-dashboard-avatar">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" />
                  ) : (
                    <span aria-hidden="true">{user?.displayName?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </div>
                <span className="zip-dashboard-user">
                  <strong>{user?.displayName}</strong>
                  <span>
                    {
                      role === 'admin' ?  'Admin' :  role === 'rider' ? 'Rider' : 'Customer'
                    }
                  </span>
                </span>
                <FiChevronDown className="zip-dashboard-chevron" size={15} />
              </div>
              <ul tabIndex={0} className="dropdown-content menu zip-dashboard-dropdown">
                <li>
                  <NavLink to='/dashboard/profile'>
                    <FiUser size={16} />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <a onClick={logOut} className="zip-logout">
                    <FiLogOut size={16} />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="zip-dashboard-content">
          <div className="zip-dashboard-page">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;