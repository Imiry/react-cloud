import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Switch, Modal } from 'antd'
import axios from 'axios'
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
    const [dataSource, setdataSource] = useState([])
    const [loading, setloading] = useState(true)
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
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        setdataSource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`http://localhost:4000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:4000/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: "center",
            render: (id) => <b>{id}</b>
        },
        {
            title: '权限名称',
            dataIndex: 'title',
            align: "center",
        },
        {
            title: "权限路径",
            dataIndex: 'key',
            align: "center",
            render: (key) => <Tag color="green">{key}</Tag>
        },
        {
            title: '开关',
            align: "center",
            render: (item) => <Switch size="small" checked={item.pagepermisson} onChange={() => switchMethod(item)} />
        },
        {
            title: '操作',
            align: "center",
            render: (item) => <Button type="primary" shape="circle" size="small" icon={<DeleteOutlined />} danger onClick={() => confirmMethod(item)} />
        },
    ];
    return (
        <div>
            <Table loading={loading} rowKey={item => item.key} size="small" dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
        </div>
    )
}