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
   {
    id: 3,
    title: "Salary Disbursement",
    date: "2025-07-20",
    message: "August salaries will be credited to all employee accounts by July 28th.",
  },
];

const Announcements = () => {
  return (
    <div style={{ padding: '30px' }}>
      <style>{`
        .announcement-title {
          color: #343a40;
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: bold;
          text-align: center;
        }

        .announcement-card {
          background-color: #ffffff;
          border-left: 6px solid #007bff;
          padding: 20px 25px;
          margin-bottom: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .announcement-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .announcement-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .announcement-header h3 {
          margin: 0;
          font-size: 20px;
          color: #007bff;
        }

        .announcement-date {
          font-size: 14px;
          color: #888;
          font-style: italic;
        }

        .announcement-message {
          font-size: 16px;
          color: #333;
        }

        .no-announcement {
          text-align: center;
          font-size: 18px;
          color: #999;
        }
      `}</style>

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
        <p className="no-announcement">No announcements at the moment.</p>
      )}
    </div>
  );
};

export default Announcements;
