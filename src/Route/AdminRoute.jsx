import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Pages/ErrorPage/Forbidden';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const {role, roleLoading} = useRole();
       if (loading || !user || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;