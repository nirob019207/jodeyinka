"use client"
import EventDetails from "@/components/EventDetails/EventDetails";
import EventRegister from "@/components/EventRegister/EventRegister";
import Sponsorship from "@/components/SponsarShip/SponsarShip";
import { useGetMeQuery } from "@/redux/Api/userApi";
import React from "react";

export default function page() {
  const { data:sponsor } = useGetMeQuery({});
  
  
  const userInformation = sponsor?.data;
  return (
    <div>
      <EventDetails />
      {userInformation?.role === "SPONSOR" && userInformation?.sponsorStatus === "APPROVED" && (
         <Sponsorship />
        )}
        
          {userInformation?.role === "MEMBERSHIP" && (
         <EventRegister />
        )}

    </div>
  );
}
