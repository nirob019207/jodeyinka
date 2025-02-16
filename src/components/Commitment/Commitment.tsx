import CommitmentCard from "./CommitmentCard";

const ethicsPoints = [
    {
      title: "Confidentiality and Integrity",
      description:
        "Members are dedicated to preserving the confidentiality, integrity, and availability of the systems and data they protect, ensuring the trust and safety of individuals, organizations, and communities.",
    },
    {
      title: "Professional Responsibility",
      description:
        "Members will act with professionalism and care, using their expertise to safeguard critical information systems while considering the broader impact of their actions.",
    },
    {
      title: "Ethical Leadership",
      description:
        "Members are committed to leading by example, fostering a culture of ethics and collaboration within the cybersecurity field.",
    },
    {
      title: "Service to the Public",
      description:
        "Members will prioritize the public interest, promoting security, privacy, and resilience across digital ecosystems.",
    },
    {
      title: "Accountability",
      description:
        "Members are required to uphold this Code of Ethics in all professional activities. Failure to comply with these principles may result in revocation of membership.",
    },
    {
      title: "Fair Treatment",
      description:
        "I will treat everyone with respect and fairness, embracing diversity and inclusivity. I will not discriminate based on age, disability, gender identity, sexual orientation, religion, race, ethnicity, or national origin.",
    },
    {
      title: "Privacy",
      description:
        "I will access sensitive information only when necessary and in compliance with legal and organizational policies. I will safeguard the confidentiality of all data.",
    },
    {
      title: "Transparency and Communication",
      description:
        "I will maintain open communication with stakeholders and inform them of security practices, monitoring policies, and legal obligations.",
    },
    {
      title: "System Integrity",
      description:
        "I will ensure the integrity, reliability, and security of systems through regular maintenance, updates, and prevention of unauthorized access.",
    },
    {
      title: "Collaboration",
      description:
        "I will collaborate with and support colleagues in the cybersecurity community, recognizing that digital security is a shared responsibility.",
    },
    {
      title: "Integrity and Honesty",
      description:
        "I will act with integrity, seek assistance when needed, provide unbiased advice, and disclose conflicts of interest.",
    },
    {
      title: "Continuous Learning",
      description:
        "I will enhance my technical skills and leadership abilities while contributing to the growth of others by sharing knowledge and best practices.",
    },
    {
      title: "Social Responsibility",
      description:
        "I will advocate for ethical cybersecurity practices and influence policies that promote fairness and protect individual rights.",
    },
    {
      title: "Workplace Excellence",
      description:
        "I will foster a safe, inclusive, and supportive workplace environment that promotes productivity and well-being for all.",
    },
  ];
  


const Commitment = () => {
    return (
        <div>
           <div className="container mx-auto py-12 px-6">
      <h1 className="text-[36px] font-medium mb-4 text-default">
      Code of Ethics for [Nonprofit Cybersecurity Organization Name]
      </h1>
      <p className="text-left text-[#475467] mb-6  ">
      This Code of Ethics is designed to guide our members in exercising sound professional judgment while upholding the highest ethical standards and fulfilling their responsibilities to the communities we serve. These principles aim to promote trust, accountability, and integrity in all cybersecurity-related activities.
      </p>
      <p className="text-left text-[#475467] mb-6  ">
      Our Code of Ethics builds upon a legacy of globally recognized ethical frameworks, reflecting the shared values of organizations dedicated to advancing cybersecurity for the public good. While no single set of guidelines can address every situation, this Code provides a foundation for ethical decision-making and serves as a resource when challenges arise.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ethicsPoints.map((point, index) => (
          <CommitmentCard key={index} title={point.title} description={point.description} />
        ))}
      </div>
    </div>
        </div>
    );
};

export default Commitment;