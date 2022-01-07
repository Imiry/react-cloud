import React, { useRef, useState, useEffect } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { connect } from 'react-redux'
import { roleObj } from '../../../../const/role'
const { Option } = Select
const Index = (props) => {
  const [isDisabled, setisDisabled] = useState(false)
  const formRef = useRef(null)
  const [form] = Form.useForm()
  const { roleId, region } = JSON.parse(localStorage.getItem("token"))
  const {
    title,
    isModalVisable,
    isUpdateDisabled,
    onOk,
    setIsModalVisable,
    regionsData,
    rolesData,
    getUserRegions,
    getUserRoles,
    currentInfo,
    type
  } = props

  //获取区域和角色
  useEffect(() => {
    getUserRegions()
    getUserRoles()
  }, [currentInfo, getUserRegions, getUserRoles])

  //编辑时设置表单
  useEffect(() => {
    form && type === 'edit' && isModalVisable &&
      form.setFieldsValue({
        username: currentInfo?.username,
        password: currentInfo?.password,
        roleId: currentInfo?.roleId,
        region: currentInfo?.region
      })
  }, [currentInfo?.password, currentInfo?.region, currentInfo?.roleId, currentInfo?.username, form, type, isModalVisable])

  //编辑打开根据角色设置区域的可选择性
  useEffect(() => {
    setisDisabled(isUpdateDisabled)
  }, [isUpdateDisabled])

  //根据登录用户的角色判断区域的选择性
  const checkRegionDisabled = (item) => {
    if (type === 'edit') {
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

  //根据登录用户的角色判断角色的选择性
  const checkRoleDisabled = (item) => {
    if (type === 'edit') {
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
    formRef.current.validateFields().then(value => onOk(value, type))
  }
  //取消回调
  const onCancelChange = () => {
    formRef.current.resetFields()
    setIsModalVisable(false)
  }

  //选择角色的触发
  const selectRoleChange = (value) => {
    if (value === 1) {
      setisDisabled(true)
      formRef.current.setFieldsValue({ region: "" })
    } else {
      setisDisabled(false)
    }
  }


  return (
    <Modal
      title={title}
      okText='确定'
      cancelText='取消'
      visible={isModalVisable}
      onOk={onOkChange}
      forceRender={true}
      onCancel={onCancelChange}
    >
      <Form
        ref={formRef}
        form={form}
        labelAlign={'right'}
        labelCol={{ span: 4 }}
      >
        <Form.Item
          name="username"
          label="名称"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select onChange={(value) => selectRoleChange(value)}>
            {rolesData.map(item => <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={[{ required: true, message: isDisabled ? [] : '请选择区域' }]}
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
)(Index)