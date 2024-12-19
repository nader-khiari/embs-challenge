// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { AppBarSearchType } from 'src/@fake-db/types'

const searchData: AppBarSearchType[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'tabler:smart-home',
    url: '/dashboard',
    category: 'General'
  },
  {
    id: 2,
    title: 'Submissions',
    icon: 'tabler:file-stack',
    url: '/submissions',
    category: 'General'
  },
  {
    id: 3,
    title: 'Chat',
    icon: 'tabler:messages',
    url: '/chat',
    category: 'General'
  },
  {
    id: 4,
    title: 'Calendar',
    icon: 'tabler:calendar',
    url: '/calendar',
    category: 'General'
  },
  {
    id: 5,
    title: 'FAQ',
    icon: 'tabler:help-octagon',
    url: '/faq',
    category: 'General'
  }
]

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData: { [k: string]: AppBarSearchType[] } = {
    General: []
  }

  const includeData: { [k: string]: AppBarSearchType[] } = {
    General: []
  }

  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })

  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })

  const categoriesCheck: string[] = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }

  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [200, [...exactData.General.concat(includeData.General).slice(0, resultsLength)]]
})
