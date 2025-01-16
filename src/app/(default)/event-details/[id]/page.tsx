import EventDetails from "@/components/EventDetails/EventDetails";
import EventRegister from "@/components/EventRegister/EventRegister";
import Sponsorship from "@/components/SponsarShip/SponsarShip";
import React from "react";

export default function page() {
  return (
    <div>
      <EventDetails />
      <Sponsorship />
      <EventRegister/>
    </div>
  );
}
