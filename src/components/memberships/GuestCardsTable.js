// src/components/memberships/GuestCardsTable.js
import React from 'react';
import './GuestCardsTable.css';

const GuestCardsTable = () => {
  const guestCards = [
    { id: 'GC001', issuedTo: 'John Doe', dateIssued: '2023-12-15', expiry: '2023-12-15', status: 'Active' },
    { id: 'GC002', issuedTo: 'Jane Smith', dateIssued: '2023-12-16', expiry: '2023-12-16', status: 'Active' },
    { id: 'GC003', issuedTo: 'Bob Brown', dateIssued: '2023-12-15', expiry: '2023-12-15', status: 'Expired' },
  ];

  return (
    <div className="guest-cards-table-container">
      <table className="guest-cards-table">
        <thead>
          <tr>
            <th>Card ID</th>
            <th>Issued To</th>
            <th>Date Issued</th>
            <th>Expiry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {guestCards.map(gc => (
            <tr key={gc.id}>
              <td>{gc.id}</td>
              <td>{gc.issuedTo}</td>
              <td>{gc.dateIssued}</td>
              <td>{gc.expiry}</td>
              <td>{gc.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestCardsTable;
