import React from 'react';
import SocialLogin from './SocialLogin';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const {register, formState: { errors }, handleSubmit } = useForm();
    const {forgotPassword} = useAuth();
    const handleforgotPassword = (data) =>{
        // console.log(data.email);
         forgotPassword(data.email)
         .then(()=>{
            toast.success('Please check your email for the password reset link.');
         })
         .catch(() =>{
             toast.error('Please enter valid Email credentials.');
         })
    }
    return (
       <div >
             <div className="w-full max-w-md">
               {/* Heading */}
               <h1 className="text-5xl font-bold text-black">Forgot Password</h1>
               <p className="mt-2 text-gray-500">Enter your email address and we’ll send you a reset link.</p>
       
               {/* Form */}
               <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleforgotPassword)}>
                 {/* Email */}
                 <div>
                   <label className="block mb-2 text-sm font-medium text-black">
                     Email
                   </label>
       
                   <input
                     type="email"
                     placeholder="Email"
                       {...register('email', {required: true})}
                     className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                   />
                   {
                         errors.email?.type === 'required' && (
                               <p className='text-red-500'>
                             Email is Required?
                             </p>
                         )
                     } 
                 </div>
       
                 <button
                   type="submit"
                   className="w-full h-12 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
                 >
                   Send
                 </button>
               </form>
       
               {/* Register */}
               <p className="text-center text-gray-500 mt-6">
                 Remember your password? {" "}
                 <span className="text-primary font-medium cursor-pointer">
                   
                    <Link to='/login'>Login</Link>
                 </span>
               </p>
       
               {/* Divider */}
               <div className="flex items-center my-5">
                 <div className="flex-1 border-t border-gray-300"></div>
                 <span className="mx-4 text-gray-500">Or</span>
                 <div className="flex-1 border-t border-gray-300"></div>
               </div>
       
               {/* Google Login */}
                <SocialLogin></SocialLogin>
             </div>
           </div>
    );
};

export default ForgotPassword;