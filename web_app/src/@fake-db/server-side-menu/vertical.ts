// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation: VerticalNavItemsType = []

mock.onGet('/api/vertical-nav/data').reply(() => {
  return [200, navigation]
})
