import React from 'react';
import './EventBookingTable.css';

const EventBookingTable = () => {
  const eventBookings = [
    { id: 1, eventName: 'Smith Wedding', date: '2023-12-30', venue: 'Main Hall', status: 'Confirmed' },
    { id: 2, eventName: 'Johnson Birthday Party', date: '2023-12-28', venue: 'Lawn Area', status: 'Pending' },
  ];

  return (
    <div className="event-booking-table-container">
      <table className="event-booking-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventBookings.map(e => (
            <tr key={e.id}>
              <td>{e.eventName}</td>
              <td>{e.date}</td>
              <td>{e.venue}</td>
              <td>{e.status}</td>
              <td>
                <button className="action-link">Edit</button>
                <button className="action-link">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventBookingTable;
