

// import React, { useEffect, useState, useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const SalarySheet = () => {
//   const [salaries, setSalaries] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     basic: '',
//     hra: '',
//     bonus: '',
//     deductions: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [filterName, setFilterName] = useState('');
//   const tableRef = useRef();

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('salaries')) || [];
//     const empList = JSON.parse(localStorage.getItem('employees')) || [];
//     setSalaries(saved);
//     setEmployees(empList);
//   }, []);

//   const saveToLocal = (data) => {
//     localStorage.setItem('salaries', JSON.stringify(data));
//     setSalaries(data);
//   };

//   const getEmployeeName = (record) => {
//     const emp = employees.find((e) => e.id === +record.employeeId);
//     return emp ? emp.name : null;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newEntry = {
//       id: editingId || Date.now(),
//       employeeId: +formData.employeeId,
//       basic: +formData.basic,
//       hra: +formData.hra,
//       bonus: +formData.bonus,
//       deductions: +formData.deductions,
//       total: +formData.basic + +formData.hra + +formData.bonus - +formData.deductions,
//     };

//     let updated;
//     if (editingId) {
//       updated = salaries.map((s) => (s.id === editingId ? newEntry : s));
//       setEditingId(null);
//     } else {
//       updated = [...salaries, newEntry];
//     }

//     saveToLocal(updated);
//     setFormData({
//       employeeId: '',
//       basic: '',
//       hra: '',
//       bonus: '',
//       deductions: '',
//     });
//   };

//   const handleEdit = (salary) => {
//     setFormData({
//       employeeId: salary.employeeId,
//       basic: salary.basic,
//       hra: salary.hra,
//       bonus: salary.bonus,
//       deductions: salary.deductions,
//     });
//     setEditingId(salary.id);
//   };

//   const handleDelete = (id) => {
//     const updated = salaries.filter((s) => s.id !== id);
//     saveToLocal(updated);
//   };

//   const exportToPDF = () => {
//     html2canvas(tableRef.current).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('landscape');
//       pdf.addImage(imgData, 'PNG', 10, 10);
//       pdf.save('salary-sheet.pdf');
//     });
//   };

//   const exportToCSV = () => {
//     const csv = [
//       ['Name', 'Basic', 'HRA', 'Bonus', 'Deductions', 'Total'],
//       ...filteredSalaries.map((s) => [
//         getEmployeeName(s),
//         s.basic,
//         s.hra,
//         s.bonus,
//         s.deductions,
//         s.total,
//       ]),
//     ]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'salary-sheet.csv';
//     link.click();
//   };

//   const filteredSalaries = salaries
//     .filter((s) => employees.some((e) => e.id === +s.employeeId)) // ensure only valid employee
//     .filter((s) =>
//       getEmployeeName(s)?.toLowerCase().includes(filterName.toLowerCase())
//     );

//   return (
//     <div style={{ padding: '30px' }}>
//       <h1>Salary Sheet</h1>

//       <form onSubmit={handleSubmit} className="salary-form">
//         <select
//           name="employeeId"
//           value={formData.employeeId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp.id} value={emp.id}>
//               {emp.name}
//             </option>
//           ))}
//         </select>

//         <input
//           name="basic"
//           type="number"
//           placeholder="Basic"
//           value={formData.basic}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="hra"
//           type="number"
//           placeholder="HRA"
//           value={formData.hra}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="bonus"
//           type="number"
//           placeholder="Bonus"
//           value={formData.bonus}
//           onChange={handleChange}
//         />
//         <input
//           name="deductions"
//           type="number"
//           placeholder="Deductions"
//           value={formData.deductions}
//           onChange={handleChange}
//         />
//         <button type="submit">{editingId ? 'Update Salary' : 'Add Salary'}</button>
//       </form>

//       <div style={{ marginTop: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={filterName}
//           onChange={(e) => setFilterName(e.target.value)}
//           style={{ padding: '6px', marginBottom: '10px' }}
//         />
//         <button
//           onClick={exportToCSV}
//           style={{
//             marginLeft: '10px',
//             backgroundColor: '#343a40',
             
//             color: '#fff',
//             border: 'none',
//             padding: '8px 14px',
//             borderRadius: '5px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           Export CSV
//         </button>
//       </div>

//       <div ref={tableRef}>
//         <table border="1" cellPadding="8" cellSpacing="0" width="100%">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Basic</th>
//               <th>HRA</th>
//               <th>Bonus</th>
//               <th>Deductions</th>
//               <th>Total Salary</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSalaries.map((sal) => (
//               <tr key={sal.id}>
//                 <td>{getEmployeeName(sal)}</td>
//                 <td>₹{sal.basic}</td>
//                 <td>₹{sal.hra}</td>
//                 <td>₹{sal.bonus}</td>
//                 <td>₹{sal.deductions}</td>
//                 <td>
//                   <strong>₹{sal.total}</strong>
//                 </td>
//                 <td>
//                   <button onClick={() => handleEdit(sal)} style={{ marginRight: '5px' }}>
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(sal.id)}
//                     style={{ background: '#f44336', color: 'white' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredSalaries.length === 0 && (
//               <tr>
//                 <td colSpan="7">No records found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ marginTop: '20px', textAlign: 'right' }}>
//         <button
//           onClick={exportToPDF}
//           style={{
//             backgroundColor: '#343a40',
//             color: '#fff',
//             border: 'none',
//             padding: '10px 18px',
//             borderRadius: '5px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📄 Export PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SalarySheet;


