import React from "react";
import riderImage from '../../assets/agent-pending.png'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Rider = () => {

   const {
        register,
        handleSubmit,
        control,
        reset 
        // formState: { errors },
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const serviceCenter = useLoaderData();
    const duplicateRegions = serviceCenter.map(c=>c.region);
    const regions = [...new Set(duplicateRegions)];
    // console.log(regions);
    const riderRegions = useWatch({control, name: 'riderRegion'});

    const regionByDistrict = region =>{
        const regionDistricts = serviceCenter.filter(c=>c.region === region);
        const districts = regionDistricts.map(d=>d.district);
        return districts;

    }

    const handleRider = (data) =>{
      // console.log('clicks', data);

        axiosSecure.post('/riders', data)
          .then(()=>{
              toast.success('Your application will be submit successfully.');
              reset();
          })
          .catch(()=>{
              toast.error('Failed to riders apply');
          })
                  
    }


  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          Be a Rider
        </h1>

        <p className="text-gray-500 max-w-2xl mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Form */}
          <div>
            <h2 className="text-3xl font-semibold text-slate-800 mb-6  pb-4">
              Tell us about yourself
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(handleRider)}>
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Your Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Your Email"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Driving License Number
                </label>
                <input
                  type="text"
                  {...register("licenseNumber")}
                  placeholder="Driving License Number"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>

              

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Your Region
                </label>
                <select {...register("riderRegion")} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary">
                  <option>Select your Region</option>
                   {
                      regions.map((r, i)=>  <option key={i} value={r}>{r}</option>)  
                    }
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Your District
                </label>
                <select {...register("riderDistrict")} className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary">
                  <option>Select your District</option>
                  {
                    regionByDistrict(riderRegions).map((d, i)=>  <option key={i} value={d}>{d}</option>)  
                  }
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  NID No
                </label>
                <input
                  type="text"
                  placeholder="NID"
                  {...register("nidNumber")}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Bike Number
                </label>
                <input
                  type="text"
                  placeholder="Bike Number"
                  {...register("bike")}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Bike License
                </label>
                <input
                  type="text"
                  placeholder="Bike License"
                  {...register("bikeLicense")}
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Tell Us About Yourself
                </label>
                <textarea
                  rows="3"
                  {...register("description")}
                  placeholder="Tell Us About Yourself"
                  className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 transition py-3 rounded-md font-semibold"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center items-center">
            <img
              src={riderImage}
              alt="Rider"
              className="max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;