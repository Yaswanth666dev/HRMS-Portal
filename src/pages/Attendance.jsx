


import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    daysPresent: '',
    daysAbsent: '',
    daysLeave: '',
  });

  const tableRef = useRef();
useEffect(() => {
  const savedAttendance = JSON.parse(localStorage.getItem('attendance')) || [];
  const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

  const updatedAttendance = [...savedAttendance];

  savedEmployees.forEach((emp) => {
    const alreadyExists = savedAttendance.some((record) => record.employeeId === emp.id);
    if (!alreadyExists) {
      const totalDays = 26; // Working days in month
      const daysPresent = Math.floor(Math.random() * 10) + 15; // 15–24
      const daysLeave = Math.floor(Math.random() * 3);         // 0–2
      const daysAbsent = totalDays - daysPresent - daysLeave;  // Fill remaining

      updatedAttendance.push({
        id: Date.now() + Math.random(), // Unique ID
        employeeId: emp.id,
        daysPresent,
        daysAbsent: Math.max(0, daysAbsent),
        daysLeave,
      });
    }
  });

  setEmployees(savedEmployees);
  setAttendanceData(updatedAttendance);
  localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
}, []);


  const saveToLocal = (data) => {
    localStorage.setItem('attendance', JSON.stringify(data));
    setAttendanceData(data);
  };

  const handleEditClick = (record) => {
    setEditingId(record.id);
    setFormData({
      employeeId: record.employeeId,
      daysPresent: record.daysPresent,
      daysAbsent: record.daysAbsent,
      daysLeave: record.daysLeave,
    });
  };

  const handleDelete = (id) => {
    const updated = attendanceData.filter((emp) => emp.id !== id);
    saveToLocal(updated);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = attendanceData.map((att) =>
      att.id === editingId
        ? { ...att, ...formData, id: editingId, employeeId: +formData.employeeId }
        : att
    );
    saveToLocal(updated);
    setEditingId(null);
    setFormData({ employeeId: '', daysPresent: '', daysAbsent: '', daysLeave: '' });
  };

  const exportToPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('attendance-sheet.pdf');
    });
  };

  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e.id === +id);
    return emp ? emp.name : 'Unknown';
  };

  return (
  <div style={{ padding: '30px' }}>
  <style>{`
    .employee-table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .employee-table th, .employee-table td {
      padding: 12px 16px;
      text-align: left;
    }

    .employee-table thead {
      background-color: #343a40;
      color: white;
    }

    .employee-table tbody tr:nth-child(odd) {
      background-color: #e6f0ff;
    }

    .employee-table tbody tr:nth-child(even) {
      background-color: #ffffff;
    }

    .employee-table tbody tr:hover {
      background-color: #f1f1f1;
    }
  `}</style>

  <h1>Monthly Attendance - July 2025</h1>

  {/* ...form and buttons... */}

  <div ref={tableRef}>
    <table className="employee-table" border="1" cellPadding="8" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Present</th>
          <th title="Absent = Did not attend without approved leave">Absent 🛈</th>
          <th title="Leave = Approved time off like sick/casual leave">Leave 🛈</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record) => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{getEmployeeName(record.employeeId)}</td>
            <td>{record.daysPresent}</td>
            <td>{record.daysAbsent}</td>
            <td>{record.daysLeave}</td>
            <td>{+record.daysPresent + +record.daysAbsent + +record.daysLeave}</td>
            <td>
              <button onClick={() => handleEditClick(record)} style={{ marginRight: '5px' }}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(record.id)}
                style={{ background: '#f44336', color: '#fff' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {attendanceData.length === 0 && (
          <tr>
            <td colSpan="7">No records found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Attendance;
