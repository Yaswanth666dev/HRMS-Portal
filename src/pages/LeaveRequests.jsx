import React, { useEffect, useState } from 'react';

const LeaveRequests = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    reason: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const savedLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
    setEmployees(savedEmployees);
    setLeaves(savedLeaves);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = employees.find(emp => emp.id.toString() === formData.employeeId);
    const newLeave = {
      id: Date.now(),
      name: employee.name,
      reason: formData.reason,
      from: formData.from,
      to: formData.to,
    };

    const updatedLeaves = [...leaves, newLeave];
    setLeaves(updatedLeaves);
    localStorage.setItem('leaves', JSON.stringify(updatedLeaves));
    setFormData({ employeeId: '', reason: '', from: '', to: '' });
  };

  return (
    <div>
      <h1>Leave Request (Admin-Filled)</h1>

      <form onSubmit={handleSubmit} className="leave-form">
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <input
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <input
          name="from"
          type="date"
          value={formData.from}
          onChange={handleChange}
          required
        />
        <input
          name="to"
          type="date"
          value={formData.to}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Leave</button>
      </form>

      <h2>Submitted Leaves</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.name}</td>
              <td>{leave.reason}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
