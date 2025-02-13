// src/components/dashboard/PendingApplications.js
import React from 'react';
import './PendingApplications.css'; // optional styling

const PendingApplications = () => {
  const pendingApps = [
    { id: 1, applicantName: 'Alice Johnson', appliedOn: '2023-12-10' },
    { id: 2, applicantName: 'Mark Spencer', appliedOn: '2023-12-11' }
  ];

  return (
    <div className="pending-applications-container">
      <h4>Pending Applications</h4>
      <table className="pending-applications-table">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Applied On</th>
          </tr>
        </thead>
        <tbody>
          {pendingApps.map(app => (
            <tr key={app.id}>
              <td>{app.applicantName}</td>
              <td>{app.appliedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApplications;
