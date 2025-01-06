import EventDetails from '@/components/EventDetails/EventDetails'
import UpCommingEventPage from '@/components/UpcommingEvents/UpCommingEventPage'
import React from 'react'

const EventPage = () => {
  return (
    <div>
        <EventDetails/>
        <UpCommingEventPage/>
    </div>
  )
}

export default EventPage