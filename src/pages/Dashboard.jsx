import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import companyLogo from "../assets/logo.png";
import DepartmentChart from "../components/DepartmentChart";
import GenderChart from "../components/GenderChart";


const upcomingActivities = [
  { id: 1, title: "Quarterly Team Review", date: "2025-07-25", time: "10:00 AM" },
  { id: 2, title: "Hackathon Day", date: "2025-07-30", time: "2:00 PM" },
  { id: 3, title: "Wellness Webinar", date: "2025-08-02", time: "4:00 PM" },
];

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [departments, setDepartments] = useState({});
  const [hoveredDept, setHoveredDept] = useState(null);
  const [genderData, setGenderData] = useState({});

  useEffect(() => {
    const empList = JSON.parse(localStorage.getItem("employees")) || [];
    setTotalEmployees(empList.length);

    const deptMap = {};
    const genderMap = {};

    empList.forEach((emp) => {
      const dept = emp.department;
      deptMap[dept] = (deptMap[dept] || 0) + 1;

      const gender = emp.gender || "Other";
      genderMap[gender] = (genderMap[gender] || 0) + 1;
    });

    setDepartments(deptMap);
    setGenderData(genderMap);
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

 
      <h3 style={styles.subHeading}>📅 Upcoming Activities</h3>
      <div style={styles.activitiesContainer}>
        {upcomingActivities.map((activity) => (
          <div key={activity.id} style={styles.activityCard}>
            <h4 style={styles.activityTitle}>{activity.title}</h4>
            <p style={styles.activityMeta}>
              📆 {activity.date} | 🕒 {activity.time}
            </p>
          </div>
        ))}
      </div>

      <DepartmentChart data={departments} />

      {Object.keys(genderData).length > 0 ? (
        <>
          {/* <h3 style={styles.subHeading}>📈 Gender Chart</h3>
          <GenderChart data={genderData} /> */}
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "30px" }}>No gender data available.</p>
      )}
    </div>
  );
};

export default Dashboard;



const styles = {
  dashboard: {
    padding: "2rem",
    background: "linear-gradient(145deg, #e2e8f0, #f8fafc)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(12px)",
    padding: "25px 30px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    marginBottom: "40px",
  },
  logo: {
    height: "60px",
    borderRadius: "10px",
  },
  sectionTitle: {
    fontSize: "28px",
    color: "#1a202c",
    fontWeight: "700",
    marginBottom: "20px",
    borderBottom: "2px solid #3182ce",
    display: "inline-block",
    paddingBottom: "4px",
    letterSpacing: "0.5px",
  },
  subHeading: {
    fontSize: "22px",
    color: "#2d3748",
    fontWeight: "600",
    marginTop: "50px",
    marginBottom: "20px",
    borderLeft: "4px solid #63b3ed",
    paddingLeft: "12px",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  hoverCard: {
    background: "linear-gradient(to right, #ffffff, #f0f4f8)",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "8px 8px 15px #d1d9e6, -8px -8px 15px #ffffff",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  deptCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  deptCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
  },
  deptCardHover: {
    transform: "scale(1.05)",
    border: "1px solid #3182ce",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  },
  deptTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#2c5282",
  },
  deptCount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2b6cb0",
  },
  activitiesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "60px",
  },
activityCard: {
  background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
  padding: "20px 24px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
  borderLeft: "6px solid #4299e1",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
},
activityTitle: {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#2c5282",
  display: "flex",
  alignItems: "center",
  gap: "8px",
},
activityMeta: {
  fontSize: "14px",
  color: "#4a5568",
},
activityCardHover: {
  transform: "translateY(-3px)",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
},

  divider: {
    marginTop: "60px",
    marginBottom: "40px",
    borderTop: "1px dashed #a0aec0",
  },
  addButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#3182ce",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: "30px",
    fontWeight: "600",
    boxShadow: "0 6px 20px rgba(49, 130, 206, 0.4)",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  addButtonHover: {
    backgroundColor: "#2b6cb0",
  },
};
