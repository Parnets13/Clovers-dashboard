// src/components/facilities/RoomManagementTable.js
import React from 'react';
import './RoomManagementTable.css';

const RoomManagementTable = () => {
  // Sample data representing rooms available in the club
  const rooms = [
    { id: 1, name: 'Deluxe Suite', capacity: '2 Adults', status: 'Available' },
    { id: 2, name: 'Standard Room', capacity: '2 Adults', status: 'Booked' },
    { id: 3, name: 'Family Suite', capacity: '4 Adults', status: 'Available' }
  ];

  return (
    <div className="room-management-table-container">
      <table className="room-management-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.capacity}</td>
              <td>{r.status}</td>
              <td>
                <button className="action-link">Edit</button>
                <button className="action-link">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagementTable;
