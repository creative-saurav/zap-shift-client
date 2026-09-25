import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    FaMapMarkerAlt,
    FaPlus,
    FaTrash,
    FaLink,
    FaGlobeAsia,
    FaSave,
    FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddCoverage = () => {
    const [coveredAreas, setCoveredAreas] = useState(['']);
    const navigate = useNavigate();

    const addArea = () => {
        setCoveredAreas([...coveredAreas, '']);
    };

    const removeArea = (index) => {
        setCoveredAreas(
            coveredAreas.filter((_, i) => i !== index)
        );
    };

    const handleAreaChange = (index, value) => {
        const updatedAreas = [...coveredAreas];
        updatedAreas[index] = value;
        setCoveredAreas(updatedAreas);
    };
     const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

        const handleCoverage = (data) => {
            const coverageData = {
                ...data,
                covered_area: coveredAreas.filter(
                    area => area.trim() !== ''
                ),
            };

            axiosSecure.post('/coverage', coverageData)
                .then(() => {
                    toast.success('Coverage created successfully.');
                    reset();
                    setCoveredAreas(['']);
                })
                .catch(() => {
                    toast.error('Failed to create coverage.');
                });
        };



    return (
        <div >

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    Add Coverage
                </h2>

                <p className="mt-2 text-[15px] text-gray-500">
                    Add a new delivery coverage area.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleCoverage)}>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">

                    {/* Location Information */}
                    <div className="mb-7">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03373D]/10 text-[#03373D]">
                                <FaMapMarkerAlt />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#03373D]">
                                    Location Information
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Enter the location details for this coverage.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                            {/* Region */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    Region
                                </label>

                                <input
                                    name="region"
                                    {...register("region")}
                                    type="text"
                                    placeholder="e.g. Dhaka"
                                    required
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                />
                            </div>

                            {/* District */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    District
                                </label>

                                <input
                                    name="district"
                                     {...register("district")}
                                    type="text"
                                    placeholder="e.g. Dhaka"
                                    required
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    City
                                </label>

                                <input
                                    name="city"
                                     {...register("city")}
                                    type="text"
                                    placeholder="e.g. Dhaka"
                                    required
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                />
                            </div>

                        </div>
                    </div>

                    {/* Covered Areas */}
                    <div className="border-t border-gray-100 pt-7">

                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#03373D]">
                                    Covered Areas
                                </h3>

                                <p className="mt-1 text-sm text-gray-400">
                                    Add the areas covered by this delivery zone.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addArea}
                                className="
                                    flex items-center gap-2
                                    rounded-lg
                                    bg-[#03373D]
                                    px-4 py-2
                                    text-xs font-semibold
                                    text-white
                                    transition
                                    hover:opacity-90
                                "
                            >
                                <FaPlus />
                                Add Area
                            </button>
                        </div>

                        <div className="space-y-3">
                            {coveredAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="text"
                                        value={area}
                                        onChange={(e) =>
                                            handleAreaChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Area ${index + 1}, e.g. Uttara`}
                                        required
                                        className="
                                            h-11 flex-1 rounded-xl
                                            border border-gray-200
                                            bg-white px-4
                                            text-sm text-[#03373D]
                                            outline-none
                                            transition
                                            placeholder:text-gray-400
                                            focus:border-[#CAEB66]
                                            focus:ring-4 focus:ring-[#CAEB66]/20
                                        "
                                    />

                                    {coveredAreas.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArea(index)}
                                            className="
                                                flex h-11 w-11
                                                items-center justify-center
                                                rounded-xl
                                                border border-red-100
                                                text-red-500
                                                transition
                                                hover:bg-red-50
                                            "
                                            title="Remove Area"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status + Flowchart */}
                    <div className="mt-7 border-t border-gray-100 pt-7">

                        <div className="mb-5">
                            <h3 className="text-lg font-semibold text-[#03373D]">
                                Coverage Settings
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                Configure the coverage status and flowchart.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    Status
                                </label>

                                <select
                                    name="status"
                                     {...register("status")}
                                    defaultValue="active"
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                >
                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            {/* Flowchart */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    Flowchart URL
                                </label>

                                <div className="relative">
                                    <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        name="flowchart"
                                         {...register("flowchart")}
                                        type="url"
                                        placeholder="https://example.com/flowchart.png"
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-gray-200
                                            bg-white pl-11 pr-4
                                            text-sm text-[#03373D]
                                            outline-none
                                            transition
                                            placeholder:text-gray-400
                                            focus:border-[#CAEB66]
                                            focus:ring-4 focus:ring-[#CAEB66]/20
                                        "
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Coordinates */}
                    <div className="mt-7 border-t border-gray-100 pt-7">

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03373D]/10 text-[#03373D]">
                                <FaGlobeAsia />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#03373D]">
                                    Location Coordinates
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Add the latitude and longitude of the area.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Latitude */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    Latitude
                                </label>

                                <input
                                    name="latitude"
                                     {...register("latitude")}
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 23.8103"
                                    required
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                />
                            </div>

                            {/* Longitude */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#03373D]">
                                    Longitude
                                </label>

                                <input
                                    name="longitude"
                                     {...register("longitude")}
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 90.4125"
                                    required
                                    className="
                                        h-12 w-full rounded-xl
                                        border border-gray-200
                                        bg-white px-4
                                        text-sm text-[#03373D]
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-[#CAEB66]
                                        focus:ring-4 focus:ring-[#CAEB66]/20
                                    "
                                />
                            </div>

                        </div>
                    </div>

                    {/* Submit */}
                    {/* Buttons */}
                    <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">

                        {/* Back */}
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/coverage-area')}
                            className="
                                flex items-center gap-2
                                rounded-xl
                                border border-gray-200
                                bg-white
                                px-6 py-3
                                text-sm font-semibold
                                text-[#03373D]
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <FaArrowLeft />
                            Back
                        </button>

                        {/* Create */}
                        <button
                            type="submit"
                            className="
                                flex items-center gap-2
                                rounded-xl
                                bg-[#03373D]
                                px-6 py-3
                                text-sm font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:opacity-90
                            "
                        >
                            <FaSave />
                            Create Coverage
                        </button>

                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddCoverage;