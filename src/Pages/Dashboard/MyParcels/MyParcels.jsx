import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyParcels = () => {
    const {user} = useAuth();
    // const [parcels, setParcels] = useState([]);
    const axiosSecure = useAxiosSecure();

    // useEffect(()=>{
    //     axiosSecure.get(`/parcels?email=${user.email}`)
    //     .then(data=>setParcels(data.data))
    // },[user])
 //Tanstack Query
    const {data : parcels = [], refetch} = useQuery({
      queryKey : ['myParcels', user?.email],
        queryFn: async() =>{
          const res = await axiosSecure.get(`/parcels?email=${user.email}`);
          return res.data;
        }
      })

    // console.log('My Parcels', parcels);
      const handleParcelsDelete = id =>{
        // console.log('Id Click', id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed)
              axiosSecure.delete(`/parcels/${id}`)
            .then(res=>{
              // console.log('delete data',res.data);
              refetch();
              if(res.data.deletedCount){
                 Swal.fire({
                    title: "Deleted!",
                    text: "Your Parcels has been deleted.",
                    icon: "success"
                  });
              }
            })
            .catch(()=>{
              toast.error('Delete Failed!')
            })
              

          });

      }

  return (
      <div>

        {/* Heading */}
        <h1 className="text-[32px] font-bold text-[#03373D] mb-7">
        All  My Parcels {parcels.length}
        </h1>

        {/* ================= STATUS CARDS ================= */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-7">

    
          <div className="border border-gray-200 rounded-xl h-[78px] px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center">
              <FiPackage className="text-[18px] text-[#555]" />
            </div>

            <div>
              <p className="text-[13px] text-[#333] mb-1">
                Unpaid
              </p>
              <p className="text-[21px] font-bold text-[#27313f] leading-none">
                129
              </p>
            </div>
          </div>


          <div className="border border-gray-200 rounded-xl h-[78px] px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center">
              <FiPackage className="text-[18px] text-[#555]" />
            </div>

            <div>
              <p className="text-[13px] text-[#333] mb-1">
                Ready Pick UP
              </p>
              <p className="text-[21px] font-bold text-[#27313f] leading-none">
                1,325
              </p>
            </div>
          </div>


          <div className="border border-gray-200 rounded-xl h-[78px] px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center">
              <FiPackage className="text-[18px] text-[#555]" />
            </div>

            <div>
              <p className="text-[13px] text-[#333] mb-1">
                In Transit
              </p>
              <p className="text-[21px] font-bold text-[#27313f] leading-none">
                50
              </p>
            </div>
          </div>


          <div className="border border-gray-200 rounded-xl h-[78px] px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center">
              <FiPackage className="text-[18px] text-[#555]" />
            </div>

            <div>
              <p className="text-[13px] text-[#333] mb-1">
                Ready to Deliver
              </p>
              <p className="text-[21px] font-bold text-[#27313f] leading-none">
                50
              </p>
            </div>
          </div>


          <div className="border border-gray-200 rounded-xl h-[78px] px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center">
              <FiPackage className="text-[18px] text-[#555]" />
            </div>

            <div>
              <p className="text-[13px] text-[#333] mb-1">
                Delivered
              </p>
              <p className="text-[21px] font-bold text-[#27313f] leading-none">
                50
              </p>
            </div>
          </div>

        </div> */}


        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">

          <table className="w-full min-w-[800px]">

            {/* Header */}
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200">

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Parcel Info
                </th>

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Recipient Info
                </th>

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Tracking Number
                </th>

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Delivery Status
                </th>

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  Action
                </th>

              </tr>
            </thead>


            <tbody>
            {
                parcels.map((parcel, index)=> 
                 <tr className="bg-white" key={index}>

                        <td className="px-4 py-4 text-[16px] text-[#555]">
                        {parcel.parcelName}
                        </td>

                        <td className="px-4 py-4 text-[16px] text-[#444] leading-[1.5]">
                        <p>{parcel.receiverName}</p>
                        <p>{parcel.reciverRegion}  {parcel.reciverDistrict}</p>
                        <p>{parcel.receiverPhone}</p>
                        </td>

                        <td className="px-4 py-4 text-[16px] text-[#555]">
                         <Link to={`/parcel-tracking/${parcel.trackingId}`}> {parcel.trackingId}</Link>
                        </td>

                        <td className="px-4 py-4 text-[16px] text-[#555]">
                        <p className="mb-2">৳ {parcel.cost} </p>
                        
                        {
                            parcel.paymentStatus === 'paid'
                              ? <span className="btn btn-sm btn-success text-white">Paid</span>
                              : <Link className="btn btn-sm btn-primary text-black" to={`/dashboard/payment/${parcel._id}`}>Pay</Link>
                          }
                        </td>
                        <td className="px-4 py-4 text-[16px] text-[#555]">
                              {parcel.deliveryStatus === 'pending-pickup' ? (
                                  <span className="btn btn-sm btn-warning text-black">
                                      Pending Pickup
                                  </span>
                              ) : parcel.deliveryStatus === 'rider-accepted' ? (
                                  <span className="btn btn-sm btn-info text-white">
                                      Rider Accepted
                                  </span>
                              ) : parcel.deliveryStatus === 'parcel-picked-up' ? (
                                  <span className="btn btn-sm btn-primary text-black">
                                      Parcel Picked Up
                                  </span>
                              ) : parcel.deliveryStatus === 'out-for-delivery' ? (
                                  <span className="btn btn-sm btn-secondary text-white">
                                      Out for Delivery
                                  </span>
                              ) : parcel.deliveryStatus === 'delivered' ? (
                                  <span className="btn btn-sm btn-success text-white">
                                      Delivered
                                  </span>
                              ) : (
                                  <span className="btn btn-sm btn-primary text-black">
                                      Pending
                                  </span>
                              )}
                          </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">

                              {/* View Button */}
                              <NavLink
                                  to={`/dashboard/parcels-details/${parcel._id}`}
                                  title="View Details"
                                  className="btn btn-square hover:bg-primary"
                              >
                                  <FaEye className="text-[17px]" />
                              </NavLink>

                              {/* Delete Button */}
                              <button 
                              onClick={()=>handleParcelsDelete(parcel._id)}
                                  type="button"
                                  title="Delete Parcel"
                                  className="btn btn-square hover:bg-primary"
                              >
                                  <FaTrashAlt className="text-[16px]" />
                              </button>

                          </div>
                      </td>

                    </tr>
                )
            }
             


            </tbody>
          </table>

        </div>
      </div>
  );
};

export default MyParcels;