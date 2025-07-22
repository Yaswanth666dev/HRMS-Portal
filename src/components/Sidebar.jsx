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
    { path: '/salary', label: 'Payroll Sheet', icon: <FaMoneyCheckAlt /> },
      { path: '/holidays', label: 'Holidays', icon: <span>📅</span> },
        { path: '/announcements', label: 'Announcements', icon: <FaBullhorn /> }, // ⬅️ Added
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.title}>
        <FaBriefcase style={{ marginRight: '8px',color:"black" }} />
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
<div style={styles.profileContainer}>
  <span style={styles.avatar}>👤</span>
  <div>
    <div style={styles.name}>Yaswanth</div>
    <div style={styles.role}>HR Admin</div>
  </div>
  <span style={styles.logoutIcon} title="Logout">🚪</span>
</div>


    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    // backgroundColor: '#2f4050',
    // backgroundColor:"#1e303fff",
        background: "linear-gradient(145deg, #e2e8f0, #f8fafc)",
    
      
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
    color: '#000000',
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
    color: '#000000',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px', 
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
profileContainer: {
  marginTop: 'auto',
  marginBottom: '15px', 
  padding: '15px 20px',
  backgroundColor: '#1c2938',
  borderTop: '1px solid #2a3b4d',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
},


  avatar: {
    fontSize: '24px',
  },
  name: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  role: {
    fontSize: '12px',
    color: '#cfd8dc',
  },
  logoutIcon: {
    fontSize: '20px',
    color: '#e53e3e',
    marginLeft: 'auto',
    cursor: 'pointer',
  },

};


export default Sidebar;
