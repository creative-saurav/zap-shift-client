import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SocialLogin = () => {

    const {googleSignIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

     const handleGoogleSignIn = () =>{
      googleSignIn()
      .then((result)=>{
        // console.log('user insert data', result.user);
        const user = result.user;
        const userInfo = {
             displayName: user.displayName,
             email: user.email,
             photoURL: user.photoURL,

           }
            axiosSecure.post('/users', userInfo)
            .then(()=>{
              //  console.log('Insert Data ', res.data);
                navigate(location?.state || '/');
                toast.success('Successfully Login.')
            })

        
      })
      .catch(()=>{
        toast.error('Registration Failed.')
      })
    }


    return (
        <div>
             <button onClick={handleGoogleSignIn} className="w-full h-12 border border-gray-200 rounded-md flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition">
                  <FcGoogle size={22} />
                  <span className="font-medium">Login with Google</span>
                </button>
                
        </div>
    );
};

export default SocialLogin;