import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import axios from 'axios';
import './RestaurantOrdersPage.css';
import moment from 'moment';

const BarOrdersPage = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [categoryMapping, setCategoryMapping] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
//  const [filteredOrders, setFilteredOrders] = useState([]);
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
                                mapping[item.name] = category.category.toLowerCase(); // Map item name to category
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

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/live-orders/getbycat/bar');
                const orders = response.data.success;


        
                setOrdersData(orders); 
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(categoryMapping).length > 0) {
            fetchOrders();
        }
    }, [categoryMapping]);

    const resetFilter = () => setSelectedDate('');

    // Filter orders by date
    const filteredOrders =
        selectedDate === ''
            ? ordersData
            : ordersData.filter((order) => order.formattedDate === selectedDate);

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
        <div className="restaurant-orders-container">

            <div className="main-content">

                <div className="restaurant-orders-content">
                    <div className="orders-header">
                        <h2>Bar Orders</h2>
                        <div className="date-filter">
                            <label htmlFor="date-picker">Filter by Date:</label>
                            <input
                                id="date-picker"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="date-picker"
                            />
                            <button className="reset-button" onClick={resetFilter}>
                                Reset Filter
                            </button>
                        </div>
                    </div>

                    <div className="orders-table-container">
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
                                        {/*                                       
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
                                                                                   </td> */}
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

export default BarOrdersPage;
