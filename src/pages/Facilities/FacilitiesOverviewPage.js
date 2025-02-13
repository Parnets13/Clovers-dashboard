// src/pages/Facilities/FacilitiesOverviewPage.js
import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { useNavigate } from 'react-router-dom';
import './FacilitiesOverviewPage.css';

const FacilitiesOverviewPage = () => {
    const navigate = useNavigate();

    // Existing navigation handlers
    const goToBookings = () => navigate('/facilities/bookings');
    const goToRestaurantOrders = () => navigate('/facilities/restaurant-orders');
    const goToRooms = () => navigate('/facilities/rooms');

    // New navigation handlers for the added buttons
    const goToFacilityManagement = () => navigate('/facilities/management');
    const goToRestaurantManagement = () => navigate('/facilities/restaurant-management');
    const goToRoomManagement = () => navigate('/facilities/room-management');

    return (
        <div className="facilities-overview-container">
         
            <div className="main-content">
             
                <div className="facilities-overview-content">
                    <h2>Facilities Overview</h2>
                    <p>Select a facility management section:</p>
                    <div className="facilities-buttons">
                        {/* Existing buttons */}
                        <button className="primary-button" onClick={goToBookings}>Facility Bookings</button>
                        {/* <button className="primary-button" onClick={goToRestaurantOrders}>Restaurant Orders</button> */}
                        <button className="primary-button" onClick={goToRooms}>Room Bookings</button>

                        {/* New buttons */}
                        <button className="primary-button" onClick={goToFacilityManagement}>Facility Management</button>
                        {/* <button className="primary-button" onClick={goToRestaurantManagement}>Restaurant Management</button> */}
                        <button className="primary-button" onClick={goToRoomManagement}>Room Management</button>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default FacilitiesOverviewPage;
