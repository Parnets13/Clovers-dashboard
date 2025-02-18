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
            {/* <Link to="/restaurants/management">Add Management</Link> */}
            <Link to="/restaurants/view-menu">Add Management</Link>
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
        {/* <Menu.Item key="user-list" icon={<ContainerOutlined />}>
          <Link to="/applications">User List</Link>
        </Menu.Item> */}

        <Menu.SubMenu key="inventory" icon={<BarsOutlined />} title="Inventory">
          <Menu.Item key="barinventory" icon={<BarsOutlined />}>
            <Link to="/bar-inventory">Bar Inventory</Link>
          </Menu.Item>
          <Menu.Item key="restaurantinventory" icon={<BarsOutlined />}>
            <Link to="/restaurant-inventory">Restaurant Inventory</Link>
          </Menu.Item>
          <Menu.Item key="facilityinventory" icon={<BarsOutlined />}>
            <Link to="/inventory">Facility Inventory</Link>
          </Menu.Item>
        </Menu.SubMenu>

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
