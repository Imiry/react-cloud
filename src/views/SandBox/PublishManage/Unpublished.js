import NewsPublish from './components/NewsPublish'
import usePublish from './components/usePublish'
import { Button } from 'antd'
import Page from '../../../components/Page'

export default function Unpublished() {
  // 1=== 待发布的
  const { dataSource, handlePublish } = usePublish(1)

  return (
    <Page>
      <NewsPublish dataSource={dataSource} button={(id) => <Button type="primary" size="small" onClick={() => handlePublish(id)}>
        发布
      </Button>} ></NewsPublish>
    </Page>
  )
}
