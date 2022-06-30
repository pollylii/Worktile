import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import {
  HomeOutlined,
  UserOutlined,
  PicRightOutlined,
  AppstoreOutlined,
  MessageOutlined,
  FormOutlined,
  EditOutlined,
  UsergroupDeleteOutlined,
  CloseCircleOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import axios from 'axios'
const { Sider } = Layout;
const { SubMenu } = Menu

//模拟数组结构
// const  menuList = [
//   {
//     key:"/home",
//     title:"首页",
//     icon:<UserOutlined />
//   },
//   {
//     key:"/user-manage",
//     title:"用户管理",
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:"/user-manage/list",
//         title:"用户列表",
//         icon:<UserOutlined />
//       }
//     ]
//   },
//   {
//     key:"/right-manage",
//     title:"权限管理",
//     icon:<UserOutlined />,
//     children:[
//       {
//         key:"/right-manage/role/list",
//         title:"角色列表",
//         icon:<UserOutlined />
//       },
//       {
//         key:"/right-manage/right/list",
//         title:"权限列表",
//         icon:<UserOutlined />
//       }
//     ]
//   }
// ]
const iconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <PicRightOutlined />,
  "/right-manage/role/list": <UsergroupDeleteOutlined />,
  "/right-manage/right/list": <AppstoreOutlined />,
  "/news-manage": <MessageOutlined />,
  "/news-manage/add": <EditOutlined />,
  "/news-manage/draft": <CloseCircleOutlined />,
  "/news-manage/category": <AppstoreOutlined />,
  "/audit-manage": <AuditOutlined />,
  "/publish-manage": <FormOutlined />,
}


function SideMenu(props) {
  const [meun, setMeun] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setMeun(res.data)
    })
  }, [])

  // 当前登录用户所具备的权限rights
  const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  // 管理权限
  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }

  const selectKeys = [props.location.pathname]
  const openKeys = ["/" + props.location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false} >
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo" >后台管理系统</div>
        <div style={{ flex: 1, "overflow": "auto" }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} className="aaaaaaa" defaultOpenKeys={openKeys}>
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
export default withRouter(SideMenu)