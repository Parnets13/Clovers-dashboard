import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RestaurantsOverviewPage.css'; // Reusing the same styles
import moment from 'moment';

const BarOverviewPage = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [categoryMapping, setCategoryMapping] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Add navigation hook

    // Fetch menu and map item names to categories
    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/menu');
                const data = response.data;

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
                    throw new Error('Menu data is not in the expected format');
                }
            } catch (err) {
                console.error('Error fetching menu categories:', err);
                setError('Failed to fetch menu categories. Please try again later.');
            }
        };

        fetchMenuCategories();
    }, []);

    const fetchLiveOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/live-orders/getlivebycat/bar');
            const orders = response.data.success;


            setFilteredOrders(orders);
            setOrdersData(orders); // Keep original orders if needed
        } catch (err) {
            console.error('Error fetching live orders:', err);
            setError('Failed to fetch live orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch live orders and filter alcohol items
    useEffect(() => {
        fetchLiveOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        const orderToUpdate = ordersData.find((order) => order._id === id);
        if (!orderToUpdate) {
            console.error('Order not found');
            return;
        }


        try {
            // Update status for the entire order
            await axios.patch(`http://localhost:8000/api/live-orders/${id}`, { status: newStatus });
            fetchLiveOrders()
        } catch (err) {
            console.error('Failed to update order status:', err);
            setError('Failed to update order status. Please try again.');
        }
    }


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
                    {/* Add Bar Orders Button */}
                    <button
                        className="primary-button"
                        onClick={() => navigate('/bar/orders')} // Navigate to Bar Orders page
                    >
                        Bar Orders
                    </button>
                </div>
                <div className="restaurants-overview-content">
                    <div className="orders-table-container">
                        <h3>Bar Orders (Alcohol Only)</h3>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Table No</th>
                                    <th>Member_Name</th>
                                    <th>Discount</th>
                                    <th>Pay Method</th>
                                    <th>Amount</th>

                                    <th>Items</th>
                                    <th>Booking Date</th>
                                    <th>Status</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders?.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.orderId}</td>
                                        <td>{order.table}</td>
                                        <td>{order?.userId?.Member_Name}</td>
                                        <td>{order.discount?.toFixed(2)}</td>

                                        <td>{order.paymentMethod}</td>
                                        <td>{order.total?.toFixed(2)}</td>
                                        <td>
                                            <ul className="items-list">
                                                {order?.items?.map((item) => (
                                                    <li key={item._id}>
                                                        <div className='flex gap-2'>
                                                            <img src={`http://192.168.1.79:8000/bar/${item.image}`} style={{
                                                                height: "70px", borderRadius: "10px"
                                                            }} />
                                                            <p> {item.name} {item.measure} - {item.quantity}x (₹{item.price})</p>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{moment(order?.date).format("lll")}</td>

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
                                        {/* <td>
                                            <span className={`status-badge ${order.status?.toLowerCase() || 'pending'}`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td> */}
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

export default BarOverviewPage;