import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SalarySheet = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    basic: '',
    hra: '',
    bonus: '',
    deductions: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [filterName, setFilterName] = useState('');
  const tableRef = useRef();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('salaries')) || [];
    const empList = JSON.parse(localStorage.getItem('employees')) || [];
    setSalaries(saved);
    setEmployees(empList);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem('salaries', JSON.stringify(data));
    setSalaries(data);
  };

  const getEmployeeName = (record) => {
    const emp = employees.find((e) => e.id === +record.employeeId);
    return emp ? emp.name : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: editingId || Date.now(),
      employeeId: +formData.employeeId,
      basic: +formData.basic,
      hra: +formData.hra,
      bonus: +formData.bonus,
      deductions: +formData.deductions,
      total: +formData.basic + +formData.hra + +formData.bonus - +formData.deductions,
    };

    let updated;
    if (editingId) {
      updated = salaries.map((s) => (s.id === editingId ? newEntry : s));
      setEditingId(null);
    } else {
      updated = [...salaries, newEntry];
    }

    saveToLocal(updated);
    setFormData({
      employeeId: '',
      basic: '',
      hra: '',
      bonus: '',
      deductions: '',
    });
  };

  const handleEdit = (salary) => {
    setFormData({
      employeeId: salary.employeeId,
      basic: salary.basic,
      hra: salary.hra,
      bonus: salary.bonus,
      deductions: salary.deductions,
    });
    setEditingId(salary.id);
  };

  const handleDelete = (id) => {
    const updated = salaries.filter((s) => s.id !== id);
    saveToLocal(updated);
  };

  const exportToPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('salary-sheet.pdf');
    });
  };

  const exportToCSV = () => {
    const csv = [
      ['Name', 'Basic', 'HRA', 'Bonus', 'Deductions', 'Total'],
      ...filteredSalaries.map((s) => [
        getEmployeeName(s),
        s.basic,
        s.hra,
        s.bonus,
        s.deductions,
        s.total,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'salary-sheet.csv';
    link.click();
  };

  const filteredSalaries = salaries
    .filter((s) => employees.some((e) => e.id === +s.employeeId))
    .filter((s) =>
      getEmployeeName(s)?.toLowerCase().includes(filterName.toLowerCase())
    );

  return (
    <div style={{ padding: '30px' }}>
      <style>{`
        .salary-table {
          width: 100%;
          border-collapse: collapse;
        }

        .salary-table thead {
          background-color: #343a40;
          color: white;
        }

        .salary-table th, .salary-table td {
          padding: 12px;
          text-align: left;
        }

        .salary-table tbody tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .salary-table tbody tr:nth-child(odd) {
          background-color: #ffffff;
        }

        .salary-table tbody tr:hover {
          background-color: #e0e0e0;
        }

        .salary-form input,
        .salary-form select,
        .salary-form button {
          margin-right: 10px;
          padding: 8px;
        }

        .salary-form button {
          background-color: #343a40;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .salary-form button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <h1>Salary Sheet</h1>

      <form onSubmit={handleSubmit} className="salary-form">
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          name="basic"
          type="number"
          placeholder="Basic"
          value={formData.basic}
          onChange={handleChange}
          required
        />
        <input
          name="hra"
          type="number"
          placeholder="HRA"
          value={formData.hra}
          onChange={handleChange}
          required
        />
        <input
          name="bonus"
          type="number"
          placeholder="Bonus"
          value={formData.bonus}
          onChange={handleChange}
        />
        <input
          name="deductions"
          type="number"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update Salary' : 'Add Salary'}</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ padding: '6px', marginBottom: '10px' }}
        />
        <button
          onClick={exportToCSV}
          style={{
            marginLeft: '10px',
            backgroundColor: '#343a40',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Export CSV
        </button>
      </div>

      <div ref={tableRef}>
        <table className="salary-table" border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Basic</th>
              <th>HRA</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Total Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((sal) => (
              <tr key={sal.id}>
                <td>{getEmployeeName(sal)}</td>
                <td>₹{sal.basic}</td>
                <td>₹{sal.hra}</td>
                <td>₹{sal.bonus}</td>
                <td>₹{sal.deductions}</td>
                <td><strong>₹{sal.total}</strong></td>
                <td>
                  <button onClick={() => handleEdit(sal)} style={{ marginRight: '5px' }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sal.id)}
                    style={{ background: '#f44336', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredSalaries.length === 0 && (
              <tr>
                <td colSpan="7">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button
          onClick={exportToPDF}
          style={{
            backgroundColor: '#343a40',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📄 Export PDF
        </button>
      </div>
    </div>
  );
};

export default SalarySheet;
