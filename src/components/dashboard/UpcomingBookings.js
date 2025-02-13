// src/components/dashboard/UpcomingBookings.js
import React from 'react';
import './UpcomingBookings.css'; // optional styling

const UpcomingBookings = () => {
  const sampleBookings = [
    { id: 1, memberName: 'John Doe', facility: 'Tennis Court 1', date: '2023-12-20' },
    { id: 2, memberName: 'Jane Smith', facility: 'Swimming Pool', date: '2023-12-21' },
    { id: 3, memberName: 'Robert Lee', facility: 'Gym Slot', date: '2023-12-22' },
  ];

  return (
    <div className="upcoming-bookings-container">
      <h4>Upcoming Bookings</h4>
      <table className="upcoming-bookings-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Facility</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleBookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.memberName}</td>
              <td>{booking.facility}</td>
              <td>{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingBookings;
