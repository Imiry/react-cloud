import NewsPublish from './components/NewsPublish'
import usePublish from './components/usePublish'
import { Button } from 'antd'

export default function Published() {
  // 2=== 已发布的
  const { dataSource, handleSunset } = usePublish(2)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) => <Button danger size="small" onClick={() => handleSunset(id)}>
        下线
      </Button>}>

      </NewsPublish>
    </div>
  )
}
