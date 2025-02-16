import { FaCheckCircle } from "react-icons/fa";

type CardProps = {
    title: string;
    description: string;
  };

const CommitmentCard = ({ title, description }: CardProps) => {
    return (
        <div className="p-6 border border-gray-200 shadow-md rounded-lg bg-white">
        <div className="flex items-center gap-3 mb-4">
          <FaCheckCircle className="text-green-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    );
};

export default CommitmentCard;