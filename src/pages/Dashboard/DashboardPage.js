import React from 'react';

import OverviewCards from '../../components/dashboard/OverviewCards';
import StatsChart from '../../components/dashboard/StatsChart';
import UpcomingBookings from '../../components/dashboard/UpcomingBookings';
import PendingApplications from '../../components/dashboard/PendingApplications';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      
      <div className="main-content">
      
        <div className="dashboard-content">
          <OverviewCards />
          <div className="dashboard-row">
            <StatsChart />
            <UpcomingBookings />
          </div>
          <PendingApplications />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
