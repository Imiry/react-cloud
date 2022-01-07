import { Table, Button, Modal, Switch, message } from 'antd'
import React, { useState, useEffect, useCallback } from 'react'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Page from '../../../components/Page'
import ModalSetting from './components/ModalSetting'
import { setTimeoutLoading } from '../../../utils'
const { confirm } = Modal
const roleObj = {
    "1": "superadmin",
    "2": "admin",
    "3": "editor"
}
const UserList = (props) => {
    const [dataSource, setdataSource] = useState([])
    const [isModalVisable, setIsModalVisable] = useState(false)
    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)

    const [currentType, setCurrentType] = useState(null)
    const [title, setTitle] = useState('添加用户')
    const [current, setcurrent] = useState({})
    const [loading, setloading] = useState(true)
    const { getUserList, addUser, rolesData, updateUser, delUser, updateUserStatus, regionsData } = props
    const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

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

    //获取用户列表数据回调
    const getUserDatafn = useCallback(() => {
        setloading(true)
        getUserList().then(res => {
            if (res.status === 200) {
                const list = res.data.slice()
                setdataSource(roleObj[roleId] === "superadmin" ? list : [...list.filter(item => item.username === username), ...list.filter(item => item.region === region && roleObj[roleId] === "editor")])
                setTimeoutLoading(() => { setloading(false) }, 500)
            } else {
                message.error('请求出错')
                setloading(false)
            }

        })
    }, [getUserList, region, roleId, username])

    // 获取用户列表
    useEffect(() => {
        getUserDatafn()
    }, [getUserDatafn])



    //用户状态更新
    const handleChange = (item) => {
        item.roleState = !item.roleState
        setdataSource([...dataSource])
        let params = {
            id: item.id,
            roleState: item.roleState
        }
        setloading(true)
        updateUserStatus(params).then(res => {
            if (res.status === 200) {
                message.success('修改用户状态成功')
                setTimeoutLoading(() => { setloading(false) }, 500)
            } else {
                setloading(false)
                message.error('修改失败')
            }
        })
    }

    //删除用户
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            cancelText: '取消',
            okText: '确定',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
            },
        });

    }
    const deleteMethod = (item) => {
        setloading(true)
        setdataSource(dataSource.filter(data => data.id !== item.id))
        delUser(item).then(res => {
            if (res.status === 200) {
                message.success('删除成功')
                setTimeoutLoading(() => { setloading(false) }, 500)
            } else {
                message.error('删除失败')
            }
        })
    }

    //确认添加成功
    const addFormOK = (value) => {
        let params = {
            ...value,
            "roleState": true,
            "default": false,
        }
        addUser(params).then(res => {
            if (res.status === 201) {
                setdataSource([...dataSource, {
                    ...res,
                    role: rolesData.filter(item => item.id === value.roleId)[0]
                }])
                getUserDatafn()
                setIsModalVisable(false)
                message.success('添加用户成功')
            } else {
                message.error('添加用户失败')
            }

        })

    }

    //点击编辑设置
    const handleUpdate = (item) => {
        setCurrentType('edit')
        setTitle('编辑用户')
        setcurrent(item)
        setIsModalVisable(true)
        setTimeout(() => {
            setIsModalVisable(true)
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
        updateUser(params).then(res => {
            if (res.status === 200) {
                message.success('编辑成功')
                setIsModalVisable(false)
            } else {
                message.error('编辑失败')
                setIsModalVisable(false)
            }
        })
        setisUpdateDisabled(!isUpdateDisabled)

    }

    //弹窗确定按钮的回调
    const onOk = (value, type) => {
        type === 'edit' && updateFormOK(value)
        type === 'add' && addFormOK(value)
    }


    return (
        <Page
            search={
                <Button
                    type="primary"
                    onClick={() => { setIsModalVisable(true); setTitle('添加用户'); setCurrentType('add') }}
                >添加用户</Button>
            }
        // buttonSlot={
        //     <Button
        //         type="primary"
        //         onClick={() => { setIsModalVisable(true); setTitle('添加用户'); setCurrentType('add') }}
        //     >添加用户</Button>
        // }
        >
            <Table
                loading={loading}
                size="large"
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
                pagination={false}
            ></Table>
            <ModalSetting
                title={title}
                type={currentType}
                isModalVisable={isModalVisable}
                isUpdateDisabled={isUpdateDisabled}
                onOk={onOk}
                currentInfo={current}
                setIsModalVisable={setIsModalVisable}
            ></ModalSetting>
        </Page>
    )
}
export default connect(
    ({ user }) => ({ ...user }),
    ({ user }) => ({ ...user })
)(UserList)