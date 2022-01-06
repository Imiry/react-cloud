import React, { forwardRef, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { connect } from 'react-redux'
import { roleObj } from '../../../../const/role'
const { Option } = Select
const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setisDisabled] = useState(false)
  const { roleId, region } = JSON.parse(localStorage.getItem("token"))

  const {
    getUserRegions,
    getUserRoles,
    isUpdateDisabled,
    regionsData,
    rolesData
  } = props

  useEffect(() => {
    setisDisabled(isUpdateDisabled)
    getUserRegions()
    getUserRoles()
  }, [getUserRegions, getUserRoles, isUpdateDisabled])

  const checkRegionDisabled = (item) => {
    if (props.update) {
      if (roleObj[roleId] === "superadmin") {
        return false
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false
      } else {
        return item.value !== region
      }
    }
  }
  const checkRoleDisabled = (item) => {
    if (props.update) {
      if (roleObj[roleId] === "superadmin") {
        return false
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false
      } else {
        return roleObj[item.id] !== "editor"
      }
    }
  }
  return (
    <Form
      ref={ref}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Select onChange={
          (value) => {
            if (value === 1) {
              setisDisabled(true)
              ref.current.setFieldsValue({ region: "" })
            } else {
              setisDisabled(false)
            }
          }
        }>
          {rolesData.map(item => <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.id}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={[{ required: true, message: isDisabled ? [] : 'Please input the title of collection!' }]}
      >
        <Select disabled={isDisabled}>
          {regionsData.map(item => <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>)}
        </Select>
      </Form.Item>
    </Form>
  )
})
export default connect(
  ({ user }) => ({ ...user }),
  ({ user }) => ({ ...user })
)(UserForm)