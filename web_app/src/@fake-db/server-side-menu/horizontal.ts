// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation: HorizontalNavItemsType = []

mock.onGet('/api/horizontal-nav/data').reply(() => {
  return [200, navigation]
})
