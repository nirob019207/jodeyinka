import Link from "next/link";
import { Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
// import Contact from "@/components/Contact/Contact";
import CyberDefense from "@/components/CyberDefence/CyberDefence";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const allowedRoutes = ["/", "/media", "/about-us"];
  const showCyberDefense = allowedRoutes.includes(pathname);
  return (
    <div>
      <div>{showCyberDefense && <CyberDefense />}</div>
      <div className="containter mx-auto font-inter">
        <footer className="bg-[#002F4E] text-white px-6 py-12">
          <div className="container mx-auto grid gap-8 md:grid-cols-12">
            {/* Logo and Description Section */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M40 80C62.0916 80 80 62.0914 80 40C80 17.9086 62.0916 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80ZM46.174 30.9051C49.5836 27.4953 49.5836 21.9671 46.174 18.5573C42.7642 15.1476 37.236 15.1476 33.8262 18.5573C30.4166 21.9671 30.4166 27.4953 33.8262 30.9051L40 37.079L46.174 30.9051ZM49.095 46.174C52.5048 49.5838 58.033 49.5838 61.4428 46.174C64.8524 42.7642 64.8524 37.236 61.4428 33.8262C58.033 30.4165 52.5048 30.4165 49.095 33.8262L42.9212 40.0002L49.095 46.174ZM46.174 61.4428C49.5836 58.033 49.5836 52.5048 46.174 49.095L40 42.9212L33.8262 49.095C30.4166 52.5048 30.4166 58.033 33.8262 61.4428C37.236 64.8526 42.7642 64.8526 46.174 61.4428ZM18.5573 46.174C15.1476 42.7642 15.1476 37.236 18.5573 33.8262C21.9671 30.4165 27.4953 30.4165 30.9052 33.8262L37.079 40.0002L30.9052 46.174C27.4953 49.5838 21.9671 49.5838 18.5573 46.174Z"
                      fill="#0061FF"
                    />
                  </svg>
                </div>
                <span className="text-[48px] font-[600] ">WSF</span>
              </div>
              <p className="text-gray-300 text-sm">
                Dive into a space designed just for you. youre looking to engage
                with like-minded individuals, plan exciting events.
              </p>
            </div>

            {/* Policy Links */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-[24px] mb-4">Policy</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                {/* <Link
                    href=""
                    className="hover:text-white transition"
                  >
        
         Donation               
            </Link> */}
                  <Link
                    href="/donate"
                    className="hover:text-white transition"
                  >
                    Doantion
                  </Link>
                </li>
                <li>
                  <Link href="/ai" className="hover:text-white transition">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Data & Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-white transition"
                  >
                    Cybersecurity
                  </Link>
                </li>
              </ul>
            </div>

            {/* Media Links */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-[24px] mb-4">Media</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/news" className="hover:text-white transition">
                    News Releases
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition">
                    TechWonk Blog
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trending"
                    className="hover:text-white transition"
                  >
                    Trending @ WSF
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-[24px] text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <Link
                  href="https://facebook.com"
                  className="text-blue-400 transition bg-white p-2 rounded"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  href="https://youtube.com"
                  className="text-blue-500 transition bg-white p-2 rounded"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-blue-400 transition bg-white p-2 rounded"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="text-blue-600 transition bg-white p-2 rounded"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
