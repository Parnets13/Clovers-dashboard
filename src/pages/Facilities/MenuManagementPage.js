import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import MenuManagementTable from '../../components/facilities/MenuManagementTable';
import './MenuManagementPage.css';

const MenuManagementPage = () => {
  
  return (
    <div className="menu-management-container">

      <div className="main-content">
   
        <div className="menu-management-content">
          <h2>Menu Management</h2>
          <div className="menu-management-actions">
            <button className="primary-button">Add Menu Item</button>
          </div>
          <MenuManagementTable />
        </div>
      </div>
    </div>
  );
};

export default MenuManagementPage;
