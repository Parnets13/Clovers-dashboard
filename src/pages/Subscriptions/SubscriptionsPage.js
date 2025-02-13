import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { useNavigate } from 'react-router-dom';
import './SubscriptionsPage.css';

const SubscriptionsPage = () => {
    const navigate = useNavigate();

    const goToSports = () => navigate('/subscriptions/sports');
    const goToFacilities = () => navigate('/subscriptions/facilities');

    return (
        <div className="subscriptions-container">
         
            <div className="main-content">
              
                <div className="subscriptions-content">
                    <h2>Subscriptions</h2>
                    <p>Select a category to manage:</p>
                    <div className="subscriptions-buttons">
                        <button className="primary-button" onClick={goToSports}>
                            Sports Subscriptions
                        </button>
                        <button className="primary-button" onClick={goToFacilities}>
                            Facility Subscriptions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;