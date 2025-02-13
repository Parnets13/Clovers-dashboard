import React from 'react';
import Card from '../common/Card';
import './OverviewCards.css';

const OverviewCards = () => {
  return (
    <div className="overview-cards-container">
      <Card title="Active Members" value="1200" />
      <Card title="Pending Applications" value="15" />
      <Card title="Upcoming Bookings" value="27" />
      <Card title="Outstanding Invoices" value="5" />
    </div>
  );
};

export default OverviewCards;
