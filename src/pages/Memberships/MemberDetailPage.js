// src/pages/Memberships/MemberDetailPage.js
import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import MemberDetailForm from '../../components/memberships/MemberDetailForm';
import './MemberDetailPage.css';

const MemberDetailPage = () => {
  return (
    <div className="member-detail-container">
  
      <div className="main-content">
    
        <div className="member-detail-content">
          <h2>Member Details</h2>
          <MemberDetailForm />
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;
