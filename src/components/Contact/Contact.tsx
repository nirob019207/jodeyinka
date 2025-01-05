import React from "react";

const Contact = () => {
  const contactData = [
    {
      region: "North America",
      offices: [
        { name: "United States Office", email: "info@worldsecurityforum.org" },
      ],
    },
    {
      region: "South America",
      offices: [
        { name: "Brazil Office", email: "info@worldsecurityforum.org" },
      ],
    },
    {
      region: "Europe",
      offices: [
        { name: "London Office", email: "info@worldsecurityforum.org" },
      ],
    },
    {
      region: "Africa",
      offices: [
        { name: "Nigeria Office"},
        { name: "South Africa Office", email: "info@worldsecurityforum.org" },
      ],
    },
    {
      region: "Asia",
      offices: [
        { name: "Japan Office" },
        { name: "India Office", email: "info@worldsecurityforum.org" },
      ],
    },
    {
      region: "Australia",
      offices: [
        { name: "Sydney Office", email: "info@worldsecurityforum.org" },
      ],
    },
  ];
  return (
    <div className="bg-[#DEE8F7] py-[50px] md:py-[95px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-[36px] font-medium text-default">Contact Us</h2>
          <a href="#" className="text-blue-600 hover:underline text-[20px]">
            See All
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {contactData.map((region, index) => (
            <div key={index}>
              <h3 className="text-[20px] font-medium text-default mb-4">
                {region.region}
              </h3>
              {region.offices.map((office, i) => (
                <div key={i} className="w-40">
                  <p className="text-[#595959] mb-3">{office.name}</p>
                  <p
                    className="text-[#595959] break-words"
                  >
                    {office.email}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
