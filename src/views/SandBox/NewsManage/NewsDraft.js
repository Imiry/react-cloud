import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, notification } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import Page from '../../../components/Page'

const { confirm } = Modal
export default function NewsDraft(props) {
  const [dataSource, setdataSource] = useState([])

  const { username } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get(`http://localhost:4000/news?author=${username}&auditState=0&_expand=category`).then(res => {
      const list = res.data
      setdataSource(list)
    })
  }, [username])

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
      title: '新闻标题',
      dataIndex: 'title',
      align: "center",
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      align: "center",
    },
    {
      title: '分类',
      dataIndex: 'category',
      align: "center",
      render: (category) => {
        return category.title
      }
    },
    {
      title: "操作",
      align: "center",
      render: (item) => {
        return <div>
          <Button danger size="small" shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />

          <Button size="small" style={{ marginLeft: 10 }} shape="circle" icon={<EditOutlined />} onClick={() => {
            props.history.push(`/news-manage/update/${item.id}`)
          }} />

          <Button size="small" style={{ marginLeft: 10 }} type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => handleCheck(item.id)} />
        </div>
      }
    }
  ];


  const handleCheck = (id) => {
    axios.patch(`http://localhost:4000/news/${id}`, {
      auditState: 1
    }).then(res => {
      props.history.push('/audit-manage/list')

      notification.info({
        message: `通知`,
        description:
          `您可以到${'审核列表'}中查看您的新闻`,
        placement: "bottomRight"
      });
    })
  }

  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
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

    setdataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:4000/news/${item.id}`)
  }

  return (
    <Page>
      <Table dataSource={dataSource} size='small' columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
    </Page>
  )
}
