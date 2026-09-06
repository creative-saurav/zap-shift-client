import React from "react";
import { set, useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        control,
        reset 
        // formState: { errors },
    } = useForm({
        defaultValues: {
            parcelType: "document",
        },
    });
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

    const serviceCenter = useLoaderData();
    const duplicateRegions = serviceCenter.map(c=>c.region);
    const regions = [...new Set(duplicateRegions)];
    // console.log(regions);
    const senderRegions = useWatch({control, name: 'senderRegion'});
    const reciverRegions = useWatch({control, name: 'reciverRegion'});

    const regionByDistrict = region =>{
        const regionDistricts = serviceCenter.filter(c=>c.region === region);
        const districts = regionDistricts.map(d=>d.district);
        return districts;

    }


    const handleSendParcel = (data) => {
        // console.log(data);
        const isDocument = data.parcelType === 'document';
        const isSameDistricts = data.senderRegion === data.reciverRegion;
        const percelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if(isDocument){
            cost = isSameDistricts ? 60 : 80;
        }else{
            if(percelWeight < 3){
                cost = isSameDistricts ? 110 : 150;
            }else{
                const minCharge = isSameDistricts ? 110 : 150;
                const extraWeight = percelWeight - 3;
                const extraCharge = isSameDistricts ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        // const trackingNumber = `ZP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const parcelData = {
            ...data,
            cost: cost,
            // trackingNumber: trackingNumber
        };

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charge ${cost} Taka.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
            }).then((result) => {
                if (result.isConfirmed) 
                    axiosSecure.post('/parcels', parcelData)
                    .then(()=>{
                        // console.log('After Parcels store',result.data )
                        navigate('/dashboard/my-parcels');
                        toast.success('Parcels Booked Successfully');
                        reset();
                    })
                    .catch(()=>{
                        toast.error('Failed to book parcel');
                    })
            });


    };

    return (
        <div className=" py-6 px-2 sm:px-4 lg:px-6">
            <div className="w-full rounded-[22px] bg-white px-6 py-10 sm:px-10 lg:px-[68px] lg:py-[52px]">

                {/* Heading */}
                <h1 className="text-[32px] sm:text-[38px] lg:text-[36px] font-bold leading-tight text-[#03373D]">
                    Send A Parcel
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleSendParcel)}
                    className="mt-8"
                >

                    {/* Section Title */}
                    <h2 className="text-[17px] font-bold text-[#03373D]">
                        Enter your parcel details
                    </h2>

                    {/* Divider */}
                    <div className="mt-4 border-t border-gray-200"></div>

                    {/* Parcel Type */}
                    <div className="flex items-center gap-7 mt-4 mb-5">

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="document"
                                {...register("parcelType")}
                                className="radio radio-xs border-2 border-green-500 checked:bg-green-500 checked:text-white"
                            />
                            <span className="text-[18px] sm:text-[18px] text-[#03373D]">
                                Document
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("parcelType")}
                                className="radio radio-xs border-2 border-gray-300 checked:bg-primary checked:text-white"
                            />
                            <span className="text-[18px] sm:text-[18px] text-[#03373D]">
                                Non-Document
                            </span>
                        </label>

                    </div>

                    {/* Parcel Name & Weight */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                Parcel Name
                            </label>

                            <input
                                type="text"
                                placeholder="Parcel Name"
                                {...register("parcelName")}
                                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                Parcel Weight (KG)
                            </label>

                            <input
                                type="number"
                                placeholder="Parcel Weight (KG)"
                                {...register("parcelWeight")}
                                className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                            />
                        </div>

                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* Sender & Receiver */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 lg:gap-x-8">

                        {/* Sender Details */}
                        <div>
                            <h3 className="text-[18px] font-bold text-[#03373D] mb-5">
                                Sender Details
                            </h3>

                            {/* Sender Name */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Sender Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    {...register("senderName")}
                                    defaultValue={user?.displayName}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>
                            {/* Sender Email */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Sender Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Sender Email"
                                    {...register("senderEmail")}
                                    defaultValue={user?.email}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                            {/* Address */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("senderAddress")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                            {/* Phone */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Sender Phone No
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Sender Phone No"
                                    {...register("senderPhone")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                            {/* Sender Regions */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Sender Regions
                                </label>

                                <select
                                    {...register("senderRegion")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                >
                                    <option value="">
                                        Pick a region
                                    </option>
                                    {
                                      regions.map((r, i)=>  <option key={i} value={r}>{r}</option>)  
                                    }
                                   
                                   
                                </select>
                            </div>
                            {/*Sender  District */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Sender District
                                </label>

                                <select
                                    {...register("senderDistrict")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                >
                                    <option value="">
                                        Pick a district
                                    </option>
                                    {
                                      regionByDistrict(senderRegions).map((d, i)=>  <option key={i} value={d}>{d}</option>)  
                                    }
                                   
                                   
                                </select>
                            </div>

                            {/* Pickup Instruction */}
                            <div>
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Pickup Instruction
                                </label>

                                <textarea
                                    placeholder="Pickup Instruction"
                                    {...register("pickupInstruction")}
                                    className="w-full h-12 px-4 border textarea  border-gray-300 rounded-md outline-none focus:border-primary"
                                ></textarea>
                            </div>

                        </div>

                        {/* Receiver Details */}
                        <div className="mt-7 md:mt-0">

                            <h3 className="text-[18px] font-bold text-[#03373D] mb-5">
                                Receiver Details
                            </h3>

                            {/* Receiver Name */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Receiver Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    {...register("receiverName")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>
                            {/* Receiver Email */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Receiver Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Receiver Email"
                                    {...register("receiverEmail")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                            {/* Receiver Address */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Receiver Address
                                </label>

                                <input
                                    type="text"
                                    placeholder="Address"
                                    {...register("receiverAddress")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                            {/* Contact */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Receiver Contact No
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Receiver Contact No"
                                    {...register("receiverPhone")}
                                    className="w-full textarea  h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                />
                            </div>

                             {/* Reciver Regions */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Reciver Regions
                                </label>

                                <select
                                    {...register("reciverRegion")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                >
                                    <option value="">
                                        Pick a region
                                    </option>
                                    {
                                      regions.map((r, i)=>  <option key={i} value={r}>{r}</option>)  
                                    }
                                   
                                   
                                </select>
                            </div>
                            {/*Reciver  District */}
                            <div className="mb-3">
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Reciver District
                                </label>

                                <select
                                    {...register("reciverDistrict")}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                                >
                                    <option value="">
                                        Pick a district
                                    </option>
                                    {
                                      regionByDistrict(reciverRegions).map((d, i)=>  <option key={i} value={d}>{d}</option>)  
                                    }
                                   
                                   
                                </select>
                            </div>

                            {/* Delivery Instruction */}
                            <div>
                                <label className="block mb-2 text-[16px] font-medium text-[#03373D]">
                                    Delivery Instruction
                                </label>

                                <textarea
                                    placeholder="Delivery Instruction"
                                    {...register("deliveryInstruction")}
                                    className="w-full h-12 px-4 border textarea  border-gray-300 rounded-md outline-none focus:border-primary"
                                ></textarea>
                            </div>

                        </div>

                    </div>

                    {/* Pickup Note */}
                    <p className="mt-7 text-[16px] text-black">
                        * PickUp Time 4pm-7pm Approx.
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 mt-4 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
                    >
                        Proceed to Confirm Booking
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SendParcel;