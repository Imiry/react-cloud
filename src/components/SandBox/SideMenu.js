import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import IconFont from '../IconFont/IconFont';
import { withRouter } from 'react-router-dom'
import { GooglePlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu



function SideMenu(props) {
  const [openKeys, setOpenKeys] = useState([])
  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))
  const { menuList } = props

  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }
  const onOpenChange = (keys) => {

    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (menuList.map(item => item.key).indexOf(latestOpenKey) === -1) {
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
            <span >{item.title}</span>
          </span>
        }>
          {renderMenu(item.children)}
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} onClick={() => {
        props.history.push(item.key)
      }}><IconFont type={item?.icon} /><span >{item.title}</span></Menu.Item>
    })
  }


  const selectKeys = [props.location.pathname]
  const { collapsed } = props
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} >
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div style={{ textAlign: "center", fontSize: 40, backgroundColor: '#fff' }} ><GooglePlusOutlined /></div>
        <div style={{ flex: 1, "overflow": "auto", backgroundColor: '#fff' }}>
          <Menu theme="light" mode="inline" onOpenChange={onOpenChange} openKeys={openKeys} defaultSelectedKeys={selectKeys}>
            {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

export default connect(
  ({ app }) => ({ ...app }),
  ({ app }) => ({ ...app })
)(withRouter(SideMenu))