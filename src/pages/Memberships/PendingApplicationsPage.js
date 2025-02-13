import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import './PendingApplicationsPage.css';

const PendingApplicationsPage = () => {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', type: 'Platinum', status: 'Pending' },
    { id: 2, name: 'Jane Smith', type: 'Life', status: 'Pending' },
    { id: 3, name: 'Alice Brown', type: 'Senior', status: 'Pending' },
  ]);

  const handleApprove = (id) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: 'Approved' } : app
    );
    setApplications(updatedApplications);
  };

  const handleReject = (id) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: 'Rejected' } : app
    );
    setApplications(updatedApplications);
  };

  return (
    <div className="pending-applications-container">
      <div className="main-content">
      
        <div className="pending-applications-content">
          <h2>Pending Applications</h2>
          <table className="applications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>{app.type}</td>
                  <td>{app.status}</td>
                  <td>
                    {app.status === 'Pending' && (
                      <>
                        <button className="approve-button" onClick={() => handleApprove(app.id)}>
                          Approve
                        </button>
                        <button className="reject-button" onClick={() => handleReject(app.id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingApplicationsPage;
