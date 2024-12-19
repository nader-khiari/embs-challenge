// ** Mock Adapter
import dayjs from 'dayjs'
import mock from 'src/@fake-db/mock'

// ** Types
import { ProfileUserType, ChatsObj, ContactType } from 'src/types/apps/chatTypes'

const date = dayjs().subtract(1, 'day')

const data: { chats: ChatsObj[]; contacts: ContactType[]; profileUser: ProfileUserType } = {
  profileUser: {
    id: 11,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    role: 'admin',
    about:
      'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: 'Chatbot',
      role: 'Your Mental Health Assistant',
      about: '',
      avatar: '',
      status: 'online'
    }
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      chat: [
        {
          role: 'assistant',
          content: 'Hello, How are you feeling today?'
        },
        {
          role: 'user',
          content: 'Hello, can you give me some information about what you need me to tell you?'
        },
        {
          role: 'assistant',
          content:
            "Of course! To better understand your current situation and provide you with the most helpful guidance, I'd like to gather more information about your lifestyle and daily experiences. Here are some areas we can discuss:\n\n1. **Sleep Patterns**: You mentioned you sleep around 6 hours per day, starting at 1 AM. Can you tell me more about your sleep quality and how you feel when you wake up?\n\n2. **Work Life**: You're working 51 hours per week as a software engineer. How stressful is your job? Are there any specific aspects of your work that cause you anxiety or discomfort?\n\n3. **Social Life and Support System**: Can you tell me about your social life and support system? Having a strong network of friends, family, and colleagues can significantly impact mental well-being.\n\n4. **Physical Health and Exercise**: How often do you engage in physical activities or exercise? Regular exercise can help manage symptoms of anxiety and depression.\n\n5. **Diet and Nutrition**: Can you describe your eating habits? A balanced diet can greatly influence your mental health.\n\n6. **Relaxation and Self-Care**: What do you do to relax and take care of yourself? This could include hobbies, meditation, or other activities that help you unwind.\n\n7. **Specific Stressors**: Are there any particular events, situations, or thoughts that consistently cause you anxiety or make you feel depressed?\n\n8. **Thoughts and Feelings**: Can you describe how you feel on a typical day? Are there any recurring thoughts or emotions that you experience frequently?\n\n9. **Goals and Aspirations**: What are your short-term and long-term goals? Understanding your aspirations can help us identify any potential sources of stress or pressure.\n\n10. **Any Other Concerns**: Is there anything else you think might be relevant to your mental well-being that we haven't covered?\n\nBy gathering this information, we can work together to identify the factors contributing to your current challenges and develop strategies to improve your mental well-being."
        },
        {
          role: 'user',
          content:
            'well, I think it might be a bit out of my control, but, I usally get to bed late at night, mainly due to me working overtime, which contributes to me staying up late (usually to get some me time), this really messes up my sleeping schedule and eating habits (I heard that chaotic sleeping patterns might contribute to over eating), lately I have been dieting and I have lost some weight, which made me feel better overall, but i think there are still some problems that might need to be fixed'
        },
        {
          role: 'assistant',
          content:
            "Thank you for sharing that information, Chiheb. It's great that you're taking steps to improve your health, such as dieting and recognizing the need for personal time. Let's break down the areas you mentioned and explore them further:\n\n1. **Sleep Schedule**: You mentioned that you go to bed late due to working overtime and needing some personal time. It's essential to find a balance between work and relaxation. Can you tell me more about your evening routine and what time you usually get to bed and wake up?\n\n2. **Work-Life Balance**: Working 51 hours a week can be quite demanding. How do you usually feel after a workday? Are there any specific tasks or aspects of your job that cause you to work overtime frequently?\n\n3. **Eating Habits**: You mentioned that your sleeping patterns might contribute to overeating. Can you describe your typical meals and snacks throughout the day? How has your recent diet change improved your eating habits and overall well-being?\n\n4. **Personal Time**: Having personal time is crucial for mental well-being. What activities do you enjoy doing during your personal time? Are there any hobbies or relaxation techniques you practice?\n\n5. **Mood and Energy Levels**: You mentioned feeling better overall after losing some weight. How would you describe your mood and energy levels throughout the day? Are there any specific times when you feel more tired or anxious?\n\nTo better understand your situation and provide tailored advice, could you please tell me more about the following:\n\n- What are some specific thoughts or feelings that you experience when you're feeling anxious or depressed?\n- Are there any particular events or situations that trigger these feelings?\n- How do you typically cope with stress and negative emotions?\n- What are some short-term and long-term goals you have for your personal and professional life?\n\nBy exploring these areas, we can work together to identify potential factors contributing to your current challenges and develop strategies to improve your mental well-being."
        },
        {
          role: 'user',
          content:
            'After a workday i usually feel tired, but I go out with friends after work sometimes, I find it relieving, but missing hangouts can sometimes induce some feelings of loneliness, I know that I can rely on them to vent my feelings, but they are all in a similar situation and I feel like I might bother them with my problems, as for energy levels, ever since losing some weight I heve felt some boost in energy in confidence, but this also came at the cost of developping fear and guilt of eating junk food and fearing to gain back what i worked hard to lose'
        },
        {
          role: 'assistant',
          content:
            "Thank you for sharing more details, Chiheb. It's important to address these feelings and concerns to improve your overall well-being. Let's break down the key points you mentioned and explore them further:\n\n1. **Post-Work Fatigue and Social Life**:\n   - **Feeling Tired**: It's understandable to feel tired after a long workday. How do you usually recharge after work? Are there any specific activities or routines that help you relax?\n   - **Social Support**: It's great that you have friends you can rely on. Do you feel comfortable talking to them about your feelings, even if they are in a similar situation? Sometimes, just knowing you have someone to listen can be helpful.\n   - **Loneliness**: Feeling lonely when missing hangouts is common. Are there any other ways you can stay connected with your friends, even if you can't meet in person?\n\n2. **Eating Habits and Body Image**:\n   - **Diet and Weight Loss**: It's positive that you've seen improvements in your energy and confidence after losing weight. How do you currently manage your diet? Are there any specific strategies or meal plans you follow?\n   - **Fear and Guilt**: Feeling guilty about eating junk food is a common experience for many people. How do you handle these feelings when they arise? Are there any healthier alternatives you enjoy that can satisfy your cravings?\n   - **Body Image**: It's important to maintain a healthy relationship with your body. How do you view your body image now compared to before your weight loss? Are there any positive affirmations or practices that help you maintain a healthy perspective?\n\n3. **Emotional Support**:\n   - **Venting Feelings**: It's natural to want to share your feelings with others. Have you considered seeking support from a professional, such as a therapist or counselor, who can provide a neutral and confidential space to discuss your emotions?\n   - **Burden on Friends**: It's commendable that you're considerate of your friends' situations. Have you ever discussed with them how you feel about burdening them? They might be more understanding and supportive than you think.\n\n4. **Energy Levels and Confidence**:\n   - **Energy Boost**: It's great that you're feeling more energetic and confident. How do you maintain this energy throughout the day? Are there any specific activities or routines that help you stay energized?\n   - **Fear of Regaining Weight**: It's common to fear regaining weight after significant progress. How do you usually cope with this fear? Are there any strategies or mindsets that help you stay motivated and positive?\n\nTo better understand your situation and provide tailored advice, could you please tell me more about the following:\n\n- What are some specific thoughts or feelings that you experience when you're feeling anxious or depressed?\n- Are there any particular events or situations that trigger these feelings?\n- How do you typically cope with stress and negative emotions?\n- What are some short-term and long-term goals you have for your personal and professional life?\n\nBy exploring these areas, we can work together to identify potential factors contributing to your current challenges and develop strategies to improve your mental well-being."
        },
        {
          role: 'user',
          content:
            'Any more information?, for now no, I think you summarized it pretty well, Do you have any advice that might help in my case?'
        },
        {
          role: 'assistant',
          content:
            "Based on the information you've shared, here are some tailored pieces of advice to help improve your mental well-being, focusing on your sleep schedule, work-life balance, eating habits, social life, and emotional support:\n\n1. **Sleep Schedule and Routine**:\n\t* **Consistency**: Try to maintain a consistent sleep schedule, even on weekends. Aim to go to bed and wake up at the same time every day.\n\t* **Wind Down**: Establish a relaxing bedtime routine to signal to your body that it's time to sleep. This could include reading, taking a warm bath, or practicing relaxation exercises.\n\t* **Limit Screen Time**: Reduce exposure to electronic screens (TV, phone, computer) before bedtime, as the blue light emitted can interfere with your body's production of melatonin.\n\t* **Sleep Environment**: Create a comfortable and inviting sleep environment with a cool temperature, supportive pillow, and minimal noise or light disturbances.\n2. **Work-Life Balance**:\n\t* **Set Boundaries**: Establish clear work hours and stick to them. Communicate these boundaries with your colleagues and superiors, if possible.\n\t* **Prioritize Tasks**: Break down your workload into manageable tasks and prioritize them based on importance and urgency. This can help you feel more in control and reduce stress.\n\t* **Take Breaks**: Ensure you're taking regular breaks throughout the day to rest and recharge. Techniques like the Pomodoro Technique (25 minutes of work followed by a 5-minute break) can be helpful.\n\t* **Delegate**: If possible, delegate tasks to others when your workload becomes overwhelming.\n3. **Eating Habits and Body Image**:\n\t* **Mindful Eating**: Practice mindful eating by paying attention to your hunger and fullness cues. Eat slowly and without distractions, focusing on the taste, texture, and smell of your food.\n\t* **Balanced Diet**: Include a variety of nutrient-rich foods in your diet, such as fruits, vegetables, whole grains, lean proteins, and healthy fats.\n\t* **Treats in Moderation**: Allow yourself to enjoy treats in moderation, rather than completely restricting them. This can help prevent feelings of guilt and deprivation.\n\t* **Body Positivity**: Focus on the functionality and strength of your body, rather than just its appearance. Practice positive affirmations and self-compassion.\n4. **Social Life and Emotional Support**:\n\t* **Stay Connected**: Make an effort to maintain regular contact with friends and family, even if it's just a quick call or message.\n\t* **Join Groups or Clubs**: Consider joining groups or clubs that align with your interests. This can help you meet new people and expand your support network.\n\t* **Seek Professional Help**: If feelings of anxiety, depression, or loneliness become overwhelming, don't hesitate to seek help from a mental health professional. They can provide a safe and non-judgmental space to discuss your emotions.\n\t* **Express Your Feelings**: Open up to your friends about your feelings, and reassure them that you're there to support them as well. True friends will understand and be there for you.\n5. **Stress Management and Self-Care**:\n\t* **Exercise Regularly**: Incorporate regular physical activity into your routine, as it can help reduce stress, improve mood, and boost energy levels.\n\t* **Practice Relaxation Techniques**: Techniques such as deep breathing, meditation, yoga, or progressive muscle relaxation can help manage stress and anxiety.\n\t* **Hobbies**: Make time for activities you enjoy and that help you relax and unwind.\n\t* **Self-Care**: Prioritize self-care activities, such as taking a warm bath, reading a book, or listening to calming music.\n\n**Short-term and Long-term Goals**:\n\n* Break down your goals into smaller, achievable steps.\n* Celebrate your progress and accomplishments along the way.\n* Be flexible and adapt your goals as needed, based on changes in your life or priorities.\n\n**Professional Help**:\n\n* If your feelings of anxiety and depression persist or worsen, it's essential to consult a mental health professional for proper evaluation and treatment.\n\n**Remember**:\n\n* It's okay to have setbacks, and it's important to be kind to yourself when they happen.\n* Change takes time, so be patient with yourself as you work towards improving your mental well-being.\n* You deserve to prioritize your mental health and seek support when needed.\n\nBy implementing these strategies and focusing on self-care, you can work towards improving your mental well-being and overall quality of life. If you ever need additional support or have more questions, please don't hesitate to reach out."
        }
      ].map((element, index) => ({
        message: element.content,
        senderId: element.role === 'assistant' ? 1 : 11,
        time: date.add(index * 25, 'minute').toDate(),
        feedback: {
          isSent: true,
          isDelivered: true,
          isSeen: true
        }
      }))
    }
  ]
}

