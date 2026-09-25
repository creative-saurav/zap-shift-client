import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Error from "../Pages/ErrorPage/Error";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import SendParcel from "../Pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import ParcelsDetails from "../Pages/Dashboard/MyParcels/ParcelsDetails";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import ApproveRidersDetails from "../Pages/Dashboard/ApproveRiders/ApproveRidersDetails";
import Users from "../Pages/Dashboard/Users/Users";
import EditUser from "../Pages/Dashboard/Users/EditUser";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignDeliveries from "../Pages/Dashboard/AssignDeliveries/AssignDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import UserReviews from "../Pages/Dashboard/UserReviews/UserReviews";
import AllParcels from "../Pages/Dashboard/AllParcels/AllParcels";
import CoverageArea from "../Pages/Dashboard/Coverage-area/CoverageArea";
import AddCoverage from "../Pages/Dashboard/Coverage-area/AddCoverage";
import EditCoverage from "../Pages/Dashboard/Coverage-area/EditCoverage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import EditProfile from "../Pages/Dashboard/Profile/EditProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        Component: Coverage
      },
      {
        path: '/about-us',
        Component: AboutUs
      },
      
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        //  loader: () => fetch('./warehouses.json').then(res=>res.json())
      },
      {
        path: '/send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        // loader: () => fetch('./warehouses.json').then(res=>res.json())
      },
      {
        path: '/parcel-tracking/:trackingId',
        Component: ParcelTrack
      }
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: 'forgotpassword',
        Component: ForgotPassword
      },
      {
        path: 'resetpassword',
        Component: ResetPassword
      }
    ]
  },
  
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'all-parcels',
        Component: AllParcels
      },
      {
        path: 'parcels-details/:id',
        Component: ParcelsDetails
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancel',
        Component: PaymentCancel
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'editProfile',
        Component: EditProfile
      },
      //Riders Only Used This Link
      {
        path: 'assign-deliveries',
         element: <RiderRoute><AssignDeliveries></AssignDeliveries></RiderRoute>
      },
      {
        path: 'complete-deliveries',
         element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },

      //Admin Only Used This Links
      {
        path: 'approve-riders',
         element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path: 'approve-riders-details/:id',
        element: <AdminRoute><ApproveRidersDetails></ApproveRidersDetails></AdminRoute>
      },
      {
        path: 'assign-riders',
        element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><Users></Users></AdminRoute>
      },
      {
        path:'edit-users/:id',
        element: <AdminRoute><EditUser></EditUser></AdminRoute>
      },
      {
        path: 'user-reviews',
        element: <AdminRoute><UserReviews></UserReviews></AdminRoute>
      },
      {
        path: 'coverage-area',
        element: <AdminRoute><CoverageArea></CoverageArea></AdminRoute>
      },
      {
        path: 'add-coverage',
        element: <AdminRoute><AddCoverage/></AdminRoute>
      },
      {
        path: 'edit-coverage/:id',
        element: <AdminRoute><EditCoverage/></AdminRoute>
      }

      //Admin Only Used This Links

    ]
  },

  {
    path: "*",
    Component: Error,
  },

  
]);