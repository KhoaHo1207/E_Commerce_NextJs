"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Navlink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: Navlink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/UI-Components/Shop",
    dropdown: [
      {
        label: "Shop",
        href: "/UI-Components/Shop",
      },
      {
        label: "Shop Details",
        href: "/UI-Components/Shop?id=1",
      },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      {
        label: "Cart",
        href: "/UI-Components/Pages/cart",
      },
      {
        label: "Wishlist",
        href: "/UI-Components/Pages/wishlist",
      },
      {
        label: "Checkout",
        href: "/UI-Components/Pages/checkout",
      },
      {
        label: "Account",
        href: "/UI-Components/Pages/account",
      },
    ],
  },
  {
    label: "Blog",
    href: "#",
    dropdown: [
      {
        label: "Blogs",
        href: "/UI-Components/Blogs",
      },
      {
        label: "Blogs Detail",
        href: "/UI-Components/Blogs/blogDetails?id=1",
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/UI-Components/Pages/contact",
  },
];
const BottomNav = () => {
  const [mobileMenuOpen, setMobileMenuOPen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [isFixed, setIsFixed] = useState(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlist] = useState<number>(0);

  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const uniqueCart = new Set(cart.map((item: any) => item.Id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id));

      setCartCount(uniqueCart.size);
      setWishlist(uniqueWishlist.size);
    };

    loadCounts();
    window.addEventListener("storage", loadCounts);
    return () => window.removeEventListener("storageUpdate", loadCounts);
  }, []);
  return (
    <div
      className={`w-full bg-white shadow-sm transition-all duration-500 ${
        isFixed ? "fixed top-0 left-0 z-50 fixed-nav" : ""
      }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%] text-gray-700">
        <Link
          href={"/"}
          className={`text-3xl font-bold Merienda text-black ${
            isFixed ? "lg:flex" : "hidden"
          }`}
        >
          {" "}
          E_<span className="text-[var(--prim-color)]">Commerce</span>
        </Link>
        <nav className="hidden lg:flex space-x-6 menu-link relative">
          {navLinks.map((link, index) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="flex items-center relative group z-50"
              >
                <Link href={link.href} className="flex items-center gap-2">
                  {link.label}
                  <i className="ri-arrow-down-s-line self-center"></i>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl border border-gray-100 rounded-lg min-w-[150px]">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 rounded-md hover:bg-[var(--prim-light)] transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                href={link.href}
                className="block px-4 py-2 rounded-md hover:bg-[var(--prim-light)] transition-all"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <button className="nav-button cursor-pointer font-bold bg-[var(--prim-color)] text-white p-3 hidden lg:flex">
          <i className="bi bi-telephone pe-2 text-xl"> 0901 3526 51</i>
        </button>

        {/* Mobile Nav Header */}
        <div className="lg:hidden flex items-center justify-between gap-4 w-full py-5">
          <button
            onClick={() => setMobileMenuOPen((prev) => !prev)}
            className="text-2xl focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-x-5">
              <i className="ri-menu-line"></i>
            </div>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="flex lg:hidden items-center space-x-6">
            {/* WishList */}
            <Link href={"/UI-Components/Pages/wishlist"} className="relative">
              <i className="bi bi-heart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all"></i>
              <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs size-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            </Link>
            {/* Cart */}
            <Link href={"/UI-Components/Pages/wishlist"} className="relative">
              <i className="bi bi-cart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all"></i>
              <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs size-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
