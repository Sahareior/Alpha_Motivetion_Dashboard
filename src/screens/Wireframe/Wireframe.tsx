import { ChevronDownIcon, FilterIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Wireframe = (): JSX.Element => {
  const metricCards = [
    {
      title: "Total Revenue",
      value: "$54,350",
      icon: "/group-3.png",
    },
    {
      title: "Total Users",
      value: "8,249",
      icon: "/group-3-1.png",
    },
    {
      title: "Active Users",
      value: "5,248",
      icon: "/group-3-2.png",
    },
    {
      title: "Premium Conversion",
      value: "24.8%",
      icon: "/group-3-3.png",
    },
  ];

  const chartDataPoints = [
    { top: "top-[777px]", left: "left-[199px]" },
    { top: "top-[633px]", left: "left-64" },
    { top: "top-[641px]", left: "left-[342px]" },
    { top: "top-[535px]", left: "left-[409px]" },
    { top: "top-[545px]", left: "left-[468px]" },
    { top: "top-[590px]", left: "left-[545px]" },
    { top: "top-[720px]", left: "left-[619px]" },
    { top: "top-[430px]", left: "left-[746px]" },
    { top: "top-[566px]", left: "left-[788px]" },
    { top: "top-[633px]", left: "left-[928px]" },
    { top: "top-[623px]", left: "left-[1021px]" },
    { top: "top-[480px]", left: "left-[1087px]" },
    { top: "top-[583px]", left: "left-[1194px]" },
    { top: "top-[470px]", left: "left-[1285px]" },
  ];

  const monthLabels = [
    { label: "Jan", left: "left-[126px]" },
    { label: "Feb", left: "left-[227px]" },
    { label: "Mar", left: "left-[328px]" },
    { label: "Apr", left: "left-[433px]" },
    { label: "May", left: "left-[535px]" },
    { label: "Jun", left: "left-[642px]" },
    { label: "Jul", left: "left-[745px]" },
    { label: "Aug", left: "left-[841px]" },
    { label: "Sep", left: "left-[945px]" },
    { label: "Oct", left: "left-[1048px]" },
    { label: "Nov", left: "left-[1149px]" },
    { label: "Dec", left: "left-[1254px]" },
  ];

  const yAxisLabels = [
    { value: "$10000", top: "top-[411px]", left: "left-[43px]" },
    { value: "$8000", top: "top-[484px]", left: "left-[52px]" },
    { value: "$6000", top: "top-[555px]", left: "left-[52px]" },
    { value: "$4000", top: "top-[627px]", left: "left-12" },
    { value: "$2000", top: "top-[698px]", left: "left-12" },
    { value: "0", top: "top-[771px]", left: "left-[90px]" },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const barChartData = [
    {
      day: "Mon",
      freeHeight: "h-[106px]",
      premiumHeight: "h-[158px]",
      freeTop: "top-[1235px]",
      premiumTop: "top-[1183px]",
      freeLeft: "left-[181px]",
      premiumLeft: "left-[209px]",
    },
    {
      day: "Tue",
      freeHeight: "h-[88px]",
      premiumHeight: "h-[204px]",
      freeTop: "top-[1253px]",
      premiumTop: "top-[1137px]",
      freeLeft: "left-[284px]",
      premiumLeft: "left-[312px]",
    },
    {
      day: "Wed",
      freeHeight: "h-[117px]",
      premiumHeight: "h-[168px]",
      freeTop: "top-[1224px]",
      premiumTop: "top-[1173px]",
      freeLeft: "left-[381px]",
      premiumLeft: "left-[409px]",
    },
    {
      day: "Thu",
      freeHeight: "h-[88px]",
      premiumHeight: "h-[137px]",
      freeTop: "top-[1253px]",
      premiumTop: "top-[1204px]",
      freeLeft: "left-[482px]",
      premiumLeft: "left-[510px]",
    },
    {
      day: "Fri",
      freeHeight: "h-[148px]",
      premiumHeight: "h-[230px]",
      freeTop: "top-[1193px]",
      premiumTop: "top-[1111px]",
      freeLeft: "left-[573px]",
      premiumLeft: "left-[601px]",
    },
    {
      day: "Sat",
      freeHeight: "h-[117px]",
      premiumHeight: "h-[168px]",
      freeTop: "top-[1224px]",
      premiumTop: "top-[1173px]",
      freeLeft: "left-[657px]",
      premiumLeft: "left-[685px]",
    },
    {
      day: "Sun",
      freeHeight: "h-[117px]",
      premiumHeight: "h-[195px]",
      freeTop: "top-[1224px]",
      premiumTop: "top-[1146px]",
      freeLeft: "left-[746px]",
      premiumLeft: "left-[774px]",
    },
  ];

  const userActivityYLabels = [
    { value: "75", top: "top-[1076px]" },
    { value: "60", top: "top-[1127px]" },
    { value: "45", top: "top-[1178px]" },
    { value: "30", top: "top-[1229px]" },
    { value: "15", top: "top-[1280px]" },
    { value: "0", top: "top-[1331px]" },
  ];

  return (
    <div className="bg-[#232d3b] overflow-hidden w-full min-w-[1440px] h-[1450px] relative">
      <div className="absolute top-[74px] left-[74px] w-[1393px] h-[1361px]">
        <div className="absolute top-0 left-0 w-[1351px] h-[1361px] bg-white rounded-[20px]" />

        <div className="absolute top-8 left-[30px] w-44 [font-family:'SF_Pro-Semibold',Helvetica] font-normal text-[#353535] text-[32px] tracking-[0] leading-[normal]">
          Dashboard 
        </div>

        <div className="absolute top-[85px] left-[30px] w-[249px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-[#353535] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
          Welcome back, Shivted!
        </div>

        <div className="absolute top-[148px] left-[30px] flex gap-[30px]">
          {metricCards.map((card, index) => (
            <Card
              key={index}
              className="w-[304px] h-[130px] shadow-[0px_0px_10px_#0000001a] rounded-[19.12px]"
            >
              <CardContent className="flex items-center justify-between p-[25px]">
                <div className="flex flex-col gap-[15px]">
                  <div className="[font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#353535] text-xl tracking-[0] leading-[normal]">
                    {card.title}
                  </div>
                  <div className="[font-family:'SF_Pro-Semibold',Helvetica] font-normal text-[#303030] text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
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

        <Card className="absolute top-[308px] left-[30px] w-[1300px] h-[576px] shadow-[0px_0px_10px_#0000001a] rounded-[15px]">
          <CardContent className="p-0 relative">
            <div className="absolute top-[30px] left-[30px] w-[330px] [font-family:'SF_Pro-Semibold',Helvetica] font-normal text-black text-[32px] leading-[normal] tracking-[0] whitespace-nowrap">
              Revenue Trend
            </div>

            <Button
              variant="outline"
              className="absolute top-[34px] left-[1109px] w-[153px] h-[46px] gap-[19px] rounded-[10px] border-black h-auto"
            >
              <FilterIcon className="w-4 h-4" />
              <span className="[font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
                FilterIcon
              </span>
              <ChevronDownIcon className="w-4 h-3" />
            </Button>

            <img
              className="absolute top-[409px] left-[96px] w-[1164px] h-0.5"
              alt="Line"
              src="/line-4.svg"
            />

            <img
              className="absolute top-[267px] left-[96px] w-[1164px] h-0.5"
              alt="Line"
              src="/line-4.svg"
            />

            <img
              className="absolute top-[340px] left-[96px] w-[1164px] h-0.5"
              alt="Line"
              src="/line-4.svg"
            />

            <img
              className="absolute top-[196px] left-[96px] w-[1164px] h-0.5"
              alt="Line"
              src="/line-4.svg"
            />

            <img
              className="absolute top-[125px] left-[99px] w-[1163px] h-[356px]"
              alt="Vector"
              src="/vector-1.svg"
            />

            <img
              className="absolute top-[481px] left-[96px] w-[1164px] h-0.5"
              alt="Line"
              src="/line-4.svg"
            />

            <img
              className="absolute top-[123px] left-[93px] w-[1167px] h-0.5"
              alt="Line"
              src="/line-5.svg"
            />

            {monthLabels.map((month, index) => (
              <div
                key={index}
                className={`absolute top-[508px] ${month.left} w-[34px] h-10 flex items-center justify-center [font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#1b1b1b] text-xl tracking-[-0.83px] leading-[23.2px]`}
              >
                {month.label}
              </div>
            ))}

            {/* {yAxisLabels.map((label, index) => (
              <div
                key={index}
                className={`absolute ${label.top} ${label.left} h-10 flex items-center justify-center [font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#1b1b1b] text-base text-right tracking-[-0.83px] leading-[23.2px]`}
              >
                {label.value}
              </div>
            ))} */}

            {chartDataPoints.map((point, index) => (
              <div
                key={index}
                className={`absolute ${point.top} ${point.left} w-2.5 h-2.5 bg-[#a5c5f2] rounded-[5px]`}
              />
            ))}

            <div className="absolute top-[173px] left-[322px] w-[136px] h-[47px]">
              <img
                className="absolute top-0 left-0 w-[132px] h-[47px]"
                alt="Rectangle"
                src="/rectangle-19.svg"
              />
              <div className="absolute top-[3px] left-[11px] w-[37px] text-white text-xs leading-[22px] whitespace-nowrap [font-family:'SF_Pro-Medium',Helvetica] font-medium tracking-[0]">
                March
              </div>
              <div className="absolute top-[17px] left-1.5 w-[116px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-white text-xs leading-[22px] tracking-[0] whitespace-nowrap">
                Revenue: $9000
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <img
        className="absolute top-[87px] left-[23px] w-6 h-60"
        alt="Frame"
        src="/frame-1597882610.svg"
      />

      <div className="flex flex-col w-6 items-start gap-[25px] absolute top-[1346px] left-[25px]">
        <img className="relative w-6 h-6" alt="Layer" src="/layer-1.svg" />
        <img
          className="relative self-stretch w-full flex-[0_0_auto]"
          alt="Frame"
          src="/frame-7.svg"
        />
      </div>

      <img
        className="absolute w-[2.78%] h-[2.76%] top-0 left-[95.49%]"
        alt="Group"
        src="/group.png"
      />

      <div className="inline-flex items-center gap-[7px] absolute top-[11px] left-2">
        <img
          className="relative w-14 h-[49px]"
          alt="Clip path group"
          src="/clip-path-group.png"
        />
        <div className="relative flex items-center justify-center w-[147px] h-[29px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-transparent text-[25.5px] tracking-[0] leading-[21.6px]">
          <span className="text-white">Alpha </span>
          <span className="text-[#c9c9c9] text-[15.3px]">Motivation</span>
        </div>
      </div>

      <Card className="absolute top-[988px] left-[107px] w-[726px] h-[415px] shadow-[0px_0px_10px_#0000001a] rounded-[15px]">
        <CardContent className="p-0 relative">
          <div className="absolute top-[30px] left-[30px] [font-family:'SF_Pro-Semibold',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
            User Activity
          </div>

          <img
            className="absolute top-[96px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-8.svg"
          />

          <img
            className="absolute top-[147px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-8.svg"
          />

          <img
            className="absolute top-[198px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-8.svg"
          />

          <img
            className="absolute top-[249px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-8.svg"
          />

          <img
            className="absolute top-[300px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-10.svg"
          />

          <img
            className="absolute top-[351px] left-[70px] w-[620px] h-0.5"
            alt="Line"
            src="/line-10.svg"
          />

          {userActivityYLabels.map((label, index) => (
            <div
              key={index}
              className={`absolute ${label.top} left-[35px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base text-right tracking-[0] leading-[normal] whitespace-nowrap`}
            >
              {label.value}
            </div>
          ))}

          <div className="absolute top-[369px] left-[84px] w-[643px] h-[19px] flex gap-9">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="[font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]"
              >
                {day}
              </div>
            ))}
          </div>

          {barChartData.map((bar, index) => (
            <React.Fragment key={index}>
              <div
                className={`absolute ${bar.freeTop} ${bar.freeLeft} w-[23px] ${bar.freeHeight} bg-[#8b9fba] rounded-[5px_5px_0px_0px]`}
              />
              <div
                className={`absolute ${bar.premiumTop} ${bar.premiumLeft} w-[23px] ${bar.premiumHeight} bg-[#343f4f] rounded-[5px_5px_0px_0px]`}
              />
            </React.Fragment>
          ))}

          <div className="absolute top-[111px] left-[253px] w-32 h-[66px]">
            <img
              className="absolute top-0 left-0 w-[122px] h-[66px]"
              alt="Rectangle"
              src="/rectangle-19.svg"
            />
            <div className="absolute top-[3px] left-2.5 w-[37px] text-white text-xs leading-[22px] whitespace-nowrap [font-family:'SF_Pro-Medium',Helvetica] font-medium tracking-[0]">
              March
            </div>
            <div className="absolute top-[33px] left-1.5 w-[116px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[22px] whitespace-nowrap">
              Premium Users:48
            </div>
            <div className="absolute top-[18px] left-1.5 w-[116px] [font-family:'SF_Pro-Regular',Helvetica] font-normal text-white text-[10px] leading-[22px] tracking-[0] whitespace-nowrap">
              Free Users:32
            </div>
          </div>

          <div className="absolute top-[40px] left-[414px] w-[116px] h-[18px] flex gap-2.5">
            <div className="mt-px w-[19px] h-4 bg-[#8b9fba] rounded-sm" />
            <div className="w-[85px] h-[18px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#303030] text-base leading-4 tracking-[0] whitespace-nowrap">
              Free Users
            </div>
          </div>

          <div className="absolute top-[40px] left-[542px] w-[150px] h-[18px] flex gap-2.5">
            <div className="mt-px w-[19px] h-4 bg-[#343f4f] rounded-sm" />
            <div className="w-[119px] h-[18px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-[#303030] text-base tracking-[0] leading-4 whitespace-nowrap">
              Premium Users
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="absolute top-[988px] left-[863px] w-[541px] h-[415px] shadow-[0px_0px_10px_#0000001a] rounded-[15px]">
        <CardContent className="p-0 relative">
          <div className="absolute top-[30px] left-[30px] [font-family:'SF_Pro-Semibold',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
            Subscription Distribution
          </div>

          <div className="absolute top-[122px] left-[137px] w-[250px] h-[250px] bg-[#343f4f] rounded-[125px]">
            <img
              className="absolute top-0 left-0 w-[161px] h-[250px]"
              alt="Ellipse"
              src="/ellipse-3.svg"
            />
            <img
              className="absolute top-0 left-0 w-[162px] h-[125px]"
              alt="Ellipse"
              src="/ellipse-4.svg"
            />
          </div>

          <div className="absolute top-[222px] left-[392px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-4 whitespace-nowrap">
            Monthly 45%
          </div>

          <div className="absolute top-[341px] left-[63px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-4 whitespace-nowrap">
            One-time 25%
          </div>

          <div className="absolute top-[140px] left-[88px] [font-family:'SF_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-4 whitespace-nowrap">
            Yearly 30
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
