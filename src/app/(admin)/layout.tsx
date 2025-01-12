"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-4 text-xl font-bold border-b border-blue-500">
          WSF
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                href="/admin/dashboard"
                className={`block px-4 py-2 hover:bg-blue-700 ${
                  pathname === "/admin/dashboard" ? "bg-blue-700" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create-event"
                className={`block px-4 py-2 hover:bg-blue-700 ${
                  pathname === "/admin/create-event" ? "bg-blue-700" : ""
                }`}
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/admin/transaction"
                className={`block px-4 py-2 hover:bg-blue-700 ${
                  pathname === "/admin/transaction" ? "bg-blue-700" : ""
                }`}
              >
                Transaction
              </Link>
            </li>
            <li>
              <Link
                href="/admin/sponsor"
                className={`block px-4 py-2 hover:bg-blue-700 ${
                  pathname === "/admin/sponsor" ? "bg-blue-700" : ""
                }`}
              >
                Sponsor
              </Link>
            </li>
            <li>
              <Link
                href="/admin/event-history"
                className={`block px-4 py-2 hover:bg-blue-700 ${
                  pathname === "/admin/event-history" ? "bg-blue-700" : ""
                }`}
              >
                Event History
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Welcome Back, Admin!</h1>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
