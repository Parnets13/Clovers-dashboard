import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RestaurantsOverviewPage.css';

const RestaurantsOverviewPage = () => {
    const navigate = useNavigate();
    const [ordersData, setOrdersData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [categoryMapping, setCategoryMapping] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const goToRestaurantOrders = () => navigate('/restaurants/orders');
    const goToRestaurantManagement = () => navigate('/restaurants/management');

    // Fetch menu and map item names to categories
    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/menu');
                const data = await response.json();
                if (Array.isArray(data)) {
                    const mapping = {};
                    data.forEach((category) => {
                        category.subCategories.forEach((subCategory) => {
                            subCategory.items.forEach((item) => {
                                mapping[item.name] = category.category.toLowerCase();
                            });
                        });
                    });
                    setCategoryMapping(mapping);
                } else {
                    console.error('Expected an array but received:', data);
                }
            } catch (err) {
                console.error('Error fetching menu categories:', err);
            }
        };

        fetchMenuCategories();
    }, []);

    // Fetch live orders and filter by Veg and Non-Veg categories
    useEffect(() => {
        const fetchLiveOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/live-orders');
                const orders = response.data;

                // Filter orders containing veg or non-veg items
                const filtered = orders.filter((order) =>
                    order.items.some((item) =>
                        ["veg", "non-veg"].includes(categoryMapping[item.name])
                    )
                );

                setFilteredOrders(filtered);
                setOrdersData(orders); // Keep original orders if needed
            } catch (err) {
                setError('Failed to fetch live orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(categoryMapping).length > 0) {
            fetchLiveOrders();
        }
    }, [categoryMapping]);

    const handleStatusChange = async (id, newStatus) => {
        const orderToUpdate = ordersData.find((order) => order._id === id);

        if (!orderToUpdate) {
            console.error('Order not found');
            return;
        }

        if (newStatus === 'Served') {
            try {
                // Separate food and alcohol items
                const foodItems = orderToUpdate.items.filter(
                    (item) => categoryMapping[item.name] === 'veg' || categoryMapping[item.name] === 'non-veg'
                );
                const alcoholItems = orderToUpdate.items.filter(
                    (item) => categoryMapping[item.name] === 'alcohol'
                );

                // Save food items to `/orders`
                if (foodItems.length > 0) {
                    await axios.post('http://localhost:8000/api/orders', {
                        ...orderToUpdate,
                        items: foodItems,
                    });
                }

                if (alcoholItems.length > 0) {
                    // Update `/live-orders` to retain alcohol items
                    await axios.patch(`http://localhost:8000/api/live-orders/${id}`, {
                        items: alcoholItems,
                    });
                } else {
                    // If no alcohol items remain, delete the entire order
                    await axios.delete(`http://localhost:8000/api/live-orders/${id}`);
                }

                // Update the frontend state
                setOrdersData((prev) =>
                    prev.map((order) =>
                        order._id === id ? { ...order, items: alcoholItems } : order
                    ).filter((order) => order.items.length > 0)
                );
            } catch (err) {
                console.error('Failed to update order:', err);
                setError('Failed to update order. Please try again.');
            }
        } else {
            try {
                // Update status for the entire order
                await axios.patch(`http://localhost:8000/api/live-orders/${id}`, { status: newStatus });
                setOrdersData((prev) =>
                    prev.map((order) =>
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
            } catch (err) {
                console.error('Failed to update order status:', err);
                setError('Failed to update order status. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="loading"> <div className='flex justify-center h-screen w-screen items-center'>
       
            <div class="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#c5a48a] rounded-full"
                >
                    <div
                        class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                    ></div>
                </div>
            </div>

        </div></div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="restaurants-overview-container">
         
            <div className="main-content">
           
                <div className="restaurants-buttons">
                    <button className="primary-button" onClick={goToRestaurantOrders}>
                        Restaurant Orders
                    </button>
                    <button className="primary-button" onClick={goToRestaurantManagement}>
                        Restaurant Management
                    </button>
                </div>
                <div className="restaurants-overview-content">
                    <div className="orders-table-container">
                        <h3>Live Orders (Veg & Non-Veg)</h3>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Table No</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.table}</td>
                                        <td>
                                            <ul className="items-list">
                                                {order.items
                                                    .filter((item) =>
                                                        ["veg", "non-veg"].includes(categoryMapping[item.name])
                                                    )
                                                    .map((item) => (
                                                        <li key={item._id}>
                                                            {item.name} - {item.quantity}x (₹{item.price})
                                                        </li>
                                                    ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <select
                                                value={order.status || 'Pending'}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="status-dropdown"
                                            >
                                                <option value="Preparing">Preparing</option>
                                                <option value="Served">Served</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${order.status?.toLowerCase() || 'pending'}`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsOverviewPage;
