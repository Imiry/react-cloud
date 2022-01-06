import React, { useState, useRef, useEffect} from 'react'
import { PageHeader, Steps, Popover, Button, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios';
import SimoEditor from '../../../components/SimoEdit'
const { Step } = Steps;
const { Option } = Select;
export default function NewsAdd(props) {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  const [formInfo, setformInfo] = useState({})
  const [content, setContent] = useState("")
  const NewsForm = useRef(null)
  const User = JSON.parse(localStorage.getItem("token"))

  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }
  const handleNext = () => {
    if(current === 0) {
      NewsForm.current.validateFields().then(value => {
        setformInfo(value)
        setCurrent(current + 1)
      }).catch(err => {console.log(err);})
    }else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空")
      } else {
        setCurrent(current + 1)
      }
    }
    
  }
  const handlePrevious = () => {
    setCurrent(current - 1)
  }
  const handleSave = (auditState) => {

    axios.post('http://localhost:4000/news', {
      ...formInfo,
      "content": content,
      "region": User.region ? User.region : "全球",
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
      // "publishTime": 0
    }).then(res => {
      props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')

      notification.info({
        message: `通知`,
        description:
          `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
        placement: "bottomRight"
      });
    })
  }
  useEffect(() => {
    axios.get("http://localhost:4000/categories").then(res => {
      // console.log(res.data)
      setCategoryList(res.data)
    })
  }, [])
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="撰写新闻"
        subTitle="WRITE NEWS FOR MANAGE"
      />
      <Steps style={{marginTop:20}} current={current} progressDot={customDot}>
        <Step title="基本信息"  />
        <Step title="新闻内容"  />
        <Step title="新闻提交"  />
      </Steps>
      <div style={{ marginTop: "50px" }}>
        <div className={current === 0 ? '' : style.active}>

          <Form
            {...layout}
            name="basic"
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: 'Please select your category!' }]}
            >
              <Select>
                {
                  categoryList.map(item =>
                    <Option value={item.id} key={item.id}>{item.title}</Option>
                  )
                }
              </Select>
            </Form.Item>

          </Form>
        </div>

        <div className={current === 1 ? '' : style.active}>
          <SimoEditor getContent={(value) => {
            // console.log(value)
            setContent(value)
          }}></SimoEditor>
        </div>
        <div className={current === 2 ? '' : style.active}></div>

      </div>
      <div style={{marginTop:50}}>
        {
          current === 2 && <span>
            <Button type="primary" onClick={() => handleSave(0)} style={{marginRight:30}}>保存草稿箱</Button>
            <Button danger onClick={() => handleSave(1)} style={{ marginRight: 30 }}>提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button type="primary" onClick={handleNext} style={{ marginRight: 30 }}>下一步</Button>
        }
        {
          current > 0 && <Button onClick={handlePrevious}>上一步</Button>
        }
        
      </div>
    </div>
  )
}
