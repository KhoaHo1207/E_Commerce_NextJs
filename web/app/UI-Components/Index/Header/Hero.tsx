"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Hero = () => {
  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="relative Hero flex items-center gap-5">
        <Swiper
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="h-full heri-swiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="hero-wrap relative w-full rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col lg:flex-row items-center justify-between bg-[url('hero-bg-01.webp)] bg-cover bg-center">
              <div className="w-full p-5 z-3 h-full flex flex-col justify-around items-start "></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
