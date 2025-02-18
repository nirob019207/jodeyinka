import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import adminlogo from "@/asset/Forum_Logo-2.png";
import Image from "next/image";
import { AiOutlineDashboard, AiOutlineClose, AiOutlineTransaction } from "react-icons/ai";
import { FaUser, FaMoneyCheckAlt, FaBlogger, FaPhotoVideo, FaHandshake } from "react-icons/fa";
import { MdEvent, MdLibraryBooks} from "react-icons/md";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import cookies from "js-cookie";
import { useGetMeQuery } from "@/redux/Api/userApi";
import { setUser } from "@/redux/ReduxFunction";

interface SidebarProps {
  onCloseClick: () => void;
}

const Sidebar = ({ onCloseClick }: SidebarProps) => {
  const pathname = usePathname();
  const { data } = useGetMeQuery({});
  const role = data?.data?.role;
  const router = useRouter();
  const dispatch = useDispatch();

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: AiOutlineDashboard,
      label: "Dashboard",
      roles: ["ADMIN"],
    },
    {
      href: "/admin/profile",
      icon: FaUser,
      label: "Profile",
      roles: ["ADMIN", "SPONSOR", "USER", "MEMBER"],
    },
    {
      href: "/admin/event-history",
      icon: MdEvent,
      label: "Event",
      roles: ["ADMIN"],
    },
    {
      href: "/admin/all-transaction",
      icon: AiOutlineTransaction,
      label: "ALL Transaction",
      roles: ["ADMIN"],
    },
    {
      href: "/admin/transaction",
      icon: FaMoneyCheckAlt,
      label: "Transaction",
      roles: ["SPONSOR"],
    },
    {
      href: "/admin/sponsor",
      icon: FaHandshake,
      label: "Sponsor Request",
      roles: ["ADMIN"],
    },
    {
      href: "/admin/resource-list",
      icon: MdLibraryBooks,
      label: "Resource",
      roles: ["ADMIN","MEMBER"],
    },
    // {
    //   href: "/member/resource",
    //   icon: MdLibraryBooks,
    //   label: "Resource",
    //   roles: ["MEMBER"],
    // },
    {
      href: "/admin/media-list",
      icon: FaPhotoVideo,
      label: "Media",
      roles: ["ADMIN"],
    },
    {
      href: "/admin/blog-list",
      icon: FaBlogger,
      label: "Blog",
      roles: ["ADMIN"],
    },
    {
      href: "/register-events",
      icon: FaBlogger,
      label: "Register Event",
      roles: ["MEMBER"],
    },
  ];


  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    // Clear user data in Redux
    dispatch(setUser({ role: null, token: null, email: null }));

    // Remove the token from cookies
    cookies.remove("token");

    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="md:w-72 bg-white max-h-screen px-2 z[100]">
        <div className="py-7 pl-6 text-xl font-bold flex items-center space-x-2 justify-between">
          <div className="w-10 flex items-center gap-2">
            <Image src={adminlogo} alt="logo" />
            <span>WSF</span>
          </div>
          <AiOutlineClose onClick={onCloseClick} className="md:hidden flex" />
        </div>

        <nav className="mt-6">
          <ul>
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                onClick={onCloseClick}
                  href={item.href}
                  className={`block px-4 py-2 mb-3 ${
                    pathname === item.href
                      ? "bg-blue-700 py-4 text-white rounded-[8px] text-base md:text-[18px] font-medium"
                      : ""
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="text-[24px] font-bold" />
                    <span>{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 cursor-pointer mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
    
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
