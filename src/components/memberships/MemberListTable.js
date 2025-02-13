import React from 'react';
import './MemberListTable.css';

const MemberListTable = () => {
  // Sample data for demonstration
  const members = [
    { id: 'M001', name: 'John Doe', type: 'Life', status: 'Active', expiry: '2024-12-31' },
    { id: 'M002', name: 'Jane Smith', type: 'Platinum', status: 'Active', expiry: '2023-10-15' },
    { id: 'M003', name: 'Alice Brown', type: 'Senior', status: 'Expired', expiry: '2022-12-31' },
  ];

  return (
    <div className="member-list-table-container">
      <table className="member-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.type}</td>
              <td>{m.status}</td>
              <td>{m.expiry}</td>
              <td>
                <a href="/memberships/detail" className="action-link">View</a>
                <a href="#" className="action-link">Renew</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListTable;
