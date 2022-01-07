import NewsPublish from './components/NewsPublish'
import usePublish from './components/usePublish'
import { Button } from 'antd'
import Page from '../../../components/Page'

export default function Published() {
  // 2=== 已发布的
  const { dataSource, handleSunset } = usePublish(2)

  return (
    <Page>
      <NewsPublish dataSource={dataSource} button={(id) => <Button danger size="small" onClick={() => handleSunset(id)}>
        下线
      </Button>}>

      </NewsPublish>
    </Page>
  )
}
