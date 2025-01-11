import EventDetails from '@/components/EventDetails/EventDetails'
import Sponsorship from '@/components/SponsarShip/SponsarShip'
// import UpCommingEventPage from '@/components/UpcommingEvents/UpCommingEventPage'
import React from 'react'

const EventPage = () => {
  return (
    <div>
        <EventDetails/>
        {/* <UpCommingEventPage/> */}
        <Sponsorship/>
    </div>
  )
}

export default EventPage