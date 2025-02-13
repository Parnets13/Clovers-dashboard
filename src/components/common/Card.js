import React from 'react';
import { FaUsers, FaClipboardList, FaCalendarCheck, FaFileInvoiceDollar } from 'react-icons/fa';
import './Card.css';

const Card = ({ title, value }) => {
  // Define icons for each card type
  const getIcon = () => {
    switch (title) {
      case 'Active Members':
        return <FaUsers className="card-icon" />;
      case 'Pending Applications':
        return <FaClipboardList className="card-icon" />;
      case 'Upcoming Bookings':
        return <FaCalendarCheck className="card-icon" />;
      case 'Outstanding Invoices':
        return <FaFileInvoiceDollar className="card-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      {getIcon()} {/* Render the corresponding icon */}
      <h3 className="card-title">{title}</h3>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default Card;
