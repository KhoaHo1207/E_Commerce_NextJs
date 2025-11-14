"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MiddleNav = () => {
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
    <>
      <div className="w-full border-b border-gray-300 relative">
        <div className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
          {/* Logo */}
          <Link href={"/"} className="text-3xl font-bold Marienda text-black">
            E_<span className="text-[var(--prim-color)]">Commerce</span>
          </Link>

          {/* Search */}
          <div className="flex-1 ms-6 mx-0 lg:mx-6 max-w-xl relative hidden lg:flex">
            <input
              type="text"
              placeholder="Serach for a product or brand"
              className="flex-1 border px-3 py-2 rounded-s-lg border-gray-400 outline-none"
            />
            <button className="bg-[var(--prim-color)] text-white px-3 rounded-r cursor-pointer">
              <i className="bi bi-search"></i>
            </button>

            {/* Location Dropdown */}
            <div className="hidden lg:flex text-sm ms-5 bg-white items-center justify-center ps-4 rounded-lg border border-gray-400">
              <i className="bi bi-geo-alt text-lg text-[var(--prim-color)]"></i>
              <select
                name="location"
                id=""
                className="px-3 rounded-lg text-[var(--prim-color)] font-semibold focus:border-[var(--prim-color)] appearance-none cursor-pointer outline-none"
                defaultValue={"New York"}
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Phoenix">Phoenix</option>
                <option value="Philadelphia">Philadelphia</option>
              </select>
            </div>
          </div>
          {/* Wishlist + Cart */}
          <div className="hidden lg:flex items-center space-x-6">
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
        </div>
      </div>
    </>
  );
};

export default MiddleNav;
