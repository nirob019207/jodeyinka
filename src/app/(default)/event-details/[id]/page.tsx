"use client";
import EventDetails from "@/components/EventDetails/EventDetails";
import EventRegister from "@/components/EventRegister/EventRegister";
import Sponsorship from "@/components/SponsarShip/SponsarShip";
import { useEventDetailsQuery } from "@/redux/Api/eventApi";
import { useGetMeQuery } from "@/redux/Api/userApi";
import { useParams } from "next/navigation";

export default function Page() {
  const { data: sponsor } = useGetMeQuery({});
    const id = useParams();
    const { data, } = useEventDetailsQuery({ id: id?.id });
    const singleEvent = data?.data;
    console.log(singleEvent?.isUserRegistered)
    console.log("singleEvent", singleEvent);


  const userInformation = sponsor?.data;


  return (
    <div>
      <EventDetails  />
      {userInformation?.role === "SPONSOR" &&
        userInformation?.sponsorStatus === "APPROVED" && <Sponsorship />}

{(singleEvent?.isUserRegistered === false &&
  userInformation?.role === "MEMBER") && <EventRegister />}

   
    </div>
  );
}
  