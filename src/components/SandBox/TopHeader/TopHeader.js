import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux'
import './index.scss'
import IconFont from '../../../components/IconFont/IconFont'
const { Header } = Layout;


const TopHeader = (props) => {
  const [currentLange, setCurrentLange] = useState(localStorage.getItem('lang_type'))
  const { collapsed, toggleCollapsed } = props
  const { role: { roleName } } = JSON.parse(localStorage.getItem("token"))
  const changeLanguage = (lan) => {
    localStorage.setItem('lang_type', lan)
    setCurrentLange(lan)
    intl.options.currentLocale = lan
  }
  const content = (
    <Menu style={{ width: 90 }}>
      <Menu.Item onClick={() => { changeLanguage('zh') }}>中文</Menu.Item>
      <Menu.Item onClick={() => { changeLanguage('en') }}>英文</Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("lang_type")
        props.history.replace("/login")
      }}>退出</Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background header-main" style={{ padding: '0 10px' }}>
      <div className="header-collapse">
        {
          collapsed ? <MenuUnfoldOutlined onClick={() => toggleCollapsed(collapsed)} /> : <MenuFoldOutlined onClick={() => toggleCollapsed(collapsed)} />
        }
      </div>
      <div className="header-setting">
        <div className="header-lan">
          <Dropdown overlay={content} placement="bottomCenter">
            {currentLange === 'zh' ? <IconFont type="icon-zhongwen" /> : <IconFont type="icon-yingwen" />}
          </Dropdown>
        </div>
        <div className="header-msg">
          <Badge dot={true}>
            <IconFont type="icon-xiaoxi_huaban1"></IconFont>
          </Badge>

        </div>
        <div className="header-set">
          <IconFont type="icon-shezhi1" onClick={() => props.history.push('/setting')}></IconFont>
        </div>
        <div className="header-avator">
          <Dropdown overlay={menu}>
            <IconFont type="icon-icon-test" />
          </Dropdown>
        </div>

      </div>
    </Header>
  )
}

export default connect(
  ({ app }) => ({ ...app }),
  ({ app }) => ({ ...app })
)(withRouter(TopHeader))


