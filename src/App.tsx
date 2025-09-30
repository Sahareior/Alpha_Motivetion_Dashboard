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
import Swal from "sweetalert2";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [editingItem, setEditingItem] = useState(null);


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
    <Layout
      className="h-full"
style={{backgroundColor: "#232D3B"}}
    >
      <Sider
        trigger={null}
        className="h-full flex flex-col  justify-between"
        collapsible
        collapsed={collapsed}
        style={{backgroundColor: "#232D3B"}}
      >
        {/* Top Section */}
        <div>
          <div className="flex mt-3 ml-2 flex-col items-center ">

          <img src="/lg.png" className="mx-auto w-[56px] h-[48px]" alt="" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            className="mt-8 space-y-3 bg-[#232D3B]"
            selectedKeys={[location.pathname]} // highlight active menu
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

        {/* Bottom Section */}
        <div className="p-4 flex justify-center items-center gap-3 flex-col mt-[27rem] mb-5 text-center">
          <IoSettings
          size={24}
            onClick={handelNavigate}
            className="text-white hover:text-[#A6C5F3] mx-auto text-xl"
          />
          <ImExit 
          size={24}
            onClick={handelLogout}
            className="text-white  hover:text-[#A6C5F3] mt-4 mx-auto text-xl"
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
              src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-10 h-10 rounded-full"
              alt=""
            />
          </div>
        </Header>
        <Content
          className="h-[90vh] px-4 bg-white rounded-xl  overflow-y-scroll"
          style={{
            margin: "4px 0px",
            padding: 29,
            borderRadius: 20,
       
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
        <CommonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        // onSave={handleSave}
        title={modalTitle}
        type={modalType}
        initialData={editingItem || {}}
      />
    </Layout>
  );
};

export default App;
