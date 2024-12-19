// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },
    {
      title: 'Submissions',
      icon: 'tabler:file-stack',
      path: '/submissions'
    },
    {
      title: 'Chat',
      icon: 'tabler:messages',
      path: '/chat'
    },
    {
      title: 'Calendar',
      icon: 'tabler:calendar',
      path: '/calendar'
    },
    {
      title: 'FAQ',
      icon: 'tabler:help-octagon',
      path: '/faq'
    }
  ]
}

export default navigation
