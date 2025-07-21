


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
      <h1>Monthly Attendance - July 2025</h1>

      {editingId && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px' }}>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            name="daysPresent"
            type="number"
            value={formData.daysPresent}
            onChange={handleInputChange}
            placeholder="Present"
            required
          />
          <input
            name="daysAbsent"
            type="number"
            value={formData.daysAbsent}
            onChange={handleInputChange}
            placeholder="Absent"
            required
          />
          <input
            name="daysLeave"
            type="number"
            value={formData.daysLeave}
            onChange={handleInputChange}
            placeholder="Leave"
            required
          />
          <button type="submit">Update</button>
        </form>
      )}

      <button
        onClick={exportToPDF}
        style={{
          marginBottom: '15px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        📄 Export PDF
      </button>

      <div ref={tableRef}>
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
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
                <td>
                  {+record.daysPresent + +record.daysAbsent + +record.daysLeave}
                </td>
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
