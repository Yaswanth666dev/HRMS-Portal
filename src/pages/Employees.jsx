

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

      // 🔄 Update name in salaries
      const salaries = JSON.parse(localStorage.getItem('salaries')) || [];
      const updatedSalaries = salaries.map(s =>
        s.employeeId === editId ? { ...s, name: formData.name } : s
      );
      localStorage.setItem('salaries', JSON.stringify(updatedSalaries));

      // 🔄 Update name in attendance
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

  return (
    <div style={{ padding: '30px' }}>
      <h1>Employee Management</h1>

      <form onSubmit={handleSubmit} className="employee-form" style={{ marginBottom: '20px' }}>
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
        <button type="submit">{editId ? 'Update Employee' : 'Add Employee'}</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', background: '#fff' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
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
                <button onClick={() => handleEdit(emp)} style={{ marginRight: '8px' }}>Edit</button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{ background: '#f44336', color: 'white' }}
                >
                  Delete
                </button>
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
