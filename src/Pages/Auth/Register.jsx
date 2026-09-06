import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {registerUser} = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) =>{
      //Image Collect
      const imageFile = data.photo[0];
      // console.log('After Image Upload', imageFile);
       registerUser(data.email, data.password)
       .then(result=>{
        const user = result.user;
        //Store Image
         const formData = new FormData();
        formData.append("image", imageFile);
        // Upload image to ImageBB
        const imageAPIUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`
        axios.post(
          imageAPIUrl,
          formData
        ).then( res=>{
          // console.log('After Image Upload', res.data.data.url);
          //Backend Data Send Here
           const userInfo = {
             displayName: data.name,
             email: data.email,
             photoURL: res.data.data.url,

           }
            axiosSecure.post('/users', userInfo)
            .then((res)=>{
              // console.log('Insert Data ', res.data);
              if(res.data.insertedId){
                console.log('User Created In the database.');
              }
            })
          //Backend Data Send Here
 
          updateProfile(user,{
              displayName: data.name,
              photoURL: res.data.data.url,
            })

        })
        // Get ImageBB image URL
      
  
        
        navigate('/login');
        toast.success('Registration Successfully')
        // console.log(user);
       })
       .catch((error)=>{
         if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already registered.");
          } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address.");
          } else if (error.code === "auth/weak-password") {
            toast.error("Password should be at least 6 characters.");
          } else {
            toast.error("Registration Failed");
          }

         console.log(error.code, error.message);
       })
    }


   

    return (
        <div >
              <div className="w-full max-w-md">
                {/* Heading */}
                <h1 className="text-5xl font-bold text-black">Create an Account</h1>
                <p className="mt-2 text-gray-500">Register with ZapShift</p>
        
                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleRegister)}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Name
                    </label>
        
                    <input
                      type="text"
                      placeholder="Name"
                      {...register('name', {required: true})}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                    />
                    {
                        errors.name?.type === 'required' && (
                             <p className='text-red-500'>
                            Name is Required?
                            </p>
                        )
                    }   
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Photo
                    </label>
        
                    <input
                      type="file"
                      placeholder="photo"
                      {...register('photo', {required: true})}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none file-input focus:border-primary"
                    />
                    {
                        errors.photo?.type === 'required' && (
                             <p className='text-red-500'>
                            Photo is Required?
                            </p>
                        )
                    }   
                  </div>
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
        
                  {/* Password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Password
                    </label>
        
                    <input
                      type="password"
                      placeholder="Password"
                       {...register('password', {required: true,  minLength: 6})}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                    />
                     {
                        errors.password?.type === 'required' && (
                             <p className='text-red-500'>
                              Password is Required?
                            </p>
                        )
                    } 
                    {
                      errors.password?.type === 'minLength' && (
                             <p className='text-red-500'>
                              Password must be 6 Charectures or longer.
                            </p>
                        )
                    }
                  </div>
        
                  {/* Forgot Password */}
                  <div>
                    <Link
                      to='/login'
                      className="text-sm text-gray-500 hover:text-primary hover:underline"
                    >
                      Forget Password?
                    </Link>
                  </div>
        
                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full h-12 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
                  >
                    Register
                  </button>
                </form>
        
                {/* Register */}
                <p className="text-center text-gray-500 mt-6">
                  Don't have any account?{" "}
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

export default Register;