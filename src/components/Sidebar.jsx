import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaMoneyCheckAlt,
    FaBullhorn,   
  FaBriefcase,
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/employees', label: 'Employees', icon: <FaUsers /> },
    { path: '/attendance', label: 'Attendance', icon: <FaCalendarCheck /> },
    { path: '/salary', label: 'Salary Sheet', icon: <FaMoneyCheckAlt /> },
      { path: '/holidays', label: 'Holidays', icon: <span>📅</span> },
        { path: '/announcements', label: 'Announcements', icon: <FaBullhorn /> }, // ⬅️ Added
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.title}>
        <FaBriefcase style={{ marginRight: '8px' }} />
        HRMS Portal
      </div>
      <nav style={styles.nav}>
  {menuItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      style={{
        ...styles.link,
        ...(location.pathname === item.path ? styles.active : {}),
      }}
    >
      <span style={styles.icon}>{item.icon}</span>
      {item.label}
    </Link>
  ))}
</nav>

    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    // backgroundColor: '#2f4050',
    backgroundColor:"#1e303fff",
    
      
    color: '#fff',
    padding: '20px 0',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '20px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#cfd8dc',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px', // ⬅️ Add space between each link
    transition: '0.3s',
  },
  icon: {
    fontSize: '18px',
  },
  active: {
    backgroundColor: '#1c2938',
    color: '#ffffff',
    fontWeight: 'bold',
  },
};


export default Sidebar;
