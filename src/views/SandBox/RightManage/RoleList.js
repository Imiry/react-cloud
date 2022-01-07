import { Table, Button, Modal, Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import Page from '../../../components/Page'
const { confirm } = Modal
export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [isModalVisible, setisModalVisible] = useState(false)
    const [currentRights, setcurrentRights] = useState([])
    const [currentId, setcurrentId] = useState(0)
    const [loading, setloading] = useState(true)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: "center",
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            align: "center",
            dataIndex: 'roleName'
        },
        {
            title: "操作",
            align: "center",
            render: (item) => {
                return <div>
                    <Button danger size="small" style={{ marginRight: 10 }} shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    <Button type="primary" size="small" shape="circle" icon={<UnorderedListOutlined />} onClick={() => {
                        setisModalVisible(true)
                        setcurrentRights(item.rights)
                        setcurrentId(item.id)
                    }} />
                </div>
            }
        }
    ]
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
            },
        });

    }
    //删除
    const deleteMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:4000/roles/${item.id}`)
    }
    const handleOk = () => {
        // console.log(currentRights,currentId)
        setisModalVisible(false)
        //同步datasource
        setdataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item
        }))
        //patch

        axios.patch(`http://localhost:4000/roles/${currentId}`, {
            rights: currentRights
        })
    }
    const onCheck = (checkKeys) => {
        // console.log(checkKeys)
        setcurrentRights(checkKeys.checked)
    }
    const handleCancel = () => {
        setisModalVisible(false)
    }
    useEffect(() => {
        axios.get("http://localhost:4000/roles").then(res => {
            // console.log(res.data)
            setdataSource(res.data)
        })
        setTimeout(() => {
            setloading(false)
        }, 500);
    }, [])
    useEffect(() => {
        axios.get("http://localhost:4000/rights?_embed=children").then(res => {
            // console.log(res.data)
            setRightList(res.data)
        })
    }, [])
    return (
        <Page>
            <Table loading={loading} size="small" pagination={false} dataSource={dataSource} columns={columns} rowKey={item => item.id}></Table>
            <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkStrictly={true}
                    treeData={rightList}
                />
            </Modal>
        </Page>
    )
}