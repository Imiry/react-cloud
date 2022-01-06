import React, { useRef, useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { connect } from 'react-redux'
import { roleObj } from '../../../../const/role'
const { Option } = Select
const UserModal = (props) => {
  const [isDisabled, setisDisabled] = useState(false)
  const { roleId, region } = JSON.parse(localStorage.getItem("token"))
  const formRef = useRef(null)
  const [form] = Form.useForm()
  const {
    title,
    visible,
    onOk,
    onCancel,
    regionsData,
    rolesData,
    getUserRegions,
    getUserRoles,
    currentInfo,
    type
  } = props
  useEffect(() => {
    getUserRegions()
    getUserRoles()
  }, [currentInfo, getUserRegions, getUserRoles])

  useEffect(() => {
    form && type === 'edit' &&
      form.setFieldsValue({
        username: currentInfo?.username,
        password: currentInfo?.password,
        roleId: currentInfo?.roleId,
        region: currentInfo?.region
      })
  }, [currentInfo?.password, currentInfo?.region, currentInfo?.roleId, currentInfo?.username, form, type])

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

  //成功回调
  const onOkChange = () => {
    formRef.current.validateFields().then(value => onOk(value))
  }
  //取消回调
  const onCancelChange = () => {
    formRef.current.resetFields()
    onCancel(false)
  }
  return (
    <Modal
      title={title}
      okText='确定'
      cancelText='取消'
      visible={visible}
      onOk={onOkChange}
      getContainer={false}
      onCancel={onCancelChange}
    >
      <Form
        ref={formRef}
        layout="vertical"
        form={form} initialValues={currentInfo}
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
                formRef.current.setFieldsValue({ region: "" })
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
    </Modal>
  )
}
export default connect(
  ({ user }) => ({ ...user }),
  ({ user }) => ({ ...user })
)(UserModal)