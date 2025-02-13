import React from 'react';
import './MenuManagementTable.css';

const MenuManagementTable = () => {
  const menuItems = [
    { id: 1, name: 'Caesar Salad', price: '$8', category: 'Salad' },
    { id: 2, name: 'Grilled Chicken Sandwich', price: '$12', category: 'Main' },
    { id: 3, name: 'Margarita Pizza', price: '$10', category: 'Main' }
  ];

  return (
    <div className="menu-management-table-container">
      <table className="menu-management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.price}</td>
              <td>{m.category}</td>
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

export default MenuManagementTable;
