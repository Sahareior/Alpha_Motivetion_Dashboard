import React, { useState } from 'react';
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
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { IoExitSharp, IoSettings } from 'react-icons/io5';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();


  const handelNavigate =()=>{
    navigate('/settings')
  }
  

  return (
    <Layout className='h-full' style={{
       backgroundColor: '#232D3B'
    }}>
 <Sider trigger={null} className="h-full flex flex-col  justify-between" collapsible collapsed={collapsed}>
  {/* Top Section */}
  <div>
    <div className="demo-logo-vertical" />
    <img src="/logo.png" className="mx-auto w-[45px] h-[40px]" alt="" />
    <Menu
      theme="dark"
      mode="inline"
      className="mt-8"
      selectedKeys={[location.pathname]} // highlight active menu
      items={[
        {
          key: '/',
          icon: <HomeOutlined />,
          label: <Link to="/">Dashboard Home</Link>,
        },
        {
          key: '/user-management',
          icon: <TeamOutlined />,
          label: <Link to="/user-management">User Management</Link>,
        },
        {
          key: '/notification',
          icon: <FaBell />,
          label: <Link to="/notification">Notifications</Link>,
        },
        {
          key: '/overview',
          icon: <BarChartOutlined />,
          label: <Link to="/overview">Overview</Link>,
        },
        {
          key: '/plans',
          icon: <DollarOutlined />,
          label: <Link to="/plans">Pricing Plans</Link>,
        },
      ]}
    />
  </div>

  {/* Bottom Section */}
  <div className="p-4 mt-[27rem] text-center">
    <IoSettings onClick={handelNavigate} className='text-white mx-auto text-xl' />
    <IoExitSharp  className='text-white mt-4 mx-auto text-xl' />

  </div>
</Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, backgroundColor: '#232D3B' }}>
<div className='flex justify-between items-center px-3'>
  <p className='text-white'>Alpha Motivation</p>
  <img src="/logo.png" className='w-10 h-10 rounded-full' alt="" />
</div>
        </Header>
        <Content
          className="h-[90vh] px-4 overflow-scroll"
          style={{
            margin: '4px 0px',
            padding: 2,
            
            paddingLeft: 22,
            minHeight: 280,
      
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
