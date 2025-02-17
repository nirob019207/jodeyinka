import Image from "next/image";
import team from "@/asset/about/team.svg";

const HeroSection = () => {
  return (
    <section className="bg-[#F6F6F6] pt-[60px] md:pt-[120px] pb-[40px] md:pb-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0  flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h1 className="text-default font-semibold text-[20px] mb-4 flex items-center gap-2">
            <div className="w-[52px] h-[1.5px] border border-default"></div>WSF
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium text-default mb-4">
            The World Security Forum
          </h2>
          <p className="text-gray mb-9">
          World Cybersecurity Forum (WCF) is a nonprofit organization dedicated to building a safer and more secure digital world for everyone. We focus on education, advocacy, collaboration, and security as code (SaC) to address the rapidly evolving challenges of cybersecurity.
          </p>
          <p className="text-gray mb-9">
          By providing accessible training, raising awareness about online safety, and fostering partnerships across public and private sectors, we aim to close the cybersecurity knowledge gap and promote a culture of resilience. Whether supporting underserved communities or advising policymakers, WCF is committed to making cyberspace a trusted and inclusive space for all.
          </p>
          <button className="px-4 py-3 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl hidden md:flex">
            Meet Our Team
          </button>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src={team}
            alt="Team working together"
            width={500}
            height={350}
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-1 py-8">
        <div className="container mx-auto px-6 md:px-0  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center md:justify-items-start">
          {/* Stats Item */}
          {[
            { title: "Year of Experience", count: "15 +" },
            { title: "Happy Client", count: "15 +" },
            { title: "Our Product", count: "15 +" },
            { title: "Projects Delivered", count: "15 +" },
          ].map((stat, index) => (
            <div key={index} className="bg-[#F2F7FF] p-6 rounded-lg md:w-[260px] w-full">
              <p className="text-[#333333] text-base md:text-[22px] font-medium">
                {stat.title}
              </p>
              <h3 className="text-[36px] font-bold text-[#101010] mt-4">
                {stat.count}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
