import { Search } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
 const position = [23.8103, 90.4125];
 const serviceCenter = useLoaderData();
 const mapRef = useRef(null);
//  console.log(serviceCenter);
const handleSearch = e =>{
  e.preventDefault();
  const form = e.target;
  const location = form.location.value;
  const district  =  serviceCenter.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
  if(district){
    const coord = [district.latitude, district.longitude];
    mapRef.current.flyTo(coord, 12);
  }
}


  return (
    <section className=" py-16">
      <div className="shadow bg-white rounded-[32px] px-10 py-14">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-[#03373D] mb-10">
          We are available in 64 districts
        </h2>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-4 max-w-xl">

          <div className="flex items-center w-full bg-gray-100 rounded-full px-5 py-3">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search here district "
              name="location"
              className="w-full bg-transparent outline-none ml-3 text-sm"
            />
          </div>

          <button className="btn bg-primary border-none rounded-full px-8 hover:bg-primary">
            Search
          </button>

        </form>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Sub Heading */}
        <h3 className="text-3xl font-bold text-[#03373D] mb-8">
          We deliver almost all over Bangladesh
        </h3>

        {/* Maps */}
        <div className="">

      <MapContainer 
      center={position}
       zoom={10} 
       scrollWheelZoom={false}
       ref={mapRef}
       className="h-[426px] w-full"
       >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          serviceCenter.map((center , index)=>
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
               <strong>{center.district}</strong> <br /> Service Area -  ( {center.covered_area.join(', ')} )
              </Popup>
            </Marker>
          )
        }
      </MapContainer>


        </div>

      </div>
    </section>
  );
};

export default Coverage;