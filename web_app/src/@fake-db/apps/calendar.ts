// ** Mock Adapter
import dayjs from 'dayjs'
import mock from 'src/@fake-db/mock'

// ** Types
import { EventType } from 'src/types/apps/calendarTypes'

const date = dayjs().subtract(1, 'day')

const data: { events: EventType[] } = {
  events: [
    {
      id: 1,
      url: '',
      title: 'Sleeping',
      start: date.toDate(),
      end: date.add(7, 'hour').toDate(),
      allDay: false,
      extendedProps: {
        calendar: 'Sleep'
      }
    }
  ]
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  const { calendars } = config.params

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/add-event').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data).data

  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1

  data.events.push(event)

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost('/apps/calendar/update-event').reply(config => {
  const eventData = JSON.parse(config.data).data.event

  // Convert Id to number
  eventData.id = Number(eventData.id)

  const event = data.events.find(ev => ev.id === Number(eventData.id))

  if (event) {
    Object.assign(event, eventData)

    return [200, { event }]
  } else {
    return [400, { error: `Event doesn't exist` }]
  }
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete('/apps/calendar/remove-event').reply(config => {
  // Get event id from URL
  const { id } = config.params

  // Convert Id to number
  const eventId = Number(id)

  const eventIndex = data.events.findIndex(ev => ev.id === eventId)
  data.events.splice(eventIndex, 1)

  return [200]
})
