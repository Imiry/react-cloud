import NewsPublish from './components/NewsPublish'
import usePublish from './components/usePublish'
import { Button } from 'antd'
export default function Sunset() {
  // 3=== 已下线的
  const { dataSource, handleDelete } = usePublish(3)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) => <Button danger size="small"  onClick={() => handleDelete(id)}>
        删除
      </Button>}></NewsPublish>
    </div>
  )
}
