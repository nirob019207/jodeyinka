"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import membe1 from "@/asset/about/member1.svg";
import membe2 from "@/asset/about/member2.svg";
import membe3 from "@/asset/about/member3.svg";
import membe4 from "@/asset/about/member4.svg";

const teamMembers = [
  { id: 1, name: "Jackson", role: "Customer Success Lead", image: membe1 },
  { id: 2, name: "Orlando Diggs", role: "Customer Success Lead", image: membe2 },
  { id: 3, name: "Lana Steiner", role: "Customer Success Lead", image: membe3 },
  { id: 4, name: "Jameson", role: "Customer Success Lead", image: membe4 },
  { id: 5, name: "Temperance", role: "Customer Success Lead", image: membe1 },
];

const OurTeam = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    if (marquee) {
      gsap.to(marquee, {
        x: "-50%", 
        duration: 10,
        repeat: -1, 
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[60px] md:pb-[120px] relative overflow-hidden">
      {/* Shadows on both sides */}
      <div className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-[#F6F6F6] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-[#F6F6F6] to-transparent z-10"></div>

      <div className="container mx-auto px-0 md:text-start text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-medium text-default mb-4">Our Team</h2>
        <p className="text-[#475467] mb-8">
          Get to know the people who are dedicated to your success.
        </p>

        {/* Scrolling Team Section */}
        <div className="overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex w-[100%] space-x-6" 
          >
            {teamMembers.concat(teamMembers).map((member, index) => (
              <div
                key={index}
                className="shadow-md rounded-[4px] flex-shrink-0 w-64  relative  overflow-hidden"
              >
                {/* Team Member Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  className="rounded-t-lg"
                  width={262}
                  height={280}
                />

                {/* Blurred Card Content */}
                <div className="absolute bottom-0 w-full bg-[#FFFFFF99] backdrop-blur-md p-2">
                  <h3 className="text-xl font-medium text-[#1B1D20] mb-1">{member.name}</h3>
                  <p className="text-default">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
