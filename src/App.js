// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import Employees from './pages/Employees';
// // import LeaveRequests from './pages/LeaveRequests';
// import Attendance from './pages/Attendance';
// import SalarySheet from './pages/SalarySheet';

// const App = () => {
//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="main-content">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/employees" element={<Employees />} />
//             {/* <Route path="/leaves" element={<LeaveRequests />} /> */}
//              <Route path="/attendance" element={<Attendance />} />
//               <Route path="/salary" element={<SalarySheet />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import SalarySheet from './pages/SalarySheet';
import Holidays from './pages/Holidays';
import Announcements from './pages/Announcements';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/salary" element={<SalarySheet />} />
            <Route path="/holidays" element={<Holidays />} />
            
<Route path="/announcements" element={<Announcements />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
