import React from 'react';


const announcements = [
  {
    id: 1,
    title: "Holiday Notice",
    date: "2025-07-25",
    message: "The office will remain closed on July 25th for Independence Day celebrations.",
  },
  {
    id: 2,
    title: "Salary Disbursement",
    date: "2025-07-20",
    message: "July salaries will be credited to all employee accounts by July 28th.",
  },
];

const Announcements = () => {
  return (
    <div className="announcement-container">
      <h1 className="announcement-title">📢 Announcements</h1>
      {announcements.length > 0 ? (
        announcements.map((item) => (
          <div key={item.id} className="announcement-card">
            <div className="announcement-header">
              <h3>{item.title}</h3>
              <span className="announcement-date">{item.date}</span>
            </div>
            <p className="announcement-message">{item.message}</p>
          </div>
        ))
      ) : (
        <p>No announcements at the moment.</p>
      )}
    </div>
  );
};

export default Announcements;
