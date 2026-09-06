
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    FaBox,
    FaClock,
    FaCheckCircle,
    FaBoxOpen,
    FaMotorcycle,
    FaMapMarkerAlt,
    FaChartPie,
} from 'react-icons/fa';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveries = [] } = useQuery({
        queryKey: ['pacels-delivery-status'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/states');
            return res.data;
        }
    });

    // Get count by status
    const getCount = (status) => {
        const item = deliveries.find(delivery => delivery._id === status);
        return item?.count || 0;
    };

    // All parcels
    const totalDeliveries = deliveries.reduce(
        (total, delivery) => total + delivery.count,
        0
    );

    const statusCards = [
        {
            title: 'Parcel Created',
            count: getCount('parcel-created'),
            icon: <FaBox />,
            description: 'Newly created parcels',
            bg: 'bg-primary/10',
            iconBg: 'bg-primary',
            text: 'text-gray-800'
        },
        {
            title: 'Pending Pickup',
            count: getCount('pending-pickup'),
            icon: <FaClock />,
            description: 'Waiting for pickup',
            bg: 'bg-orange-50',
            iconBg: 'bg-orange-500',
            text: 'text-orange-600'
        },
        {
            title: 'Rider Accepted',
            count: getCount('rider-accepted'),
            icon: <FaCheckCircle />,
            description: 'Accepted by riders',
            bg: 'bg-blue-50',
            iconBg: 'bg-blue-500',
            text: 'text-blue-600'
        },
        {
            title: 'Parcel Picked Up',
            count: getCount('parcel-picked-up'),
            icon: <FaBoxOpen />,
            description: 'Picked up from sender',
            bg: 'bg-purple-50',
            iconBg: 'bg-purple-500',
            text: 'text-purple-600'
        },
        {
            title: 'Out for Delivery',
            count: getCount('out-for-delivery'),
            icon: <FaMotorcycle />,
            description: 'Currently on the way',
            bg: 'bg-yellow-50',
            iconBg: 'bg-yellow-500',
            text: 'text-yellow-600'
        },
        {
            title: 'Delivered',
            count: getCount('delivered'),
            icon: <FaMapMarkerAlt />,
            description: 'Successfully delivered',
            bg: 'bg-green-50',
            iconBg: 'bg-green-500',
            text: 'text-green-600'
        }
    ];

    const delivered = getCount('delivered');

    const getPercentage = (count) => {
        if (!totalDeliveries) return 0;
        return Math.round((count / totalDeliveries) * 100);
    };


   const getPieChartData = (data) => {
        const statusNames = {
            'parcel-created': 'Parcel Created',
            'pending-pickup': 'Pending Pickup',
            'rider-accepted': 'Rider Accepted',
            'parcel-picked-up': 'Parcel Picked Up',
            'out-for-delivery': 'Out for Delivery',
            'delivered': 'Delivered'
        };

        return data
            .filter(item => item._id !== null)
            .map(item => ({
                name: statusNames[item._id] || item._id,
                value: item.count
            }));
    };


