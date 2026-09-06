import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
   baseURL: "http://localhost:3000",
    //   baseURL: "https://zap-shit-server.vercel.app",
});

const useAxiosSecure = () => {
    const {user , signOutUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        //Request InterCeptor
        //   const reqInterceptor =  axiosSecure.interceptors.request.use(config=>{
        //         config.headers.Authorization = `Bearer ${user?.accessToken}`
        //         return config;
        //     })
           const reqInterceptor = axiosSecure.interceptors.request.use(
            async config => {

                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            }
        );

        //Respons Interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
             (response) => {
                // Do something with response data
                return response;
            },
             (error)=> {
                // console.log(error.status);
                if(error.response?.status === 401 || error.response?.status === 403){
                    signOutUser()
                    .then(()=>{
                        navigate('/login')
                    })
                        .catch(err => {
                            console.log("Signout Error:", err);
                        });
                }
                return Promise.reject(error);
            }
        )
        // const resInterceptor = axiosSecure.interceptors.response.use(
        //         (response) => {
        //             return response;
        //         },
        //         (error) => {
        //             if (
        //                 error.response?.status === 401 ||
        //                 error.response?.status === 403
        //             ) {
        //                 console.log("Unauthorized/Forbidden:", error.response);

        //                 signOutUser()
        //                     .then(() => {
        //                         navigate('/login');
        //                     })
        //                     .catch(err => {
        //                         console.log("Signout Error:", err);
        //                     });
        //             }

        //             return Promise.reject(error);
        //         }
        //     );

         return () =>{
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }


    },[user, navigate , signOutUser])

   
   

     return axiosSecure;
};

export default useAxiosSecure;