const reorderChats = (arr: ChatsObj[], from: number, to: number) => {
  const item = arr.splice(from, 1)

  // ** Move the item to its new position
  arr.splice(to, 0, item[0])
}

// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
mock.onGet('/apps/chat/chats-and-contacts').reply(() => {
  const chatsContacts = data.chats.map((chat: ChatsObj) => {
    const contact = data.contacts.find((c: ContactType) => c.id === chat.userId)

    // @ts-ignore
    contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.chat[chat.chat.length - 1] }

    return contact
  })

  const contactsToShow = data.contacts.filter((co: ContactType) => {
    return !data.chats.some((ch: ChatsObj) => {
      return co.id === ch.id
    })
  })

  const profileUserData = {
    id: data.profileUser.id,
    avatar: data.profileUser.avatar,
    fullName: data.profileUser.fullName,
    status: data.profileUser.status
  }

  return [200, { chatsContacts, contacts: contactsToShow, profileUser: profileUserData }]
})

// ------------------------------------------------
// GET: Return User Profile
// ------------------------------------------------
mock.onGet('/apps/chat/users/profile-user').reply(() => [200, data.profileUser])

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock.onGet('/apps/chat/get-chat').reply(config => {
  // Get event id from URL
  let userId = config.params.id

  //  Convert Id to number
  userId = Number(userId)

  const chat = data.chats.find((c: ChatsObj) => c.id === userId)

  if (chat) chat.unseenMsgs = 0
  const contact = data.contacts.find((c: ContactType) => c.id === userId)

  // @ts-ignore
  if (contact.chat) contact.chat.unseenMsgs = 0

  return [200, { chat, contact }]
})

// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
mock.onPost('/apps/chat/send-msg').reply(config => {
  // Get event from post data
  const { obj } = JSON.parse(config.data).data

  let activeChat = data.chats.find((chat: ChatsObj) => chat.id === obj.contact.id)

  const newMessageData = {
    senderId: 11,
    time: new Date(),
    message: obj.message,
    feedback: {
      isSent: true,
      isSeen: false,
      isDelivered: false
    }
  }

  // If there's new chat for user create one
  let isNewChat = false

  if (activeChat === undefined) {
    isNewChat = true

    data.chats.push({
      id: obj.contact.id,
      userId: obj.contact.id,
      unseenMsgs: 0,
      chat: [newMessageData]
    })
    activeChat = data.chats[data.chats.length - 1]
  } else {
    activeChat.chat.push(newMessageData)
  }
  const response = { newMessageData, id: obj.contact.id }

  // @ts-ignore
  if (isNewChat) response.chat = activeChat

  reorderChats(
    data.chats,
    data.chats.findIndex(i => i.id === response.id),
    0
  )

  return [201, { response }]
})
