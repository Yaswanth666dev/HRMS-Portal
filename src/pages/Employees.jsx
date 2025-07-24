

import React, { useEffect, useState } from 'react';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(savedEmployees);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('employees', JSON.stringify(data));
    setEmployees(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedEmployees = employees.map(emp =>
        emp.id === editId ? { ...emp, ...formData } : emp
      );
      saveToLocalStorage(updatedEmployees);

      const salaries = JSON.parse(localStorage.getItem('salaries')) || [];
      const updatedSalaries = salaries.map(s =>
        s.employeeId === editId ? { ...s, name: formData.name } : s
      );
      localStorage.setItem('salaries', JSON.stringify(updatedSalaries));

      const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
      const updatedAttendance = attendance.map(a =>
        a.employeeId === editId ? { ...a, name: formData.name } : a
      );
      localStorage.setItem('attendance', JSON.stringify(updatedAttendance));

      setEditId(null);
    } else {
      const newEmp = { id: Date.now(), ...formData };
      const updatedList = [...employees, newEmp];
      saveToLocalStorage(updatedList);
    }

    setFormData({ name: '', email: '', department: '' });
  };

  const handleEdit = (emp) => {
    setFormData({ name: emp.name, email: emp.email, department: emp.department });
    setEditId(emp.id);
  };

  const handleDelete = (id) => {
    const updated = employees.filter(emp => emp.id !== id);
    saveToLocalStorage(updated);
  };
const departmentBreakdown = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});

  return (
    <div style={{ padding: '30px' }}>
      <style>{`
        .employee-form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .employee-form input, .employee-form button {
          padding: 10px;
          font-size: 16px;
        }

        .employee-form input {
          flex: 1 1 200px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .employee-form button {
          background-color: #343a40;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .employee-form button:hover {
          background-color: #0056b3;
        }

        .employee-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 10px;
          overflow: hidden;
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

        .action-btn {
          padding: 6px 12px;
          margin-right: 6px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .edit-btn {
          background-color: #28a745;
          color: white;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
<div className="department-summary">
  {Object.entries(departmentBreakdown).map(([dept, count]) => (
    <div key={dept} className="department-card">
      <div className="dept-title">{dept}</div>
      <div className="dept-count">{count} Employee{count > 1 ? 's' : ''}</div>
    </div>
  ))}
</div>



      <form onSubmit={handleSubmit} className="employee-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
