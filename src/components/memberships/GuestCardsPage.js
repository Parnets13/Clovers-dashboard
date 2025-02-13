import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import GuestCardsTable from '../../components/memberships/GuestCardsTable';
import './GuestCardsPage.css';

const GuestCardsPage = () => {
  return (
    <div className="guest-cards-container">
   
      <div className="main-content">
  
        <div className="guest-cards-content">
          <h2>Guest Cards</h2>
          <div className="guest-cards-actions">
            <button className="primary-button">Issue New Guest Card</button>
          </div>
          <GuestCardsTable />
        </div>
      </div>
    </div>
  );
};

export default GuestCardsPage;
