import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import adminlogo from "@/asset/admin/adminlogo.svg";
import Image from "next/image";
import { LucideLayoutDashboard } from "lucide-react";
import { RxMagicWand } from "react-icons/rx";

import { GrResources, GrTransaction } from "react-icons/gr";
import { RiLogoutCircleLine} from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { MdOutlinePermMedia } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { useGetMeQuery } from "@/redux/Api/userApi";
import { setUser } from "@/redux/ReduxFunction";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import cookies from "js-cookie";

const Sidebar = () => {
  const pathname = usePathname();
   const { data } = useGetMeQuery({});
   const role = data?.data?.role; // Current user role
   console.log("role", role)
   const router=useRouter()
   const dispatch=useDispatch()

   const menuItems = [
    { href: "/admin/dashboard", icon: LucideLayoutDashboard, label: "Dashboard", roles: ["ADMIN"] },
    { href: "/admin/profile", icon: LuUser, label: "Profile", roles: ["ADMIN", "SPONSOR", "USER", "MEMBER"] },
    { href: "/admin/event-history", icon: RxMagicWand, label: "Event", roles: [ "ADMIN"] },
    { href: "/admin/all-transaction", icon: GrTransaction, label: "ALL Transaction", roles: ["ADMIN"] },

    { href: "/admin/transaction", icon: GrTransaction, label: "Transaction", roles: ["MEMBER"] },
    // { href: "/admin/donate", icon: RiMoneyDollarBoxLine, label: "Donate", roles: ["ADMIN", "SPONSOR", "USER"] },
    { href: "/admin/sponsor", icon: GrTransaction, label: "Sponosr Request", roles: ["ADMIN"] },

    { href: "/admin/resource-list", icon: GrResources, label: "Resource", roles: ["ADMIN","MEMBER"] },
    { href: "/admin/media-list", icon: MdOutlinePermMedia, label: "Media", roles: ["ADMIN","MEMBER"] },
    { href: "/admin/blog-list", icon: SiBlogger, label: "Blog", roles: ["ADMIN","MEMBER"] },
    // { href: "/admin/sponsor", icon: FaRegUser, label: "Sponsor", roles: ["ADMIN"] },
  ];
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));
  const handleLogout = () => {
    // Clear user data in Redux
    dispatch(setUser({ role: null, token: null, email: null }));

    // Remove the token from cookies
    cookies.remove("token");

 
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <aside className="w-72 bg-white max-h-screen">
      <div className="py-7 pl-6 text-xl font-bold flex items-center space-x-2">
        <div className="w-10">
          <Image src={adminlogo} alt="logo" />
        </div>
        <span>WSF</span>
      </div>

      <nav className="mt-6">
        <ul>
          {filteredMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`block pl-6 py-2 mb-3 ${
                  pathname === item.href
                    ? "bg-blue-700 py-4 text-white rounded-[8px] text-[18px] font-medium"
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
        <button onClick={handleLogout} className="flex items-center space-x-2">
          <RiLogoutCircleLine className="text-[24px] font-bold" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
