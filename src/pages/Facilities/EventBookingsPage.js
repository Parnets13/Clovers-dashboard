import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import EventBookingTable from '../../components/facilities/EventBookingTable';
import './EventBookingsPage.css';

const EventBookingsPage = () => {
  return (
    <div className="event-bookings-container">

      <div className="main-content">
  
        <div className="event-bookings-content">
        <div className='flex justify-between'>
             <h2>Event Bookings</h2>
          <div className="event-bookings-actions">
            <button className="primary-button">Add Event Booking</button>
          </div>
          </div>
         
          <EventBookingTable />
        </div>
      </div>
    </div>
  );
};

export default EventBookingsPage;
