import { Table, Button, Modal, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserModal from './components/UserModal'
import { connect } from 'react-redux'
import Page from '../../../components/Page'
const { confirm } = Modal

const UserList = (props) => {
    const [dataSource, setdataSource] = useState([])
    const [isAddVisible, setisAddVisible] = useState(false)
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
    const [current, setcurrent] = useState({})
    const [loading, setloading] = useState(true)
    const { getUserList, addUser, rolesData, updateUser, delUser, updateUserStatus, regionsData } = props
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            align: "center",
            filters: [
                ...regionsData.map(item => ({ text: item.title, value: item.value })),
                { text: "全球", value: "全球" }
            ],
            onFilter: (value, item) => {
                if (value === "全球") {
                    return item.region === ""
                }
                return item.region === value
            },
            render: (region) => {
                return <b>{region === '' ? "全球" : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            align: "center",
            render: (role) => {
                return role?.roleName
            }
        },
        {
            title: "用户名",
            align: "center",
            dataIndex: 'username'
        },
        {
            title: "用户状态",
            dataIndex: "roleState",
            align: "center",
            render: (roleState, item) => {
                return <Switch size="small" checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
            }
        },
        {
            title: "操作",
            align: "center",
            render: (item) => {
                return <div>
                    <DeleteOutlined onClick={() => confirmMethod(item)} style={{ marginRight: 10, color: '#faad14' }} />
                    <UnorderedListOutlined style={{ color: '#1890ff' }} onClick={() => { handleUpdate(item) }} />
                </div>
            }
        }
    ]
    //用户状态更新
    const handleChange = (item) => {
        item.roleState = !item.roleState
        setdataSource([...dataSource])
        let params = {
            id: item.id,
            roleState: item.roleState
        }
        updateUserStatus(params)
    }
    //删除用户
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
    const deleteMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        delUser(item)
    }
    //确认添加成功
    const addFormOK = (value) => {
        let params = {
            ...value,
            "roleState": true,
            "default": false,
        }
        addUser(params).then(res => {
            setdataSource([...dataSource, {
                ...res,
                role: rolesData.filter(item => item.id === value.roleId)[0]
            }])
        })
        setisAddVisible(false)
    }

    const handleUpdate = (item) => {
        setcurrent(item)
        setTimeout(() => {
            setisUpdateVisible(true)
            if (item.roleId === 1) {
                //禁用
                setisUpdateDisabled(true)
            } else {
                //取消禁用
                setisUpdateDisabled(false)
            }
            // updateForm.current.setFieldsValue(item)
        }, 0)

    }
    //确认编辑成功
    const updateFormOK = (value) => {
        setdataSource(dataSource.map(item => {
            if (item.id === current.id) {
                return {
                    ...item,
                    ...value,
                    role: rolesData.filter(data => data.id === value.roleId)[0]
                }
            }
            return item
        }))
        let params = {
            id: current.id,
            value
        }
        updateUser(params)
        setisUpdateVisible(false)

    }

    const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

    //获取用户列表
    useEffect(() => {
        const roleObj = {
            "1": "superadmin",
            "2": "admin",
            "3": "editor"
        }
        getUserList().then(res => {
            setloading(true)
            const list = res
            setdataSource(roleObj[roleId] === "superadmin" ? list : [...list.filter(item => item.username === username), ...list.filter(item => item.region === region && roleObj[roleId] === "editor")])
            setloading(false)
        })

    }, [roleId, region, username, getUserList])

    return (
        <Page
            search={
                <Button
                    type="primary"
                    onClick={() => { setisAddVisible(true) }}
                >添加用户</Button>
            }
        >
            <Table
                loading={loading}
                size="large"
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
                pagination={false}
            ></Table>
            <UserModal
                title="添加用户"
                visible={isAddVisible}
                onOk={addFormOK}
                onCancel={(value) => setisAddVisible(value)}
            ></UserModal>
            <UserModal
                title="编辑用户"
                visible={isUpdateVisible}
                onOk={updateFormOK}
                currentInfo={current}
                type="edit"
                onCancel={(value) => setisUpdateVisible(value)}
            ></UserModal>
        </Page>
    )
}
export default connect(
    ({ user }) => ({ ...user }),
    ({ user }) => ({ ...user })
)(UserList)