


import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedDept, setSelectedDept] = useState('');
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
      const exists = savedAttendance.some((record) => record.employeeId === emp.id);
      if (!exists) {
        const totalDays = 26;
        const daysPresent = Math.floor(Math.random() * 10) + 15;
        const daysLeave = Math.floor(Math.random() * 3);
        const daysAbsent = totalDays - daysPresent - daysLeave;

        updatedAttendance.push({
          id: Date.now() + Math.random(),
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

  const filteredData = selectedDept
    ? attendanceData.filter((r) => {
        const emp = employees.find((e) => e.id === r.employeeId);
        return emp?.department === selectedDept;
      })
    : attendanceData;

  const totalPresent = filteredData.reduce((sum, r) => sum + Number(r.daysPresent), 0);
  const totalAbsent = filteredData.reduce((sum, r) => sum + Number(r.daysAbsent), 0);
  const totalLeave = filteredData.reduce((sum, r) => sum + Number(r.daysLeave), 0);

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

        .attendance-summary {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .summary-card {
          flex: 1 1 200px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .summary-card h4 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .summary-card p {
          margin-top: 10px;
          font-size: 22px;
          font-weight: bold;
        }

        .summary-card.present { background: #e0f7fa; }
        .summary-card.absent { background: #ffebee; }
        .summary-card.leave { background: #fff8e1; }
      `}</style>

      <h1>Monthly Attendance - July 2025</h1>

      {/* Department Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
  <label htmlFor="departmentFilter" style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
    Filter by Department:
  </label>
  <select
    id="departmentFilter"
    value={selectedDept}
    onChange={(e) => setSelectedDept(e.target.value)}
    style={{
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      outline: 'none',
      minWidth: '200px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'border-color 0.3s ease',
    }}
  >
    <option value="">All Departments</option>
    {[...new Set(employees.map(e => e.department))].map(dept => (
      <option key={dept} value={dept}>{dept}</option>
    ))}
  </select>
</div>

      {/* Summary Cards */}
      <div className="attendance-summary">
        <div className="summary-card present">
          <h4>🟢 Present Days</h4>
          <p>{totalPresent}</p>
        </div>
        <div className="summary-card absent">
          <h4>🔴 Absent Days</h4>
          <p>{totalAbsent}</p>
        </div>
        <div className="summary-card leave">
          <h4>🟡 Leave Days</h4>
          <p>{totalLeave}</p>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportToPDF}
        style={{
          padding: '10px 16px',
          background: '#343a40',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          marginBottom: '15px',
          cursor: 'pointer',
        }}
      >
        Export to PDF
      </button>

      {/* Table */}
      <div ref={tableRef}>
        <table className="employee-table" border="1" cellPadding="8" cellSpacing="0">
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
            {filteredData.map((record) => (
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
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
