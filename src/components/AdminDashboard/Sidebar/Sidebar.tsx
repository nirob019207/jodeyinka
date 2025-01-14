import Link from "next/link";
import { usePathname } from "next/navigation";
import adminlogo from "@/asset/admin/adminlogo.svg";
import Image from "next/image";
import { LucideLayoutDashboard } from "lucide-react";
import { RxMagicWand } from "react-icons/rx";
// import sponser from "@/asset/admin/sponser.svg";
import { FaRegUser } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
import { GrResources, GrTransaction } from "react-icons/gr"
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
// import { useRouter } from "next/router";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-72  bg-white h-[855px]">
      <div className="py-7 pl-6 text-xl font-bold flex items-center space-x-2">
        <div className="w-10">
          <Image src={adminlogo} alt="logo" />
        </div>
        <span>WSF</span>
      </div>

      <nav className="mt-6">
        <ul>
          <li>
            <Link
              href="/admin/dashboard"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/dashboard"
                  ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium"
                  : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <LucideLayoutDashboard className="text-[24px] font-bold" />
                <span>Dashboard</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/profile"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/profile"
                  ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium"
                  : ""
              }`}
            >
              <span className="flex items-center space-x-2">
              <LuUser className="text-[24px] font-bold" />
                <span>Profile</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/create-event"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/create-event"
                  ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium"
                  : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <RxMagicWand className="text-[24px] font-bold" />
                <span>Create Event</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/transaction"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/transaction" ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
              <GrTransaction className="text-[24px] font-bold" />
                <span>Transaction</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/donate"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/donate" ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
              <RiMoneyDollarBoxLine className="text-[24px] font-bold" />
                <span>Donate</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/resource"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/resource" ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
              <GrResources className="text-[24px] font-bold" />
                <span>Resource</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/sponsor"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/sponsor" ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <FaRegUser className="text-[24px] font-bold" />
                <span>Sponsor</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/event-history"
              className={`block pl-6 py-2 mb-3  ${
                pathname === "/admin/event-history" ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
              <GoHistory className="text-[24px] font-bold" />
                <span>Event History</span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4  cursor-pointer mt-[220px]">
        <span className="flex items-center space-x-2">
        <RiLogoutCircleLine className="text-[24px] font-bold"/>
          <span>Log Out</span>
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
