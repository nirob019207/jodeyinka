import Link from "next/link";
import { Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
// import Contact from "@/components/Contact/Contact";
import logo from "@/asset/Forum_Logo-2.png"
import CyberDefense from "@/components/CyberDefence/CyberDefence";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
                  <Image src={logo} alt="Description" height={60} width={60} />
                </div>
                <span className="text-[48px] font-[600] ">WCF</span>
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
                  <Link href="/resources" className="hover:text-white transition">
                    resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                  Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="hover:text-white transition"
                  >
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            {/* Media Links */}
            <div className="md:col-span-3">
              <h3 className="font-semibold text-[24px] mb-4">Media</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/about-us" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition">
                    TechWonk Blog
                  </Link>
                </li>
                <li>
                  <Link href="/event" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/media"
                    className="hover:text-white transition"
                  >
                    Media
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
