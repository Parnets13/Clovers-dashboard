// src/components/subscriptions/FacilitySubscriptionsTable.js
import React from 'react';
import './FacilitySubscriptionsTable.css';

const FacilitySubscriptionsTable = () => {
  const subscriptions = [
    { id: 1, name: 'Restaurant Membership', accessType: 'Restaurant/Bar', fee: '$30/month', offers: '10% off drinks' },
    { id: 2, name: 'Event Pass', accessType: 'Event-Based', fee: '$100/year', offers: 'Priority seating, early bird discounts' },
  ];

  return (
    <div className="facility-subscriptions-table-container">
      <table className="facility-subscriptions-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Access Type</th>
            <th>Fee</th>
            <th>Offers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(sub => (
            <tr key={sub.id}>
              <td>{sub.name}</td>
              <td>{sub.accessType}</td>
              <td>{sub.fee}</td>
              <td>{sub.offers}</td>
              <td>
                <button className="action-link">Edit</button>
                <button className="action-link">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilitySubscriptionsTable;
