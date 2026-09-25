

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    //Tanstack Query
    const {data : parcels = [], refetch} = useQuery({
      queryKey : ['allParcels',searchText],
        queryFn: async() =>{
          const res = await axiosSecure.get(`/allParcels?searchText=${searchText}`);
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
                    text: "Parcels has been deleted.",
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

              {/* Header + Search */}
      <div className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-[#03373D]">All Parcels</h2>

            <p className="mt-2 text-[15px] text-gray-500">
              Manage and track all parcels from one place.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[360px]">
            <input
              value={searchText}
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search parcels..."
              className="
                                h-12 w-full
                                rounded-xl
                                border border-gray-200
                                bg-white
                                pl-12 pr-11
                                text-[15px] text-[#03373D]
                                shadow-sm
                                outline-none
                                transition-all duration-200
                                placeholder:text-gray-400
                                focus:border-[#CAEB66]
                                focus:ring-4 focus:ring-[#CAEB66]/20
                            "
            />

            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Parcels Count */}
        <div className="mt-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-medium text-gray-500">
              Total Parcels
            </span>

            <span
              className="
                            inline-flex
                            min-w-8 h-8
                            items-center justify-center
                            rounded-lg
                            bg-[#03373D]
                            px-3
                            text-sm font-semibold
                            text-white
                        "
            >
              {parcels.length}
            </span>
          </div>

          {/* {searchText && (
            <p className="text-sm text-gray-400">
              Searching for{" "}
              <span className="font-medium text-[#03373D]">"{searchText}"</span>
            </p>
          )} */}
        </div>
      </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">

          <table className="w-full min-w-[800px]">

            {/* Header */}
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200">

                <th className="text-left px-4 py-3 text-[16px] font-medium text-[#333]">
                  ID
                </th>
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
                        {index + 1}
                        </td>
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
                              : <span className="btn btn-sm btn-primary text-black">Un Paid</span>
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

export default AllParcels;