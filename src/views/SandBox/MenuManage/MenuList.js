import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { Table, Modal, Tag, Button } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import Page from '../../../components/Page'

import AddDrawer from './components/AddDrawer';
const { confirm } = Modal
export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  const [loading, setloading] = useState(true)
  const [visible, setVsible] = useState(false)
  const FormRef = useRef(null)
  useEffect(() => {
    axios.get("http://localhost:4000/rights?_embed=children").then(res => {
      const list = res.data
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      });
      setdataSource(list)
    })
    setTimeout(() => {
      setloading(false)
    }, 500);
  }, [])
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });

  }
  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    if (item.grade === 1) {
      setdataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:4000/rights/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setdataSource([...dataSource])
      axios.delete(`http://localhost:4000/children/${item.id}`)
    }
  }
  const showDrawer = () => {
    setVsible(true)
  }
  const onClose = () => {
    setVsible(false)
    FormRef.current.resetFields()
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: "center",
      render: (id) => <b>{id}</b>
    },
    {
      title: '菜单名称',
      dataIndex: 'title',
      align: "center",
    },
    {
      title: "菜单路径",
      dataIndex: 'key',
      align: "center",
      render: (key) => <Tag color="green">{key}</Tag>
    },
    {
      title: '操作',
      align: "center",
      render: (item) => <Button type="primary" shape="circle" size="small" icon={<DeleteOutlined />} danger onClick={() => confirmMethod(item)} />
    },
  ];
  return (
    <Page
      search={
        <Button type="primary" onClick={showDrawer}>添加菜单</Button>
      }
    >
      <Table loading={loading} rowKey={item => item.key} size="small" dataSource={dataSource} columns={columns} pagination={{ pageSize: 15 }} />
      <AddDrawer ref={FormRef} visible={visible} onClose={onClose} ></AddDrawer>
    </Page>
  )
}