"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  // Get the current pathname using usePathname() hook
  const pathname = usePathname();

  return (
    <footer className="relative flex flex-wrap justify-between py-20 px-24 desktop:pr-52">
      {/* Logo and Info */}
      <div className="basis-72 mt-2">
        <Link href="/">
          <Image
            src="/logo/logo_150X60.png"
            alt="CaCart"
            width={150}
            height={60}
          />
        </Link>
        <div className="mt-2 text-primary_text">
          CaCart, the only e-commerce solutions you need to grow your business.
        </div>
        <div className="mt-4">
          <FiPhoneCall size={20} className="inline text-primary" />
          <span className="ml-2 text-body-sm font-medium">
            +1 (403) 000-0000
          </span>
        </div>
      </div>

      {/* Quick Shopping Categories */}
      <div className="basis-48 mt-6">
        <div className="text-body-lg font-semibold">Quick Shop</div>
        <Link
          href="/"
          className={`block mt-6 ${pathname === "/" ? "text-primary" : "text-primary_text hover:text-primary"}`}
        >
          Home
        </Link>
        <Link href="#" className="block mt-3 font-medium text-primary_text">
          🔥 Best Sellers
        </Link>
        <Link href="#" className="block mt-3 text-primary_text">
          New Releases
        </Link>
      </div>

      {/* Company Info */}
      <div className="basis-48 mt-6">
        <div className="text-body-lg font-semibold">Company</div>
        <Link href="#" className="block mt-6 text-primary_text">
          Overview
        </Link>
        <Link href="#" className="block mt-3 text-primary_text">
          Teams
        </Link>
        <Link href="#" className="block mt-3 text-primary_text">
          Sell on Cacart
        </Link>
        <Link href="#" className="block mt-3 text-primary_text">
          Policies
        </Link>
      </div>

      {/* Help & Legal Links */}
      <div className="basis-48 mt-6">
        <div className="text-body-lg font-semibold">Quick Links</div>
        <Link href="#" className="block mt-6 text-primary_text">
          Help Centre
        </Link>
        <Link href="/privacy-policy" className="block mt-3 text-primary_text">
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className="block mt-3 text-primary_text">
          Terms of Use
        </Link>
      </div>

      {/* Social Links */}
      <div className="basis-48 mt-6">
        <div className="text-body-lg font-semibold">Follow Us On</div>
        <div className="inline-block mt-6 p-2 border border-stroke rounded-full">
          <Link href="#">
            <FaTwitter />
          </Link>
        </div>
        <div className="inline-block mt-6 ml-3 p-2 border border-stroke rounded-full">
          <Link href="#">
            <FaLinkedinIn />
          </Link>
        </div>
        <div className="mt-3 text-primary_text">© 2024 Cacart.</div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-gradient-to-r from-teal-100 to-white" />
    </footer>
  );
}
