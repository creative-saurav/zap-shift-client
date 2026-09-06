import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();
      if (roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }else{
        return <UserDashboard></UserDashboard>
    }
};

export default DashboardHome;