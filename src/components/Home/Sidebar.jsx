import { useState } from "react";
import { FaCheckCircle, FaClock, FaExclamationCircle, FaList, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <h1 className={`sidebar-title ${!isOpen && "hidden"}`}>TaskPilot</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
          {isOpen ? "⏪" : "⏩"}
        </button>
      </div>
      <nav>
        <ul className="sidebar-menu">
          <li className="sidebar-item" onClick={() => setFilter("completed")}>
            <FaCheckCircle /> <span className={!isOpen && "hidden"}>Complete</span>
          </li>
          <li className="sidebar-item" onClick={() => setFilter("pending")}>
            <FaClock /> <span className={!isOpen && "hidden"}>Pending</span>
          </li>
          <li className="sidebar-item" onClick={() => setFilter("important")}>
            <FaExclamationCircle /> <span className={!isOpen && "hidden"}>Important</span>
          </li>
          <li className="sidebar-item" onClick={() => setFilter("all")}>
            <FaList /> <span className={!isOpen && "hidden"}>All Tasks</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
