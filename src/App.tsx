import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaRegBell } from "react-icons/fa";
import { IoExitSharp, IoSettings } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { LuCrown } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import CommonModal from './screens/Overview/Modal/CommonModal';
// import {useProfileQuery} from '../store/slices/apiSlice.js'
import Swal from "sweetalert2";
import {useUpdateProfileMutation,useProfileQuery} from '../store/slices/apiSlice.js'


const { Header, Sider, Content } = Layout;

interface UserInfo {
  city:string,
  date_of_birth:string,
  email:string,
  first_name:string,
  phone:string,
  profile_photo:string
}


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const { data,refetch } = useProfileQuery<UserInfo>();
  const [updateProfile] = useUpdateProfileMutation()

  console.log(data)

const handelProfileUpdate = async (data) => {
  try {
    const formData = new FormData();
    formData.append("first_name", data?.name || "");

    if (data?.icon instanceof File) {
      formData.append("profile_photo", data.icon);
    }

    const res = await updateProfile(formData).unwrap();
    refetch()
    console.log(res, "Profile update response");
    Swal.fire("Success!", "Profile updated successfully!", "success");
    setModalOpen(false);
  } catch (error) {
    console.error("Error updating profile:", error);
    Swal.fire("Error!", "Failed to update profile.", "error");
  }
};



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  const handelNavigate = () => {
    navigate("/settings");
  };

  const handelLogout =()=>{
     Swal.fire({
    title: "Are you sure?",
    text: "You will be redirected to the settings page.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Absolutely"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token1212')
      navigate("/login");
    }
  });
  }

  const handleCreateBadge = () => {
    setModalType("edit-profile");
    setModalTitle("Personal Informetion");
    setEditingItem(null);
    setModalOpen(true);
  };

  return (
    <Layout style={{ height: '100vh', backgroundColor: "#232D3B" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "#232D3B",
          height: '100vh',
          position: 'relative', // Added for absolute positioning context
        }}
      >
        {/* Main Content Area */}
        <div style={{ 
          height: 'calc(100vh - 100px)', // Reserve space for bottom section
          overflow: 'auto'
        }}>
          <div className="flex mt-3 ml-2 flex-col items-center">
            <img src="/lg.png" className="mx-auto w-[56px] h-[48px]" alt="" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            className="mt-8 space-y-3 bg-[#232D3B]"
            selectedKeys={[location.pathname]}
            items={[
              {
                key: "/",
                icon: <FaRegMessage size={24} className="text-3xl"  />,
                label: <Link to="/">Dashboard Home</Link>,
              },
              {
                key: "/user-management",
                icon: <MdPeopleAlt  size={24} className="text-3xl" />,
                label: <Link to="/user-management">User Management</Link>,
              },
              {
                key: "/notification",
                icon: <FaRegBell size={24} className="text-3xl" />,
                label: <Link to="/notification">Notifications</Link>,
              },
              {
                key: "/overview",
                icon: <SlBadge size={24} className="text-3xl" />,
                label: <Link to="/overview">Overview</Link>,
              },
              {
                key: "/plans",
                icon: <LuCrown size={24} className="text-3xl" />,
                label: <Link to="/plans">Pricing Plans</Link>,
              },
            ]}
          />
        </div>

        {/* Fixed Bottom Section */}
        <div 
          style={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            right: 0,
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '27px',
            flexDirection: 'column',
            backgroundColor: '#232D3B', // Match background
          
          }}
        >
          <IoSettings
            size={22}
            onClick={handelNavigate}
            className="text-white hover:text-[#A6C5F3] mx-auto text-xl cursor-pointer"
          />
          <ImExit 
            size={20}
            onClick={handelLogout}
            className="text-white mr-4 hover:text-[#A6C5F3] mx-auto text-xl cursor-pointer"
          />
        </div>
      </Sider>

      <Layout style={{backgroundColor: "#232D3B"}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            backgroundColor: "#232D3B",
          }}
        >
          <div className="flex justify-between items-center px-3">
            <p className="text-white">
              <span className="text-[25.4px]">Alpha</span>{" "}
              <span className="text-[14px] ml-1 text-[#C9C9C9]">
                Motivation
              </span>
            </p>
            <img
              onClick={handleCreateBadge}
              src={data?.profile_photo}
              className="w-10 h-10 rounded-full cursor-pointer"
              alt=""
            />
          </div>
        </Header>
        <Content
        className="md:p-[29px] p-1"
          style={{
            margin: "4px 0px",
            // padding: 29,
            borderRadius: 20,
            backgroundColor: 'white',
            height: 'calc(100vh - 64px)', // Adjust based on header height
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <CommonModal
      data ={data}
        isOpen={modalOpen}
           onSave={handelProfileUpdate}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        type={modalType}
        initialData={editingItem || {}}
      />
    </Layout>
  );
};

export default App;