

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import companyLogo from "../assets/logo.png";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [departments, setDepartments] = useState({});
  const [hoveredDept, setHoveredDept] = useState(null);

  useEffect(() => {
    const empList = JSON.parse(localStorage.getItem("employees")) || [];
    setTotalEmployees(empList.length);

    const deptMap = {};
    empList.forEach((emp) => {
      const dept = emp.department;
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });

    setDepartments(deptMap);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div style={styles.dashboard}>
      <div style={styles.banner}>
        <img src={companyLogo} alt="Logo" style={styles.logo} />
        <div>
          <h1 style={{ margin: 0 }}>Welcome Back 👋</h1>
          <p style={{ margin: 0 }}>{today}</p>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>📊 Overview</h2>

      <div style={styles.statsContainer}>
        <StatCard title="👨‍💼 Total Employees" count={totalEmployees} style={styles.hoverCard} />
        <StatCard title="🌴 On Leave Today" count={1} style={styles.hoverCard} />
        <StatCard title="✅ Present Employees" count={totalEmployees - 1} style={styles.hoverCard} />
      </div>

      <h3 style={styles.subHeading}>🏢 Department Breakdown</h3>

      <div style={styles.deptCardContainer}>
        {Object.entries(departments).map(([dept, count]) => (
          <div
            key={dept}
            style={{
              ...styles.deptCard,
              ...(hoveredDept === dept ? styles.deptCardHover : {}),
            }}
            onMouseEnter={() => setHoveredDept(dept)}
            onMouseLeave={() => setHoveredDept(null)}
          >
            <h4 style={styles.deptTitle}>📁 {dept}</h4>
            <p style={styles.deptCount}>
              {count} {count === 1 ? "employee" : "employees"}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Dashboard;
const styles = {
  dashboard: {
    padding: "30px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    backgroundColor: "#e2e8f0",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  },
  logo: {
    height: "60px",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#1a202c",
    fontWeight: "600",
    marginBottom: "20px",
  },
  subHeading: {
    fontSize: "20px",
    color: "#2d3748",
    fontWeight: "600",
    marginTop: "40px",
    marginBottom: "20px",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  deptCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  deptCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  deptCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    border: "1px solid #4299e1",
  },
  deptTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#2d3748",
  },
  deptCount: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#007bff",
  },
  hoverCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    flex: "1",
    minWidth: "180px",
    transition: "all 0.3s ease",
  },
};
