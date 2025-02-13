// src/components/memberships/MemberDetailForm.js
import React from 'react';
import './MemberDetailForm.css';

const MemberDetailForm = () => {
  // Hardcoded example data
  const memberData = {
    id: 'M001',
    name: 'John Doe',
    type: 'Life',
    status: 'Active',
    expiry: '2024-12-31',
    dependents: ['Chris Doe (Child)'],
  };

  return (
    <div className="member-detail-form-container">
      <div className="detail-row">
        <label>ID</label>
        <span>{memberData.id}</span>
      </div>
      <div className="detail-row">
        <label>Name</label>
        <span>{memberData.name}</span>
      </div>
      <div className="detail-row">
        <label>Type</label>
        <span>{memberData.type}</span>
      </div>
      <div className="detail-row">
        <label>Status</label>
        <span>{memberData.status}</span>
      </div>
      <div className="detail-row">
        <label>Expiry</label>
        <span>{memberData.expiry}</span>
      </div>
      <div className="detail-row">
        <label>Dependents</label>
        <span>{memberData.dependents.join(', ')}</span>
      </div>
      <div className="actions">
        <button className="primary-button">Renew</button>
        <button className="secondary-button">Edit</button>
      </div>
    </div>
  );
};

export default MemberDetailForm;
