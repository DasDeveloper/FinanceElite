import React from 'react'
import FullCalendar, {formatDate} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"

const Calendar = () => {
  return (
    <FullCalendar

      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      height={810}
      aspectRatio={5}
      weekends={false}
      events={[
        { title: 'event 1', date: '2019-04-01' },
        { title: 'event 2', date: '2019-04-02' }
      ]}
  />
  )
}

export default Calendar;