return (
    <div className="space-y-7">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                        <FaChartPie className="text-2xl text-black" />
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Admin Overview
                        </p>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                            Delivery Management
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Monitor your parcel delivery activities in real-time
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                    <span className="text-sm font-medium text-gray-600">
                        System Active
                    </span>
                </div>

            </div>
        </div>


        {/* ================= STATUS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">

            {statusCards.map((card, index) => (

                <div
                    key={index}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                {card.title}
                            </p>

                            <h2 className={`text-3xl font-bold mt-3 ${card.text}`}>
                                {card.count}
                            </h2>
                        </div>

                        <div
                            className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-110 transition-transform duration-300`}
                        >
                            {card.icon}
                        </div>

                    </div>


                    <div className="mt-5">

                        <div className="flex justify-between items-center mb-2">

                            <span className="text-xs text-gray-400">
                                {card.description}
                            </span>

                            <span className="text-xs font-semibold text-gray-500">
                                {getPercentage(card.count)}%
                            </span>

                        </div>

                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">

                            <div
                                className={`h-full rounded-full ${card.iconBg} transition-all duration-700`}
                                style={{
                                    width: `${getPercentage(card.count)}%`
                                }}
                            ></div>

                        </div>

                    </div>

                </div>

            ))}

        </div>


        {/* ================= MAIN ANALYTICS ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">


            {/* ================= DELIVERY PROGRESS ================= */}
            <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-7">

                <div className="flex items-start justify-between mb-8">

                    <div>
                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-bold text-gray-900">
                                Delivery Progress
                            </h2>

                            <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                                Live
                            </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            Current parcel delivery status
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <FaChartPie className="text-gray-400" />
                    </div>

                </div>


                <div className="space-y-7">

                    {statusCards
                        .filter(card => card.title !== 'Unknown Status')
                        .map((card, index) => (

                            <div key={index}>

                                <div className="flex justify-between items-center mb-2.5">

                                    <div className="flex items-center gap-3">

                                        <div
                                            className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.text}`}
                                        >
                                            {React.cloneElement(card.icon, {
                                                className: "text-sm"
                                            })}
                                        </div>

                                        <span className="text-sm font-medium text-gray-700">
                                            {card.title}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <span className="text-sm font-bold text-gray-900">
                                            {card.count}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            ({getPercentage(card.count)}%)
                                        </span>

                                    </div>

                                </div>


                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                                    <div
                                        className={`h-full rounded-full ${card.iconBg} transition-all duration-700`}
                                        style={{
                                            width: `${getPercentage(card.count)}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        ))}

                </div>

            </div>


            {/* ================= TOTAL SUMMARY ================= */}
            <div className="relative overflow-hidden bg-secondary rounded-3xl p-7 text-white shadow-sm">

                {/* Decorative circles */}
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-primary/10"></div>

                <div className="absolute -right-20 bottom-0 w-48 h-48 rounded-full bg-primary/5"></div>


                <div className="relative">

                    <div className="flex items-center justify-between">

                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                            <FaBox className="text-xl text-black" />
                        </div>

                        <span className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-gray-300">
                            All Parcels
                        </span>

                    </div>


                    <p className="text-gray-400 text-sm mt-8">
                        Total Parcels
                    </p>

                    <h2 className="text-5xl md:text-6xl font-bold mt-2 tracking-tight">
                        {totalDeliveries}
                    </h2>


                    <p className="text-gray-400 text-sm mt-4 leading-6">
                        Total parcels currently processed through your delivery system.
                    </p>


                    {/* Divider */}
                    <div className="border-t border-white/10 my-7"></div>


                    {/* Successful Delivery */}
                    <div>

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <div className="w-2 h-2 rounded-full bg-primary"></div>

                                <span className="text-sm text-gray-400">
                                    Successful Delivery
                                </span>

                            </div>

                            <span className="text-lg font-bold text-primary">
                                {getPercentage(delivered)}%
                            </span>

                        </div>


                        <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden">

                            <div
                                className="bg-primary h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${getPercentage(delivered)}%`
                                }}
                            ></div>

                        </div>

                    </div>


                    {/* Bottom Stats */}
                    <div className="grid grid-cols-2 gap-3 mt-7">

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-xs text-gray-500">
                                Delivered
                            </p>

                            <p className="text-xl font-bold mt-1">
                                {delivered}
                            </p>
                        </div>


                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-xs text-gray-500">
                                Remaining
                            </p>

                            <p className="text-xl font-bold mt-1">
                                {totalDeliveries - delivered}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>


        {/* ================= PIE CHART ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-7">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

                <div>

                    <div className="flex items-center gap-3">

                        <h2 className="text-xl font-bold text-gray-900">
                            Parcel Status Distribution
                        </h2>

                        <span className="hidden sm:block px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                            Overview
                        </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        Visual breakdown of your current parcel delivery status
                    </p>

                </div>


                <div className="flex items-center gap-2 text-sm text-gray-500">

                    <span className="w-2 h-2 rounded-full bg-primary"></span>

                    <span>
                        {totalDeliveries} Total Parcels
                    </span>

                </div>

            </div>


            <div className="w-full h-[420px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={getPieChartData(deliveries)}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="45%"
                            outerRadius={125}
                            innerRadius={70}
                            paddingAngle={3}
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            isAnimationActive={true}
                        >

                            {getPieChartData(deliveries).map((entry, index) => (

                                <Cell
                                    key={`cell-${index}`}
                                    fill={[
                                        '#CAEB66',
                                        '#F97316',
                                        '#3B82F6',
                                        '#A855F7',
                                        '#EAB308',
                                        '#22C55E'
                                    ][index % 6]}
                                />

                            ))}

                        </Pie>


                        <Tooltip
                            formatter={(value, name) => [
                                `${value} Parcels`,
                                name
                            ]}
                            contentStyle={{
                                borderRadius: '14px',
                                border: 'none',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                padding: '10px 14px'
                            }}
                        />


                        <Legend
                            verticalAlign="bottom"
                            height={55}
                            iconType="circle"
                            wrapperStyle={{
                                fontSize: '13px'
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>
);


};

export default AdminDashboard;
