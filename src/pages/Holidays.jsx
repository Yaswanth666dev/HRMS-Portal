import React from 'react';


const holidays = [
  { date: '2025-01-01', name: 'New Year’s Day' },
  { date: '2025-01-26', name: 'Republic Day' },
  { date: '2025-03-29', name: 'Holi' },
  { date: '2025-04-14', name: 'Ambedkar Jayanti' },
  { date: '2025-05-01', name: 'Labour Day' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-10-02', name: 'Gandhi Jayanti' },
  { date: '2025-10-23', name: 'Dussehra' },
  { date: '2025-11-01', name: 'Diwali' },
  { date: '2025-12-25', name: 'Christmas Day' },
];

const Holidays = () => {
  return (
    <div className="holiday-container">
      <h1 className="holiday-title">📅 Holiday List - 2025</h1>
      <div className="holiday-card">
        <table className="holiday-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday Name</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, idx) => (
              <tr key={idx}>
                <td>{holiday.date}</td>
                <td>{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
