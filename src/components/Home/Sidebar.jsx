import { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaExclamationCircle, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import Auth from "./Auth";

const Sidebar = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // Load user from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <h1 className={`sidebar-title ${isOpen ? "" : "hidden"}`}>TaskPilot</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
            {isOpen ? "⏪" : "⏩"}
          </button>
        </div>

        <nav>
          <ul className="sidebar-menu">
            <li className="sidebar-item" onClick={() => setFilter("completed")}>
              <FaCheckCircle /> <span className={isOpen ? "" : "hidden"}>Complete</span>
            </li>
            <li className="sidebar-item" onClick={() => setFilter("pending")}>
              <FaClock /> <span className={isOpen ? "" : "hidden"}>Pending</span>
            </li>
            <li className="sidebar-item" onClick={() => setFilter("important")}>
              <FaExclamationCircle /> <span className={isOpen ? "" : "hidden"}>Important</span>
            </li>
            <li className="sidebar-item" onClick={() => setFilter("all")}>
              <FaList /> <span className={isOpen ? "" : "hidden"}>All Tasks</span>
            </li>
          </ul>
        </nav>

        {/* Auth Button */}
        <div className="auth-section">
          {user ? (
            <button className="auth-button" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className={isOpen ? "" : "hidden"}>Log Out</span>
            </button>
          ) : (
            <button className="auth-button" onClick={() => setShowAuth(true)}>
              <FaUser />
              <span className={isOpen ? "" : "hidden"}>Sign In / Sign Up</span>
            </button>
          )}
        </div>
      </div>

      {/* Show Auth Modal when clicked */}
      {showAuth && <Auth setUser={setUser} setShowAuth={setShowAuth} />}
    </>
  );
};

export default Sidebar;
