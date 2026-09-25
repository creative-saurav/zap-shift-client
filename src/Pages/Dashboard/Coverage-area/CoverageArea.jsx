import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaTimes, FaMapMarkerAlt, FaRoute, FaEye, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CoverageArea = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    // Tanstack Query
    const {refetch, data: coverage = [] } = useQuery({
        queryKey: ['coverage'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coverage');
            return res.data;
        }
    });

    // Search
    const filteredCoverage = coverage.filter(item =>
        `${item.region} ${item.district} ${item.city} ${item.covered_area?.join(' ')}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredCoverage.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCoverage = filteredCoverage.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    const handleDelete = (id)=>{
        Swal.fire({ 
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/coverage/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Success!",
                                text: `Coverage delete successfully.`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        toast.error('Coverage delete failed!');
                    });
            }
        });
        
    }

    return (
        <div>

            {/* Header + Search */}
           <div className="flex mb-10 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-[#03373D]">
                        Coverage Areas
                    </h2>

                    <p className="mt-2 text-[15px] text-gray-500">
                        Manage and view all delivery coverage areas.
                    </p>
                </div>

                {/* Search + Create */}
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

                    {/* Search */}
                    <div className="relative w-full sm:w-[320px]">
                        <input
                            value={searchText}
                            type="search"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search coverage..."
                            className="
                                h-12 w-full rounded-xl
                                border border-gray-200
                                bg-white pl-12 pr-11
                                text-[15px] text-[#03373D]
                                shadow-sm outline-none
                                placeholder:text-gray-400
                                focus:border-[#CAEB66]
                                focus:ring-4 focus:ring-[#CAEB66]/20
                            "
                        />

                        <FaSearch className="
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-gray-400
                        " />

                        {searchText && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchText('');
                                    setCurrentPage(1);
                                }}
                                className="
                                    absolute right-3 top-1/2
                                    flex h-7 w-7
                                    -translate-y-1/2
                                    items-center justify-center
                                    rounded-full
                                    text-gray-400
                                    hover:bg-gray-100
                                "
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        )}
                    </div>

                    {/* Create Button */}
                    <NavLink to='/dashboard/add-coverage'
                        type="button"
                        className="
                            flex h-12 items-center justify-center
                            gap-2 rounded-xl
                            bg-[#03373D]
                            px-5
                            text-sm font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-[#022b30]
                        "
                    >
                        <FaPlus className="text-sm" />
                        Add Coverage
                    </NavLink>

                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">

                        {/* Table Header */}
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/70">
                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Region
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    District
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    City
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Covered Areas
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Location
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-[#03373D]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {currentCoverage.length > 0 ? (
                                currentCoverage.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-gray-50 transition hover:bg-gray-50/60"
                                    >
                                        {/* Number */}
                                        <td className="px-6 py-5 text-sm text-gray-500">
                                            {index + 1}
                                        </td>

                                        {/* Region */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-[#03373D]" />
                                                <span className="font-medium text-[#03373D]">
                                                    {item.region}
                                                </span>
                                            </div>
                                        </td>

                                        {/* District */}
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {item.district}
                                        </td>

                                        {/* City */}
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {item.city}
                                        </td>

                                        {/* Covered Areas */}
                                        <td className="px-6 py-5">
                                            <div className="flex max-w-[280px] flex-wrap gap-1.5">
                                                {item.covered_area?.map((area, i) => (
                                                    <span
                                                        key={i}
                                                        className="
                                                            rounded-md
                                                            bg-gray-100
                                                            px-2.5 py-1
                                                            text-xs
                                                            font-medium
                                                            text-gray-600
                                                        "
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            <span
                                                className={`
                                                    inline-flex
                                                    rounded-full
                                                    px-3 py-1
                                                    text-xs font-semibold
                                                    capitalize
                                                    ${
                                                        item.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-600'
                                                    }
                                                `}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-5">
                                            <div className="text-xs text-gray-500">
                                                <p>
                                                    Lat: {item.latitude}
                                                </p>
                                                <p className="mt-1">
                                                    Lng: {item.longitude}
                                                </p>
                                            </div>
                                        </td>

                                      {/* Action */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">

                                                {/* View */}
                                                <NavLink to={`/dashboard/edit-coverage/${item._id}`}
                                                   
                                                    title="Edit Coverage"
                                                    className="
                                                        flex h-9 w-9
                                                        items-center justify-center
                                                        rounded-lg
                                                        border border-gray-200
                                                        text-[#03373D]
                                                        transition
                                                        hover:bg-gray-50
                                                    "
                                                >
                                                    <FaEdit className="text-sm" />
                                                </NavLink>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                     onClick={()=>handleDelete(item._id)}
                                                    title="Delete Coverage"
                                                    className="
                                                        flex h-9 w-9
                                                        items-center justify-center
                                                        rounded-lg
                                                        border border-red-100
                                                        text-red-500
                                                        transition
                                                        hover:bg-red-50
                                                    "
                                                >
                                                    <FaTrashAlt className="text-sm" />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <FaMapMarkerAlt className="mb-3 text-3xl text-gray-300" />

                                            <h3 className="text-lg font-semibold text-[#03373D]">
                                                No Coverage Found
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Try searching with a different region, city, or area.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Showing */}
                            <p className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-semibold text-[#03373D]">
                                    {startIndex + 1}
                                </span>
                                {" - "}
                                <span className="font-semibold text-[#03373D]">
                                    {Math.min(startIndex + itemsPerPage, filteredCoverage.length)}
                                </span>
                                {" of "}
                                <span className="font-semibold text-[#03373D]">
                                    {filteredCoverage.length}
                                </span>
                            </p>

                            {/* Pagination */}
                            <div className="flex items-center gap-2">

                                {/* Previous */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                                    }
                                    disabled={currentPage === 1}
                                    className="
                                        rounded-lg border border-gray-200
                                        px-3 py-2
                                        text-sm font-medium text-[#03373D]
                                        transition
                                        hover:bg-gray-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`
                                            h-9 min-w-9 rounded-lg px-3
                                            text-sm font-semibold
                                            transition
                                            ${
                                                currentPage === page
                                                    ? "bg-[#03373D] text-white"
                                                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="
                                        rounded-lg border border-gray-200
                                        px-3 py-2
                                        text-sm font-medium text-[#03373D]
                                        transition
                                        hover:bg-gray-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
};

export default CoverageArea;