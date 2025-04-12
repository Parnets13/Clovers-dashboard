import React, { Suspense, lazy } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MembershipListPage from "./pages/Memberships/MembershipListPage";
import MemberDetailPage from "./pages/Memberships/MemberDetailPage";
import GuestCardsPage from "./components/memberships/GuestCardsPage";
import SubscriptionsPage from "./pages/Subscriptions/SubscriptionsPage";
import SportsSubscriptionsPage from "./pages/Subscriptions/SportsSubscriptionsPage";
import FacilitySubscriptionsPage from "./components/subscriptions/FacilitySubscriptionsPage";
import FacilitiesOverviewPage from "./pages/Facilities/FacilitiesOverviewPage";
import FacilityBookingsPage from "./pages/Facilities/FacilityBookingsPage";
import MenuManagementPage from "./pages/Facilities/MenuManagementPage";
import RoomBookingsPage from "./pages/Facilities/RoomBookingsPage";
import EventBookingsPage from "./pages/Facilities/EventBookingsPage";
import RestaurantOrdersPage from "./pages/Restaurants/RestaurantOrdersPage";
import FacilityManagementPage from "./pages/Facilities/FacilityManagementPage";
// import RestaurantManagementPage from "./pages/Restaurants/RestaurantManagementPage";
import RestaurantManagementPage from "./pages/Restaurants/RestaurantManagementPage";
import RoomManagementPage from "./pages/Facilities/RoomManagementPage";
import RestaurantsOverviewPage from "./pages/Restaurants/RestaurantsOverviewPage";
import PendingApplicationsPage from "./pages/Memberships/PendingApplicationsPage";
import ViewMenuPage from "./pages/Restaurants/ViewMenuPage";
import BarOverviewPage from "./pages/Restaurants/BarOverviewPage";
import BarOrdersPage from "./pages/Restaurants/BarOrdersPage";
import CreateMembershipPage from "./pages/Memberships/CreateMembershipPage";
import EmployeeManagement from "./pages/Employee/EmployeeManagement";
import AppLayout from "./pages/AppLyayout";
import Loader from "./pages/Loader";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import Inventory from "./pages/Inventory/Inventory";
import Maintenance from "./pages/Maintenance/Maintenance";
import Attendance from "./pages/Employee/Attendance";
import Payroll from "./pages/Employee/Payroll";
import FeesAndCharges from "./pages/Employee/FeesAndCharges";
import DiscountsAndPromotions from "./pages/Memberships/DiscountsAndPromotions";
import MemberDashboard from "./pages/Members.js/MemberDashboard";
import Admin from "./pages/Admin/Admin";
import Benefit from "./pages/Memberships/Benefit";
import BarInventory from "./pages/Inventory/BarInventory";
import RestaurantInventory from "./pages/Inventory/RestaurantInventory";
import BarManagement from "./components/bar/BarManagement";
import BarManagementPage from "./components/bar/BarManagementPage";
import RestaurantReservation from "./pages/Reservation/RestaurantReservation";
import BarReservation from "./pages/Reservation/BarReservation";
import EmployeesById from "./pages/Employee/EmployeesById";
import Members from "./pages/Memberships/Members";
import SportBooking from "./pages/Facilities/SportBooking";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Dashboard Route */}

          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            {/* Membership Routes */}
            <Route path="/memberships" element={<MembershipListPage />} />
            <Route path="/memberships/benefits" element={<Benefit />} />

            <Route
              path="/memberships/wallet"
              element={<Members />}
            
            />
              <Route
              path="/memberships/create"
              element={<CreateMembershipPage />}
            />
             <Route
              path="/memberships/members"
              element={<Members />}
            />

            <Route path="/memberships/detail" element={<MemberDetailPage />} />
            <Route path="/memberships/guests" element={<GuestCardsPage />} />
            <Route
              path="/memberships/pending-applications"
              element={<PendingApplicationsPage />}
            />

            {/* Subscription Routes */}
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route
              path="/subscriptions/sports"
              element={<SportsSubscriptionsPage />}
            />
            <Route
              path="/subscriptions/facilities"
              element={<SportBooking />}
            />

            {/* Facilities Routes */}
            <Route path="/facilities" element={<FacilitiesOverviewPage />} />
            <Route
              path="/facilities/bookings"
              element={<FacilityBookingsPage />}
            />
            {/* <Route path="/facilities/restaurant-orders" element={<RestaurantOrdersPage />} /> */}
            <Route path="/facilities/rooms" element={<RoomBookingsPage />} />
            <Route
              path="/facilities/management"
              element={<FacilityManagementPage />}
            />
            {/* <Route path="/facilities/restaurant-management" element={<RestaurantManagementPage />} /> */}
            <Route
              path="/facilities/room-management"
              element={<RoomManagementPage />}
            />

            {/* Restaurant Routes */}
            <Route path="/restaurants" element={<RestaurantsOverviewPage />} />
            <Route
              path="/restaurants/orders"
              element={<RestaurantOrdersPage />}
            />
            <Route
              path="/restaurants/management"
              element={<RestaurantManagementPage />}
            />
            <Route path="/bar/management" element={<BarManagementPage />} />
            <Route path="/restaurants/view-menu" element={<ViewMenuPage />} />

            <Route path="/bar/view-menu" element={<BarManagement />} />

            <Route path="/bar-inventory" element={<BarInventory />} />
            <Route
              path="/restaurant-inventory"
              element={<RestaurantInventory />}
            />
            <Route path="/maintainance-inventory" element={<Inventory />} />

            {/* Bar Routes */}
            <Route path="bar" element={<BarOverviewPage />} />
            <Route path="bar/orders" element={<BarOrdersPage />} />

            {/* Applications Routes */}
            <Route path="/applications" element={<PendingApplicationsPage />} />

            {/* EmployeeManagement */}
            <Route
              path="/employee-management"
              element={<EmployeeManagement />}
            />
            <Route path="/employee/:empId" element={<EmployeesById />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/financial" element={<FeesAndCharges />} />
            <Route
              path="/discount&promotion"
              element={<DiscountsAndPromotions />}
            />
            <Route path="/members" element={<MemberDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/reservation/restaurant"
              element={<RestaurantReservation />}
            />
            <Route path="/reservation/bar" element={<BarReservation />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
