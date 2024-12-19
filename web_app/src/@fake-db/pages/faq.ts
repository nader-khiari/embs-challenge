// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { FaqType } from 'src/@fake-db/types'

const data: { faqData: FaqType } = {
  faqData: {
    'General Information': {
      id: 'General Information',
      title: 'General Information',
      icon: 'tabler:info-circle',
      subtitle: '',
      qandA: [
        {
          id: 'What is this platform, and how does it work ?',
          question: 'What is this platform, and how does it work ?',
          answer:
            'This platform is an AI-driven mental health tool that integrates biometric data and information from social media platforms like X (Twitter), Spotify, and Reddit along with carefully curated questions  to provide personalized mental health diagnoses. The AI analyzes this data to identify patterns and signs of mental health issues, offering insights and recommendations while ensuring user privacy and security.'
        },
        {
          id: 'How does the platform ensure my privacy and security ?',
          question: 'How does the platform ensure my privacy and security ?',
          answer:
            'The platform prioritizes user privacy and security by allowing users to manage their own data. Users have full control over what information is shared and analyzed. The platform adheres to strict privacy policies and complies with relevant data protection regulations.'
        }
      ]
    },
    'Data Integration': {
      id: 'Data Integration',
      title: 'Data Integration',
      icon: 'tabler:database-cog',
      subtitle: '',
      qandA: [
        {
          id: 'What types of biometric data does the platform use ?',
          question: 'What types of biometric data does the platform use ?',
          answer:
            'The platform uses various types of biometric data, such as facial expressions (coming soon), and other physiological signals, to assess emotional states and detect early signs of mental health issues. The platform also uses data coming from wearable devices in order to analyse activity, sleep patterns and stress…'
        },
        {
          id: 'How does the platform integrate data from social media ?',
          question: 'How does the platform integrate data from social media ?',
          answer:
            'The platform connects to your X (Twitter), Spotify, and Reddit accounts to analyze your social media activity, posts, and interactions. This data is used to identify linguistic cues, emotional states, and behavioral patterns that may indicate mental health concerns. The integration is secure and requires your explicit consent.'
        },
        {
          id: 'Can I skip the social media integration, connecting a wearable device, or the questionnaire ?',
          question: 'Can I skip the social media integration, connecting a wearable device, or the questionnaire ?',
          answer:
            'Absolutely, this platform is designed with modularity in mind, although we recommend having them in order to get the optimal results.'
        }
      ]
    },
    'AI and Diagnosis': {
      id: 'AI and Diagnosis',
      title: 'AI and Diagnosis',
      icon: 'tabler:ai',
      subtitle: '',
      qandA: [
        {
          id: 'Can the platform replace professional mental health services ?',
          question: 'Can the platform replace professional mental health services ?',
          answer:
            'The platform is designed to complement, not replace, professional mental health services. While it provides valuable insights and early detection, it is recommended to consult with a mental health professional for a comprehensive diagnosis and treatment plan. The platform can be a useful tool for monitoring mental health and better track your progress.'
        }
      ]
    },
    'User Experience': {
      id: 'User Experience',
      title: 'User Experience',
      icon: 'tabler:user-screen',
      subtitle: '',
      qandA: [
        {
          id: 'What kind of insights and recommendations does the platform provide ?',
          question: 'What kind of insights and recommendations does the platform provide ?',
          answer:
            'The platform provides insights into your emotional states, stress levels, and potential mental health concerns based on the analysis of your biometric and social media data. Recommendations may include coping strategies, lifestyle changes, and suggestions for seeking professional help when necessary.'
        }
      ]
    },
    'Ethical Considerations': {
      id: 'Ethical Considerations',
      title: 'Ethical Considerations',
      icon: 'tabler:shield-lock',
      subtitle: '',
      qandA: [
        {
          id: 'What are the ethical considerations of using AI for mental health diagnosis ?',
          question: 'What are the ethical considerations of using AI for mental health diagnosis ?',
          answer:
            'The use of AI in mental health diagnosis raises important ethical considerations, including data privacy, consent, and the potential for bias in algorithms. The platform addresses these concerns by ensuring transparency, obtaining user consent, and continuously validating AI models to minimize bias and ensure fairness.'
        },
        {
          id: 'How does the platform handle sensitive information ?',
          question: 'How does the platform handle sensitive information ?',
          answer:
            'The platform handles sensitive information with the utmost care. All data is stored securely by the user and have full control over what information is shared and analyzed. The platform adheres to strict privacy policies and complies with relevant data protection regulations to ensure the confidentiality and security of sensitive information.'
        }
      ]
    }
  }
}

mock.onGet('/pages/faqs').reply(config => {
  if (config.params) {
    const { q = '' } = config.params
    const queryLowered = q.toLowerCase()

    const filteredData: FaqType = {}
    Object.entries(data.faqData).forEach(entry => {
      const [categoryName, categoryObj] = entry
      const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
        return qAndAObj.question.toLowerCase().includes(queryLowered)
      })
      if (filteredQAndAOfCategory.length) {
        filteredData[categoryName] = {
          ...categoryObj,
          qandA: filteredQAndAOfCategory
        }
      }
    })

    return [200, { faqData: filteredData }]
  } else {
    return [200, data]
  }
})
