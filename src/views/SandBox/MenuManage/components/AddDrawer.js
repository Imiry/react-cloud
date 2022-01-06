import React, { useState, useEffect, forwardRef} from 'react'
import { Drawer, Form, Button, Input, Select } from 'antd';
import axios from 'axios'
const { Option } = Select;
const AddDrawer =  forwardRef((props,ref) => {
  const [menuList, setMenuList] = useState([])
  const [isDisabled, setisDisabled] = useState(false)
  const [currentGrade, setCurrentGrade] = useState(1)
  const [currentId, setCurrentId] = useState(null)
  const {role:{roleType,roleName,rights}} = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get("http://localhost:4000/rights?_embed=children").then(res => {
      const list = res.data
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      });
      setMenuList(list)
    })
  }, [])
  const selectType = (value) => {
    if(value === '1'){
      setisDisabled(true)
      setCurrentGrade(1)
    }else{
      setisDisabled(false)
      setCurrentGrade(2)
    }
  }
  const selectId = (value) => {
    setCurrentId(value)
  }
  const AddMenuHandle = () => {
    ref.current.validateFields().then(value => {
      if (currentGrade === 1) {
        axios.post("http://localhost:4000/rights", { ...value,"pagepermisson": 1,})
        axios.patch(`http://localhost:4000/roles/${roleType}`, { 
          "id": roleType,
          "roleName": roleName,
          "roleType": roleType,
          "rights":[...rights,value.key]
        })
        props.onClose()
        ref.current.resetFields()
      }else if(currentGrade === 2) {
        axios.post("http://localhost:4000/children", { ...value, "pagepermisson": 1,"rightId": currentId})
        axios.patch(`http://localhost:4000/roles/${roleType}`, {
          "id": roleType,
          "roleName": roleName,
          "roleType": roleType,
          "rights": [...rights, value.key]
        })
        props.onClose()
        ref.current.resetFields()
      }
    })
  }
  return (
    <div>
      <Drawer
        title="Add a new menu"
        width={720}
        onClose={props.onClose}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={AddMenuHandle} type="primary">
              添加
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark ref={ref}>
          <Form.Item
            name="title"
            label="菜单名称:"
            rules={[{ required: true, message: 'Please enter user title' }]}
          >
            <Input placeholder="Please enter user title" />
          </Form.Item>
          <Form.Item
            name="key"
            label="所属路径:"
            rules={[{ required: true, message: 'Please enter user Key' }]}
          >
            <Input placeholder="Please enter user Key" />
          </Form.Item>
          <Form.Item
            name="grade"
            label="层级关系:"
            rules={[{ required: true, message: 'Please select an grade' }]}
          >
            <Select placeholder="Please select an grade" onSelect={(value) => selectType(value)}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="icon"
            label="所属图标:"
            rules={[{ required: true, message: !isDisabled ? [] : 'Please select an icon' }]}
          >
            <Input disabled={!isDisabled} placeholder="Please enter user icon" />
          </Form.Item>
          <Form.Item
            name="rightId"
            label="所属菜单:"
            rules={[{ required: true, message: isDisabled ? [] : 'Please select an menu' }]}
          >
            <Select placeholder="Please select an menu" disabled={isDisabled} onSelect={(value) => selectId(value)}>
              {menuList.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
})
export default AddDrawer
