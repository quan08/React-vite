import { PhoneOutlined, LaptopOutlined, TabletFilled, AudioOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuProps, message } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import LogoImage from '../../assets/images/logo.png'
import { getLocalStorage } from '../../utils/cart';

const { Header, Content, Sider } = Layout;

const item3: MenuProps['items'] = [
  { key: "products", icon: <PhoneOutlined />, label: <Link to="/admin">Sản phẩm</Link> },
  {
    key: "categories", icon: <SettingOutlined />,
    label: <Link to="/admin/categories">Categories</Link>
  },
]

const App = () => {
  let isAdmin;
  const navigate = useNavigate()
  const data = getLocalStorage("user")
  if (data == undefined) {
    isAdmin = false
  } else {
    if(data.role == 1) {
      isAdmin = true
    }else{
      isAdmin == false
    }
  }

  if (!isAdmin) {
    navigate("/signin") 
    message.error("Bạn không có quyền truy cập")
  }
  return (
    <Layout>
      <HeaderCustom>
        <Logo src={LogoImage} />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
        <Link to="/"><button className="dropdown-item" type="button">Go to Website</button></Link>
      </HeaderCustom>
      <Layout>
        <Sider
          collapsible={true}
          width={200}
          className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={item3}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <ContentCustom>
            <Outlet />
          </ContentCustom>
        </Layout>
      </Layout>
    </Layout>
  )

};

const HeaderCustom = styled(Header)`
    background-color: #00B0D7;
    height: 64px;
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    width: 64px;
    height: auto;
`

const ContentCustom = styled(Content)`
  min-height: 100vh;
`

export default App;