// import React from 'react';
// import './Sidebar.css';
// import logo from "../../assets/logo.png";
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { Toaster, toast } from 'sonner'

// // Import icons from react-icons
// import { FaTachometerAlt, FaUsers, FaFileInvoice, FaBuilding, FaClipboardList, FaDollarSign, FaBoxes } from "react-icons/fa";

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <Toaster position="top-center" />
//             <div className="sidebar-logo">
//                 <img src={logo} alt="Sales Logo" className="logo-image" />
//             </div>
//             <ul className="sidebar-menu">
//                 <li>
//                     <Link to="/">
//                         <FaTachometerAlt className="menu-icon" /> Dashboard
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/memberships">
//                         <FaUsers className="menu-icon" /> Memberships
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/subscriptions">
//                         <FaFileInvoice className="menu-icon" /> Subscriptions
//                     </Link>
//                 </li>
//                 <li>
//                     <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
//                         <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
//                             <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
//                         </svg>
//                         <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
//                         <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
//                         </svg>
//                     </button>
//                     <ul id="dropdown-example" class="hidden py-2 space-y-2">
//                         <li>
//                             <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
//                         </li>
//                         <li>
//                             <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
//                         </li>
//                         <li>
//                             <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
//                         </li>
//                     </ul>
//                 </li>
//                 <li>
//                     <Link to="/facilities">
//                         <FaBuilding className="menu-icon" /> Facilities
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/restaurants">
//                         <FaBuilding className="menu-icon" /> Restaurants
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/bar" >
//                         <FaBuilding className='menu-icon' /> Bar
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/applications">
//                         <FaClipboardList className="menu-icon" /> User List
//                     </Link>
//                 </li>

//                 <li>
//                     <Link to="/financial">
//                         <FaDollarSign className="menu-icon" /> Financial
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/inventory">
//                         <FaBoxes className="menu-icon" /> Inventory
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/employee-management">
//                         <FaBoxes className="menu-icon" /> Employee Management
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;

import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  ShopOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  BarsOutlined,
  ContainerOutlined,
  BuildOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { Toaster, toast } from "sonner";
import logo from "../../assets/logo.png";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileInvoice,
  FaBuilding,
  FaClipboardList,
  FaDollarSign,
  FaBoxes,
} from "react-icons/fa";
import { FaCircleNodes, FaSellcast } from "react-icons/fa6";
import {
  MdHotel,
  MdManageHistory,
  MdOutlineRestartAlt,
  MdOutlineSportsEsports,
} from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { IoRestaurantSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Toaster />
      <div className="sidebar-logo">
        <img src={logo} alt="Sales Logo" className="logo-image" />
      </div>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["subscriptions"]}
        style={{ height: "100%", borderRight: 1 }}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined size={40} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="memberships" icon={<TeamOutlined />}>
          <Link to="/memberships">Memberships</Link>
        </Menu.Item>

        <Menu.SubMenu
          key="subscriptions"
          icon={<FaSellcast />}
          title="Subscriptions"
        >
          <Menu.Item key="sportsub" icon={<MdOutlineSportsEsports />}>
            <Link to="/subscriptions/sports">Sports Subscriptions</Link>
          </Menu.Item>
          <Menu.Item key="facilitysub" icon={<FaCircleNodes />}>
            <Link to="/subscriptions/facilities">Facility Subscriptions</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="facilities"
          icon={<BuildOutlined />}
          title="Facilities "
        >
          <Menu.Item
            key="facilitiesmanagement"
            icon={<MdOutlineSportsEsports />}
          >
            <Link to="/facilities/management">Facility Management</Link>
          </Menu.Item>
          <Menu.Item key="facilitybookings" icon={<BuildOutlined />}>
            <Link to="/facilities/bookings">Facility Bookings</Link>
          </Menu.Item>
          <Menu.Item key="roommangement" icon={<MdHotel />}>
            <Link to="/facilities/room-management">Room Management</Link>
          </Menu.Item>
          <Menu.Item key="roombooking" icon={<TbBrandBooking />}>
            <Link to="/facilities/rooms">Room Bookings</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="restaurants"
          icon={<IoRestaurantSharp />}
          title="Restaurants"
        >
          <Menu.Item key="restum" icon={<MdManageHistory />}>
            <Link to="/restaurants/management">Add Management</Link>
          </Menu.Item>
          <Menu.Item key="restu" icon={<MdOutlineRestartAlt />}>
            <Link to="/restaurants"> Restaurants</Link>
          </Menu.Item>

          <Menu.Item key="restub" icon={<TbBrandBooking />}>
            <Link to="/restaurants/orders">Bookings</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* <Menu.Item key="restaurants" icon={<BuildOutlined />}>
                    <Link to="/restaurants">Restaurants</Link>
                </Menu.Item> */}

        <Menu.Item key="bar" icon={<BuildOutlined />}>
          <Link to="/bar">Bar</Link>
        </Menu.Item>
        <Menu.Item key="user-list" icon={<ContainerOutlined />}>
          <Link to="/applications">User List</Link>
        </Menu.Item>
        <Menu.Item key="inventory" icon={<BarsOutlined />}>
          <Link to="/inventory">Inventory</Link>
        </Menu.Item>
        <Menu.Item key="maintainance" icon={<BarsOutlined />}>
          <Link to="/maintainance">maintainance</Link>
        </Menu.Item>

        <Menu.SubMenu
          key="employee"
          icon={<IoRestaurantSharp />}
          title="Employees Management"
        >
          <Menu.Item key="employee-management" icon={<UserOutlined />}>
            <Link to="/employee-management">Employee Management</Link>
          </Menu.Item>
          <Menu.Item key="attendance" icon={<UserOutlined />}>
            <Link to="/attendance">Attendance</Link>
          </Menu.Item>
          <Menu.Item key="payroll" icon={<UserOutlined />}>
            <Link to="/payroll">Pay Roll</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="Members" icon={<UserOutlined />} title="Members">
          <Menu.Item key="member" icon={<UserOutlined />}>
            <Link to="/members">Members Management</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="Admin" icon={<UserOutlined />} title="Admin">
          <Menu.Item key="admin" icon={<UserOutlined />}>
            <Link to="/admin">Admin</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="financial" icon={<DollarOutlined />}>
          <Link to="/financial">Financial</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
