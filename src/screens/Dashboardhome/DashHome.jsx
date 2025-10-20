import React from 'react';
import { Card, CardContent } from "../../components/ui/card";
import RevenueTrend from './_components/RevenewTrends';
import { AnalyticsDashboard } from './_components/AnalyticsDashboard';
import { useDashBoardOverviewQuery, useDashboardStatsQuery } from '../../../store/slices/apiSlice';


const DashHome = () => {
const {data:dashboardStats} =  useDashBoardOverviewQuery()
const {data: newStats} = useDashboardStatsQuery()

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

<div className='my-9 mx-5'>
            <h2 className='text-[32px] font-semibold'>Dashboard</h2>
          <p className='text-[20px] font-normal'>Welcome back, Sijan</p>
</div>
                    <div className=" grid grid-cols-4 gap-4 justify-items-center">
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