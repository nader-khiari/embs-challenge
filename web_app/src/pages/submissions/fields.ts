export const fields = [
  { shortenedName: 'full_name', fullName: 'First and last name', type: 'text', options: null },
  { shortenedName: 'age', fullName: 'What is your age', type: 'number', options: null },
  {
    shortenedName: 'gender',
    fullName: 'What is your gender',
    type: 'select',
    options: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  { shortenedName: 'occupation_if_any', fullName: 'What is your current occupation/job', type: 'text', options: null },
  {
    shortenedName: 'work_hours_per_week',
    fullName: 'How many hours per week does your job require (0 if unemployed)',
    type: 'number',
    options: null
  },
  {
    shortenedName: 'average_hours_of_sleep_per_day',
    fullName: 'How many hours of sleep do you get on average (per day)',
    type: 'number',
    options: null
  },
  {
    shortenedName: 'sleep_start',
    fullName: 'When do you usually get to bed to sleep',
    type: 'select',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(value => ({
      value,
      label: `${value.toString().padStart(2, '0')}:00`
    }))
  },
  {
    shortenedName: 'mental_health_history',
    fullName: 'Can you tell us if you have any history of diagnosed mental health issues?',
    type: 'text',
    options: null
  }
]

export const gad7Fields = [
  {
    shortenedName: 'feeling_anxious',
    fullName: 'Feeling nervous, anxious or on edge',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'controlling_worry',
    fullName: 'Not being able to stop or control worrying',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'worrying_about_things',
    fullName: 'Worrying too much about different things',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'trouble_relaxing',
    fullName: 'Trouble relaxing',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'restlessness',
    fullName: 'Being so restless that it is hard to sit still',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'annoyance_irritation',
    fullName: 'Becoming easily annoyed or irritable',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'feeling_afraid',
    fullName: 'Feeling afraid as if something awful might happen',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  }
]

export const phq9Fields = [
  {
    shortenedName: 'interest_in_things',
    fullName: 'Little interest or pleasure in doing things',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'depression',
    fullName: 'Feeling down, depressed or hopeless',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'trouble_sleeping',
    fullName: 'Trouble falling asleep, staying asleep, or sleeping too much',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'tiredness',
    fullName: 'Feeling tired or having little energy',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'appetite',
    fullName: 'Poor appetite or overeating',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'feeling_bad',
    fullName: 'Feeling bad about yourself - or that you’re a failure or have let yourself or your family down',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'trouble_concentrating',
    fullName: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'restlessness',
    fullName:
      'Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    shortenedName: 'self_harm',
    fullName: 'Thoughts that you would be better off dead or of hurting yourself in some way',
    type: 'select',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  }
]
