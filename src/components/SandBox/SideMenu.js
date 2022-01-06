import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import IconFont from '../IconFont/IconFont';
import { withRouter } from 'react-router-dom'
import {
  GooglePlusOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu



function SideMenu(props) {
  const [meun, setMeun] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get("http://localhost:4000/rights?_embed=children").then(res => {
      setMeun(res.data)
    })
  }, [])


  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }
  const onOpenChange = (keys) => {

    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (meun.map(item => item.key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} title={
          <span>
            <IconFont type={item.icon} />
            <span style={{ color: '#fff' }}>{item.title}</span>
          </span>
        }>
          {renderMenu(item.children)}
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} onClick={() => {
        props.history.push(item.key)
      }}><IconFont type={item?.icon} /><span style={{ color: '#fff' }}>{item.title}</span></Menu.Item>
    })
  }

  // console.log(props.location.pathname)
  const selectKeys = [props.location.pathname]
  const { collapsed } = props.app
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} >
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div style={{ textAlign: "center", fontSize: 40, color: "#fff" }} ><GooglePlusOutlined /></div>
        <div style={{ flex: 1, "overflow": "auto" }}>
          <Menu theme="dark" mode="inline" onOpenChange={onOpenChange} className="aaaaaaa" openKeys={openKeys} defaultSelectedKeys={selectKeys}>
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
// export default connect(
//   state => ({
//     collapsed: state.collapsed
//   })
// )(withRouter(SideMenu))
export default connect(
  (app) => {
    return {
      ...app,
    }
  },
  ({ app }) => ({ ...app })
)(withRouter(SideMenu))