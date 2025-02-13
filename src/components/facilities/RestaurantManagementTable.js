import React from 'react';
import './RestaurantManagementTable.css';

const RestaurantManagementTable = () => {
  // Sample data representing different categories or settings in the restaurant
  const restaurantData = [
    { id: 1, category: 'Salads', itemsCount: 5, status: 'Active' },
    { id: 2, category: 'Main Courses', itemsCount: 12, status: 'Active' },
    { id: 3, category: 'Beverages', itemsCount: 8, status: 'Active' }
  ];

  return (
    <div className="restaurant-management-table-container">
      <table className="restaurant-management-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Items Count</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurantData.map(r => (
            <tr key={r.id}>
              <td>{r.category}</td>
              <td>{r.itemsCount}</td>
              <td>{r.status}</td>
              <td>
                <button className="action-link">Edit</button>
                <button className="action-link">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantManagementTable;
