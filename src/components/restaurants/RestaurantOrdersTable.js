import React from 'react';
import './RestaurantOrdersTable.css';

const RestaurantOrdersTable = () => {
  const orders = [
    { id: 1, memberName: 'Alice Brown', items: 'Caesar Salad, Latte', total: '$15', status: 'Preparing' },
    { id: 2, memberName: 'Mark Johnson', items: 'Grilled Chicken Sandwich, Soda', total: '$14', status: 'Served' },
    { id: 3, memberName: 'Lisa Ray', items: 'Margarita Pizza, Iced Tea', total: '$18', status: 'Preparing' },
  ];

  return (
    <div className="restaurant-orders-table-container">
      <table className="restaurant-orders-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.memberName}</td>
              <td>{o.items}</td>
              <td>{o.total}</td>
              <td>{o.status}</td>
              <td>
                <button className="action-link">Edit</button>
                <button className="action-link">Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantOrdersTable;
