import React, { useEffect } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import RevenueTrend from './_components/RevenewTrends';
import { AnalyticsDashboard } from './_components/AnalyticsDashboard';
import { useDashBoardOverviewQuery, useDashboardStatsQuery, useProfileQuery } from '../../../store/slices/apiSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const DashHome = () => {
const {data:dashboardStats} =  useDashBoardOverviewQuery()
const {data: newStats, error} = useDashboardStatsQuery()
const {data:profileData} = useProfileQuery()
const navigate = useNavigate()




useEffect(() => {
  if (error?.status === 401) {
    console.error("Error fetching dashboard stats:", error);

    Swal.fire({
      title: "Session Expired",
      text: "Your login session has expired. Please log in again.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#000", // or your theme color
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token1212");
        navigate("/login", { replace: true });
      }
    });
  }
}, [error]);

console.log(newStats,'this is stats')
      const metricCards = [
    {
      title: "Total Revenue",
      value: newStats?.total_revenue,
      icon: "/group-3.png",
    },
    {
      title: "Total Users",
      value: newStats?.total_users,
      icon: "/group-3-1.png",
    },
    {
      title: "Active Users",
      value: newStats?.total_active_users,
      icon: "/group-3-2.png",
    },
    {
      title: "Premium Conversion",
      value: newStats?.premium_conversion_percentage,
      icon: "/group-3-3.png",
    },
  ];



    return (
        <div>

<div className='my-9 md:mx-5'>
            <h2 className='text-[32px] font-semibold'>Dashboard</h2>
          <p className='text-[20px] font-normal'>Welcome back, {profileData?.first_name}</p>
</div>
                    <div className=" grid md:grid-cols-4 grid-cols-1 gap-4 justify-items-center">
                      {metricCards.map((card, index) => (
                        <Card
                          key={index}
                          className="w-full  h-[160px] shadow-[0px_0px_10px_#0000001a] rounded-[19.12px]"
                        >
                          <CardContent className="flex items-center justify-between p-[25px]">
                            <div className="flex flex-col gap-[15px]">
                              <div className="[font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#353535] text-xl tracking-[0] leading-[normal]">
                                {card.title}
                              </div>
                              <div className="[font-family:'SF_Pro-Semibold',Helvetica] font-semibold text-[#303030] text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
                                {card.value}
                              </div>
                            </div>
                            <img
                              className="w-[57.35px] h-[58.52px]"
                              alt="Group"
                              src={card.icon}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <RevenueTrend />
                    <AnalyticsDashboard />
        </div>
    );
};

export default DashHome;