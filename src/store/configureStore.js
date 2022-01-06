import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import models from './loader'

const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = preloadedState => {
  const store = init({
    plugins: [loadingPlugin],
    models,
    redux: {
      initialState: preloadedState,
    },
  })
  return store
}
export default configureStore