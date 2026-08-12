// src/app/globals.css
@import "tailwindcss";

@theme {
  --color-brand-red: #D32F2F;
  /* Adam's Racing Red */
  --color-brand-red-hover: #B71C1C;
  --color-brand-black: #111111;
  /* Midnight Charcoal Header/Footer */
  --color-brand-gray-bg: #F5F5F7;
  /* Studio Soft Gray */
  --color-brand-green: #2E7D32;
  /* Success Badges */
  --color-brand-gold: #FFC107;
  /* Rating Stars */
}

:root {
  --background: #ffffff;
  --foreground: #111111;
}

html {
  scroll-behavior: smooth;
}

/* ชดเชยระยะ Sticky Navbar เพื่อไม่ให้บังส่วนหัวของแต่ละ Section */
section[id] {
  scroll-margin-top: 6rem;
  /* ~96px ชดเชยความสูง PromoBar + Navbar */
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow-x: hidden;
}

/* Custom Utilities for Touch & Mobile Optimization */
.touch-callout-none {
  -webkit-touch-callout: none;
}

/* Custom Infinite Marquee Animation */
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

*************************************************************************************
// src/app/page.tsx

import PromoBar from "@/components/common/PromoBar";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import BundleSection from "@/components/home/BundleSection";
import CarCareCenter from "@/components/home/CarCareCenter";
import FaqSection from "@/components/home/FaqSection";
import FaqSchema from "@/components/seo/FaqSchema";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-brand-gray-bg)]">
      {/* 1. FAQ Schema Injection (AEO Engine) */}
      <FaqSchema />

      {/* 2. Top Announcement Bar */}
      <PromoBar />

      {/* 3. Main Navigation Header */}
      <Navbar />

      {/* 4. Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <HeroSection />

        {/* Products Section */}
        <ProductGrid />

        {/* Bundles & Savers Section */}
        <BundleSection />

        {/* Car Care Center (Video Hub & Proof) */}
        <CarCareCenter />

        {/* AEO FAQ Section */}
        <FaqSection />
      </main>

      {/* 5. Footer Component */}
      <Footer />
    </div>
  );
}



*************************************************************************************
src/components/common/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 🎯 ฟังก์ชัน Smooth Scroll แม่นยำ 100% ทั้ง Mobile และ Desktop
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();

        // 1. สั่งปิด Mobile Menu Drawer ก่อน
        setIsMobileMenuOpen(false);

        // 2. ใช้ requestAnimationFrame รอให้ Layout ของ Mobile Drawer ปิดสนิทก่อนคำนวณตำแหน่ง
        requestAnimationFrame(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start', // บังคับให้หยุดที่ขอบบนสุดของ Section
                });

                // อัปเดต URL Hash โดยไม่ส่งผลต่อ Next.js Router
                window.history.pushState(null, '', `#${sectionId}`);
            }
        });
    };

    return (
        <header className="sticky top-0 z-40 bg-[var(--color-brand-black)] border-b border-zinc-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Mobile Menu Button (Left on Mobile) */}
                    <div className="flex items-center lg:hidden">
                        {isMobileMenuOpen ? (
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close Main Menu"
                                aria-expanded="true"
                                className="p-2 text-zinc-300 hover:text-[var(--color-brand-red)] focus:outline-hidden"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open Main Menu"
                                aria-expanded="false"
                                className="p-2 text-zinc-300 hover:text-[var(--color-brand-red)] focus:outline-hidden"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Logo Brand (Scroll Back to Top) */}
                    <div className="flex-1 lg:flex-none text-center lg:text-left flex items-center justify-center lg:justify-start h-full py-1">
                        <Link
                            href="/"
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            title="SORNCarCareShop Homepage"
                            className="inline-flex items-center gap-2.5 h-full cursor-pointer"
                        >
                            <Image
                                src="/images/ui/SornCarCareShop_2.png"
                                alt="SORNCarCareShop Logo"
                                width={120}
                                height={120}
                                priority
                                className="w-auto h-12 sm:h-14 max-h-full object-contain"
                            />
                            <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                                SORN<span className="text-[var(--color-brand-red)]">CarCare</span><span className="text-white">Shop</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links (SPA Smooth Scroll Navigation) */}
                    <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold tracking-wider text-white uppercase">
                        <a
                            href="#products"
                            onClick={(e) => scrollToSection(e, 'products')}
                            className="hover:text-[var(--color-brand-red)] transition-colors cursor-pointer"
                        >
                            Products
                        </a>
                        <a
                            href="#bundles"
                            onClick={(e) => scrollToSection(e, 'bundles')}
                            className="hover:text-[var(--color-brand-red)] transition-colors cursor-pointer"
                        >
                            Bundles & Savers
                        </a>
                        <a
                            href="#car-care-center"
                            onClick={(e) => scrollToSection(e, 'car-care-center')}
                            className="hover:text-[var(--color-brand-red)] transition-colors cursor-pointer"
                        >
                            Car Care Center
                        </a>
                        <a
                            href="#faq"
                            onClick={(e) => scrollToSection(e, 'faq')}
                            className="hover:text-[var(--color-brand-red)] transition-colors cursor-pointer"
                        >
                            FAQ
                        </a>
                    </nav>

                    {/* Right Utilities (Ultra Compact LINE Order Button) */}
                    <div className="flex items-center">
                        <a
                            href="https://line.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Order or Consult via LINE Official Account"
                            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#06C755] hover:bg-[#05b34c] rounded-full transition-all shadow-xs cursor-pointer shrink-0"
                        >
                            {/* LINE SVG Icon */}
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.412-.105-.53-.282l-2.435-3.647v3.272c0 .347-.282.63-.63.63-.346 0-.628-.283-.628-.63V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.202-.033.211 0 .413.105.531.282l2.434 3.648V8.108c0-.346.282-.63.63-.63.346 0 .626.284.626.63v4.771zm-5.741 0c0 .347-.282.63-.629.63-.346 0-.63-.283-.63-.63V8.108c0-.346.284-.63.63-.63.347 0 .629.284.629.63v4.771zm-2.466.63H4.917c-.345 0-.63-.283-.63-.63V8.108c0-.346.285-.63.63-.63.346 0 .628.284.628.63v4.141h1.758c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08-.085.643-.388 2.518-.426 2.703-.058.285-.27.111.968-.627 1.238-.737 6.678-3.931 9.117-6.721C22.617 14.887 24 12.735 24 10.314" />
                            </svg>
                            <span className="whitespace-nowrap">สั่งซื้อ</span>
                        </a>
                    </div>

                </div>
            </div>

            {/* Mobile Drawer Navigation Panel (SPA Smooth Scroll Links) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[var(--color-brand-black)] border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
                    <a
                        href="#products"
                        onClick={(e) => scrollToSection(e, 'products')}
                        className="block px-3 py-2 text-base font-bold uppercase tracking-wider text-white hover:bg-zinc-800 rounded-md cursor-pointer"
                    >
                        PRODUCTS
                    </a>
                    <a
                        href="#bundles"
                        onClick={(e) => scrollToSection(e, 'bundles')}
                        className="block px-3 py-2 text-base font-bold uppercase tracking-wider text-white hover:bg-zinc-800 rounded-md cursor-pointer"
                    >
                        BUNDLES & SAVERS
                    </a>
                    <a
                        href="#car-care-center"
                        onClick={(e) => scrollToSection(e, 'car-care-center')}
                        className="block px-3 py-2 text-base font-bold uppercase tracking-wider text-white hover:bg-zinc-800 rounded-md cursor-pointer"
                    >
                        CAR CARE CENTER
                    </a>
                    <a
                        href="#faq"
                        onClick={(e) => scrollToSection(e, 'faq')}
                        className="block px-3 py-2 text-base font-bold uppercase tracking-wider text-white hover:bg-zinc-800 rounded-md cursor-pointer"
                    >
                        FAQ
                    </a>
                    <div className="pt-2">
                        <a
                            href="https://line.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Order or Consult via LINE Official Account"
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-[#06C755] hover:bg-[#05b34c] rounded-lg shadow-md cursor-pointer"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.412-.105-.53-.282l-2.435-3.647v3.272c0 .347-.282.63-.63.63-.346 0-.628-.283-.628-.63V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.202-.033.211 0 .413.105.531.282l2.434 3.648V8.108c0-.346.282-.63.63-.63.346 0 .626.284.626.63v4.771zm-5.741 0c0 .347-.282.63-.629.63-.346 0-.63-.283-.63-.63V8.108c0-.346.284-.63.63-.63.347 0 .629.284.629.63v4.771zm-2.466.63H4.917c-.345 0-.63-.283-.63-.63V8.108c0-.346.285-.63.63-.63.346 0 .628.284.628.63v4.141h1.758c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08-.085.643-.388 2.518-.426 2.703-.058.285-.27.111.968-.627 1.238-.737 6.678-3.931 9.117-6.721C22.617 14.887 24 12.735 24 10.314" />
                            </svg>
                            <span>สั่งซื้อ</span>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}




*************************************************************************************
// src/components/common/PromoBar.tsx
import React from 'react';

export default function PromoBar() {
    return (
        <aside
            aria-label="Promotion Announcement"
            className="bg-[var(--color-brand-red)] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide shadow-xs relative z-50"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
                <span className="bg-white text-[var(--color-brand-red)] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    PROMO
                </span>
                <span>
                    ส่งฟรีทั่วไทย! เมื่อสั่งซื้อ <strong>Crystal Wax Spray (699.-)</strong> หรือ ซื้อครบ 800.- ขึ้นไป
                </span>
            </div>
        </aside>
    );
}



*************************************************************************************
// src/components/home/HeroSection.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';

// รายการภาพ Banner คอลเลกชัน (จับคู่ Mobile / Desktop)
const HERO_SLIDES = [
    {
        id: 'sccs-001',
        mobileSrc: '/images/hero/Hero_M_SCCS001.png',
        desktopSrc: '/images/hero/Hero_D_SCCS001.png',
        alt: 'SornCarCareShop จำหน่ายผลิิตภัณฑ์ ดูแลปกป้องรถยนต์ จากประาบการณ์ตรงนับ 10 ปี',
    },
    {
        id: 'sccs-002',
        mobileSrc: '/images/hero/Hero_M_SCCS002.png',
        desktopSrc: '/images/hero/Hero_D_SCCS002.png',
        alt: 'SornCarCareShop จำหน่ายผลิิตภัณฑ์ดูแลปกป้องรถยนต์ 4 ชนิดหลัก',
    },
    {
        id: 'sccs-003',
        mobileSrc: '/images/hero/Hero_M_SCCS003.png',
        desktopSrc: '/images/hero/Hero_D_SCCS003.png',
        alt: 'Mr.SornCarWash ล้างอัดฉีด ขัดเคลือบสี เคลือบแก้วเคลือบเซรามิก Tel:0815316380',
    },
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // ฟังก์ชันเลื่อนไปยัง Slide ถัดไป
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, []);

    // ฟังก์ชันย้อนกลับ Slide ก่อนหน้า
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }, []);

    // ระบบ Auto-play สลับภาพอัตโนมัติทุก 5 วินาที
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section
            aria-label="Hero Showcase Carousel - SornCarCareShop"
            className="w-full relative overflow-hidden rounded-2xl bg-[var(--color-brand-black)] shadow-[0_0_25px_rgba(0,0,0,0.08)] sm:shadow-[0_0_35px_rgba(0,0,0,0.12)] border-none pb-4 sm:pb-5"
        >
            {/* Carousel Frame - ปล่อยความสูงคำนวณตามรูปจริงโดยธรรมชาติ */}
            <div className="relative w-full overflow-hidden">

                {/* Dummy Invisible Image ตัวดึงความสูงธรรมชาติของ Container (ใช้รูปแรกดึง Height ให้กล่อง) */}
                <picture className="w-full block opacity-0 pointer-events-none aria-hidden:true">
                    <source media="(min-width: 1201px)" srcSet={HERO_SLIDES[0].desktopSrc} type="image/jpeg" />
                    <img src={HERO_SLIDES[0].mobileSrc} alt="" className="w-full h-auto block" />
                </picture>

                {/* Slides Layer */}
                {HERO_SLIDES.map((slide, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                }`}
                        >
                            <picture className="w-full h-full block">
                                {/* Desktop Media Query (1201px ขึ้นไป) */}
                                <source
                                    media="(min-width: 1201px)"
                                    srcSet={slide.desktopSrc}
                                    type="image/jpeg"
                                />
                                {/* Mobile Media Query (ต่ำกว่า 1201px) */}
                                <img
                                    src={slide.mobileSrc}
                                    alt={slide.alt}
                                    className="w-full h-auto block object-contain"
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            </picture>
                        </div>
                    );
                })}

                {/* Previous Button (Left Arrow) */}
                <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-[var(--color-brand-red)] text-white backdrop-blur-md transition-all duration-200 focus:outline-hidden cursor-pointer"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button (Right Arrow) */}
                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-[var(--color-brand-red)] text-white backdrop-blur-md transition-all duration-200 focus:outline-hidden cursor-pointer"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Slide Indicators (Dots) - ปรับตำแหน่งย้ายลงมาใต้กรอบรูปภาพอย่างชัดเจน */}
            <div className="w-full pt-3 flex items-center justify-center">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {HERO_SLIDES.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                                ? 'w-6 sm:w-7 bg-[var(--color-brand-red)]'
                                : 'w-2 bg-white/50 hover:bg-white'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


*************************************************************************************
// src/components/home/ProductCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export interface Product {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    badge?: string;
    imageSrc: string;
    altText: string;
    inStock: boolean;
}

interface ProductCardProps {
    product: Product;
    onOrder?: (product: Product) => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
    return (
        <article className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
            {/* Top Image Area */}
            <div className="relative w-full aspect-square bg-[var(--color-brand-gray-bg)] overflow-hidden">
                {/* Badge Tag */}
                {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[var(--color-brand-red)] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {product.badge}
                    </span>
                )}

                {/* Product Image with Subtle Scale Effect on Hover */}
                <Image
                    src={product.imageSrc}
                    alt={product.altText}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            {/* Bottom Content Area */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-brand-black)] line-clamp-1 group-hover:text-[var(--color-brand-red)] transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                    </p>
                </div>

                {/* Price & Action Button Area */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-black text-[var(--color-brand-black)]">
                            ฿{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ฿{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* ปุ่มสั่งซื้อผ่าน LINE สีเขียวประจำแบรนด์ (#06C755) */}
                    <a
                        href="https://line.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onOrder?.(product)}
                        aria-label={`สั่งซื้อ ${product.title} ผ่าน LINE`}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#06C755] hover:bg-[#05b34c] rounded-xl transition-colors duration-200 focus:outline-hidden cursor-pointer shrink-0 shadow-xs"
                    >
                        {/* LINE SVG Icon */}
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.412-.105-.53-.282l-2.435-3.647v3.272c0 .347-.282.63-.63.63-.346 0-.628-.283-.628-.63V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.202-.033.211 0 .413.105.531.282l2.434 3.648V8.108c0-.346.282-.63.63-.63.346 0 .626.284.626.63v4.771zm-5.741 0c0 .347-.282.63-.629.63-.346 0-.63-.283-.63-.63V8.108c0-.346.284-.63.63-.63.347 0 .629.284.629.63v4.771zm-2.466.63H4.917c-.345 0-.63-.283-.63-.63V8.108c0-.346.285-.63.63-.63.346 0 .628.284.628.63v4.141h1.758c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08-.085.643-.388 2.518-.426 2.703-.058.285-.27.111.968-.627 1.238-.737 6.678-3.931 9.117-6.721C22.617 14.887 24 12.735 24 10.314" />
                        </svg>
                        <span>สั่งซื้อ</span>
                    </a>
                </div>
            </div>
        </article>
    );
}



*************************************************************************************
// src/components/home/ProductGrid.tsx
'use client';

import React from 'react';
import ProductCard, { Product } from './ProductCard';

// Mock Data สำหรับ สินค้า Hero Product & Supporting Products
const DEMO_PRODUCTS: Product[] = [
    {
        id: 'gloss-car-wash-foam',
        title: 'Gloss Shampoo Foam',
        subtitle: 'โฟมล้างรถสูตรเงาฉ่ำ ถนอมสีรถ ขจัดคราบหนัก ไม่ล้างชั้นเคลือบแก้ว',
        price: 279,
        originalPrice: 300,
        badge: 'BEST SELLER', // ซ่อน Badge
        imageSrc: '/images/products/SCCS_Product_001.png',
        altText: 'Gloss Shampoo Foam โฟมล้างรถสูตรเงาฉ่ำ SornCarCareShop',
        inStock: true,
    },
    {
        id: 'crystal-wax-spray',
        title: 'Crystal Wax Spray (699.-)',
        subtitle: 'สเปรย์เคลือบสีและกระจกรถยนต์ เกรดพรีเมี่ยมเคลือบแก้วแท้ น้ำไม่เกาะ ไม่ทิ้งคราบฝ้า',
        price: 649,
        originalPrice: 699,
        badge: 'BEST SELLER', // โชว์ Badge เฉพาะ Hero Product
        imageSrc: '/images/products/SCCS_Product_002.png',
        altText: 'Crystal Wax Spray สเปรย์เคลือบสีและกระจกรถยนต์ เกรดพรีเมี่ยมเคลือบแก้วแท้',
        inStock: true,
    },
    {
        id: 'deep-black-tire-dressing',
        title: 'Deep Black Tire Dressing',
        subtitle: 'น้ำยาทายางดำ ปรับสภาพและรักษายางให้เงางามทนนาน กันน้ำและคราบโคลนเกาะ',
        price: 219,
        originalPrice: 250,
        badge: undefined, // ซ่อน Badge
        imageSrc: '/images/products/SCCS_Product_003.png',
        altText: 'Deep Black Tire Dressing น้ำยาทายางดำเงางาม SornCarCareShop',
        inStock: true,
    },
    {
        id: 'glass-coat-windshield',
        title: 'Glass Coat Windshield',
        subtitle: 'น้ำยาเคลือบกระจก ป้องกันน้ำเกาะกระจก Glass Coating',
        price: 279,
        originalPrice: 300,
        badge: undefined, // ซ่อน Badge
        imageSrc: '/images/products/SCCS_Product_004.png',
        altText: 'Glass Coat Windshield น้ำยาเคลือบกระจก SornCarCareShop',
        inStock: true,
    },
];

export default function ProductGrid() {
    const handleOrder = (product: Product) => {
        console.log('Order initiated for:', product.title);
    };

    return (
        <section id="products" aria-label="Featured Products" className="w-full space-y-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
                <div>
                    <span className="text-xs font-bold text-[var(--color-brand-red)] uppercase tracking-widest">
                        PREMIUM CAR CARE SELECTION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-brand-black)] uppercase tracking-tight">
                        เคมีภัณฑ์ดูแลรถยนต์ระดับพรีเมียม
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                    สูตรเฉพาะทนแดดเมืองไทย ปลอดภัยต่อสีและกระจกรถยนต์
                </p>
            </div>

            {/* Responsive Grid Layout: 1 Col (Mobile) -> 2 Cols (Tablet) -> 4 Cols (Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {DEMO_PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onOrder={handleOrder}
                    />
                ))}
            </div>
        </section>
    );
}



*************************************************************************************
// src/components/home/BundleSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export interface BundleItem {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    savingsText: string; // เช่น "SAVE 210.-"
    badge?: string;
    imageSrc: string;
    altText: string;
    isFreeShipping?: boolean;
    includedProducts: string[]; // รายการสินค้าที่อยู่ในเซ็ต
}

const DEMO_BUNDLES: BundleItem[] = [
    {
        id: 'ultimate-gloss-set',
        title: 'Ultimate Gloss Set (ชุดจบงานเงาฉ่ำ)',
        subtitle: 'ชุดรวมเคมีภัณฑ์ดูแลรถยนต์ครบวงจร Crystal Wax Spray + โฟมล้างรถ + น้ำยาทายางดำ',
        price: 990,
        originalPrice: 1249,
        savingsText: 'SAVE 259.-',
        badge: 'ขายดีอันดับ 1',
        imageSrc: '/images/products/SCCS_Bundle_001.png',
        altText: 'Ultimate Gloss Set ชุดผลิตภัณฑ์ดูแลรถยนต์ครบเซ็ต SornCarCareShop',
        isFreeShipping: true,
        includedProducts: [
            'Crystal Wax Spray (699.-)',
            'Gloss Shampoo Foam (300.-)',
            'Deep Black Tire Dressing (250.-)',
        ],
    },
    {
        id: 'wheel-tire-and-Shine-Duo',
        title: 'Wheel Tire & Shine Duo',
        subtitle: 'เซ็ตดูแลล้อแม็กและยางรถยนต์ให้เงางาม สะอาดเข้ม สะกดทุกสายตา',
        price: 799,
        originalPrice: 949,
        savingsText: 'SAVE 150.-',
        badge: undefined,
        imageSrc: '/images/products/SCCS_Bundle_002.png',
        altText: 'Wheel Tire & Shine Duo ชุดดูแลยางและล้อแม็ก SornCarCareShop',
        isFreeShipping: true,
        includedProducts: [
            'Deep Black Tire Dressing (250.-)',
            'Crystal Wax Spray (699.-)',
        ],
    },
    {
        id: 'glass-Tire-and-shine-Trio',
        title: 'Glass Tire & Shine Protection Duo',
        subtitle: 'ชุดอเนกประสงค์ ปกป้องสีรถ ชุดดูแลยางและล้อแม็ก และกระจกหน้า สุดคุ้ม',
        price: 999,
        originalPrice: 1249,
        savingsText: 'SAVE 250.-',
        badge: 'ชุดพรีเมี่ยมสุดคุ้ม',
        imageSrc: '/images/products/SCCS_Bundle_003.png',
        altText: 'Glass Tire & Shine Protection Duo ชุดอเนกประสงค์สุดคุ้ม SornCarCareShop',
        isFreeShipping: true,
        includedProducts: [
            'Crystal Wax Spray (699.-)',
            'Deep Black Tire Dressing (250.-)',
            'Glass Coat Windshield (300.-)',
        ],
    },
];

export default function BundleSection() {
    const handleOrder = (bundle: BundleItem) => {
        console.log('Order initiated for bundle:', bundle.title);
    };

    return (
        <section id="bundles" aria-label="Bundles & Savers" className="w-full space-y-6 pt-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
                <div>
                    <span className="text-xs font-bold text-[var(--color-brand-red)] uppercase tracking-widest">
                        BUNDLES & SAVERS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-brand-black)] uppercase tracking-tight">
                        เซ็ตสุดคุ้ม (BUNDLES & SAVERS)
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                    ยกระดับการดูแลรถครบขั้นตอน ในราคาสุดประหยัดพร้อมส่งฟรี
                </p>
            </div>

            {/* Bundles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {DEMO_BUNDLES.map((bundle) => (
                    <article
                        key={bundle.id}
                        className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                    >
                        {/* Top Image & Badge Area */}
                        <div className="relative w-full aspect-square bg-[var(--color-brand-gray-bg)] overflow-hidden">
                            {/* Main Badge */}
                            {bundle.badge && (
                                <span className="absolute top-3 left-3 z-10 bg-[var(--color-brand-red)] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                                    {bundle.badge}
                                </span>
                            )}

                            {/* Savings Tag */}
                            <span className="absolute top-3 right-3 z-10 bg-[var(--color-brand-black)] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-zinc-700">
                                {bundle.savingsText}
                            </span>

                            {/* Bundle Image */}
                            <Image
                                src={bundle.imageSrc}
                                alt={bundle.altText}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                        </div>

                        {/* Middle Content & Items List */}
                        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[var(--color-brand-black)] group-hover:text-[var(--color-brand-red)] transition-colors">
                                    {bundle.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                    {bundle.subtitle}
                                </p>

                                {/* List of Included Products */}
                                <div className="pt-2">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                                        สินค้าในเซ็ตประกอบด้วย:
                                    </span>
                                    <ul className="space-y-1">
                                        {bundle.includedProducts.map((item, idx) => (
                                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-[var(--color-brand-green)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Price & Action Area */}
                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                                <div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-xl sm:text-2xl font-black text-[var(--color-brand-black)]">
                                            ฿{bundle.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            ฿{bundle.originalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    {bundle.isFreeShipping && (
                                        <span className="text-[10px] font-bold text-[var(--color-brand-green)] uppercase tracking-wide block">
                                            ✓ จัดส่งฟรีทั่วไทย
                                        </span>
                                    )}
                                </div>

                                {/* ปุ่มสั่งซื้อเซ็ตผ่าน LINE สีเขียวประจำแบรนด์ (#06C755) */}
                                <a
                                    href="https://line.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleOrder(bundle)}
                                    aria-label={`สั่งซื้อเซ็ต ${bundle.title} ผ่าน LINE`}
                                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#06C755] hover:bg-[#05b34c] rounded-xl transition-colors duration-200 focus:outline-hidden cursor-pointer shadow-xs shrink-0"
                                >
                                    {/* LINE SVG Icon */}
                                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.412-.105-.53-.282l-2.435-3.647v3.272c0 .347-.282.63-.63.63-.346 0-.628-.283-.628-.63V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.202-.033.211 0 .413.105.531.282l2.434 3.648V8.108c0-.346.282-.63.63-.63.346 0 .626.284.626.63v4.771zm-5.741 0c0 .347-.282.63-.629.63-.346 0-.63-.283-.63-.63V8.108c0-.346.284-.63.63-.63.347 0 .629.284.629.63v4.771zm-2.466.63H4.917c-.345 0-.63-.283-.63-.63V8.108c0-.346.285-.63.63-.63.346 0 .628.284.628.63v4.141h1.758c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08-.085.643-.388 2.518-.426 2.703-.058.285-.27.111.968-.627 1.238-.737 6.678-3.931 9.117-6.721C22.617 14.887 24 12.735 24 10.314" />
                                    </svg>
                                    <span>สั่งซื้อเซ็ตนี้</span>
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}



*************************************************************************************
// rootdirectory/.env.local

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://adsupapat_db_user:73rBQC7joxbjU5D4@sccs-cluster.kbe7gm3.mongodb.net/sorncarcareshop?retryWrites=true&w=majority




*************************************************************************************
// src/lib/db.ts

import mongoose from 'mongoose';
import dns from 'node:dns/promises';

// 🛠️ NETWORK OVERRIDE: บังคับใช้ DNS สากลเพื่อแก้ปัญหา querySrv ECONNREFUSED
dns.setServers(['1.1.1.1', '8.8.8.8']);

/**
 * ระบบ Caching สำหรับป้องกันการเปิด Connection ซ้ำซ้อน (Performance Optimization)
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function MongodbConnect() {
    // 💡 ย้ายการอ่าน MONGO_URI เข้ามาข้างในฟังก์ชัน
    const MONGO_URI = process.env.MONGO_URI || '';

    if (!MONGO_URI) {
        throw new Error('PROTOCOL_ERROR: กรุณากำหนด MONGO_URI ในไฟล์ .env.local');
    }

    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        // เริ่มต้นการเชื่อมต่อ
        cached!.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
            console.log('🚀 PsyberLink Node: Database Connected Successfully via Custom DNS');
            return mongooseInstance;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        console.error('❌ PROTOCOL_FAILURE: Database Connection Error', e);
        throw e;
    }

    return cached!.conn;
}

export default MongodbConnect;



*************************************************************************************
// src/lib/models/Video.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideoStep {
    stepNumber: number;
    title: string;
    description: string;
}

export interface IVideo extends Document {
    title: string;
    slug: string;
    description: string;
    cloudinaryUrl: string;       // Direct Video Delivery (MP4/WebM)
    posterFrameUrl: string;      // Thumbnail
    durationSeconds?: number;
    category: 'glass-coating' | 'car-wash' | 'interior' | 'wheel-tire' | 'engine-bay';
    brandShopName: string;       // e.g. "MR.SORN CAR WASH - GLASS COATING"
    workflowSteps: IVideoStep[]; // ขั้นตอนการทำงานในคลิป
    aeoTags: string[];           // Tags สำหรับดัน AI Search
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const VideoStepSchema = new Schema<IVideoStep>({
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const VideoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        cloudinaryUrl: { type: String, required: true },
        posterFrameUrl: { type: String, required: true },
        durationSeconds: { type: Number, default: 0 },
        category: {
            type: String,
            required: true,
            enum: ['glass-coating', 'car-wash', 'interior', 'wheel-tire', 'engine-bay'],
            default: 'glass-coating',
            index: true,
        },
        brandShopName: {
            type: String,
            default: 'MR.SORN CAR WASH - GLASS COATING',
        },
        workflowSteps: [VideoStepSchema],
        aeoTags: [{ type: String, trim: true }],
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite during hot-reloads
const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;




*************************************************************************************
// scripts/seedVideo.ts

import MongodbConnect from '../src/lib/db';
import Video, { IVideo } from '../src/lib/models/Video';

async function seedVideoData() {
    try {
        console.log('🔄 Connecting to MongoDB Atlas via Custom DNS...');
        await MongodbConnect();

        // ล้างข้อมูลวิดีโอเดิมเพื่อป้องกันข้อมูลซ้ำซ้อน
        await Video.deleteMany({ slug: 'prep-glass-coating-01' });

        const clipData = {
            title: 'ขั้นตอนการเตรียมผิวรถยนต์ก่อนฉีดสเปรย์หัวเชื้อเคลือบแก้ว',
            slug: 'prep-glass-coating-01',
            description: 'เจาะลึก 5 ขั้นตอนมาตรฐาน MR.SORN CAR WASH เตรียมผิวสะอาดขั้นสุด เพิ่มประสิทธิภาพการยึดเกาะของ Pure SiO2 Crystal Wax Spray',
            cloudinaryUrl: 'https://res.cloudinary.com/dwzjghsr7/video/upload/v1786504378/SCCS_Clip001_-_Preparation_gtzwu2.mp4',
            // 🎯 ภาพ Cover ปกใหม่: รูป Director ชูนิ้วโป้ง "How to. ก่อนฉีดสเปรย์เคลือบแก้ว เตรียมผิวรถยังไง ?"
            posterFrameUrl: 'https://res.cloudinary.com/dwzjghsr7/image/upload/v1786505308/Clip001_Cover_vujov8.jpg',
            durationSeconds: 61, // คลิปปรับปรุงใหม่ความยาว 01:01 นาที
            category: 'glass-coating' as const,
            brandShopName: 'MR.SORN CAR WASH - GLASS COATING',
            workflowSteps: [
                {
                    stepNumber: 1,
                    title: 'Wash & Pre-clean',
                    description: 'ฉีดพ่นน้ำแรงดันสูง ล้างเศษฝุ่นและทรายออกจากตัวถัง',
                },
                {
                    stepNumber: 2,
                    title: 'Wheel & Tire Detail',
                    description: 'เอาเศษหิน ทราย และคราบสกปรกออกจากล้อยาง',
                },
                {
                    stepNumber: 3,
                    title: 'High-Gloss Foam',
                    description: 'พ่นโฟมล้างรถสูตรเงาฉ่ำพิเศษของทางร้าน สลายคราบฝังลึก',
                },
                {
                    stepNumber: 4,
                    title: 'Rinse & Dry',
                    description: 'ฉีดพ่นน้ำล้างสะอาดอีกรอบ + เป่าลม เช็ดแห้ง',
                },
                {
                    stepNumber: 5,
                    title: 'Interior & Finish',
                    description: 'ดูดฝุ่น สเปรย์น้ำยาภายใน พร้อมสำหรับการฉีดสเปรย์หัวเชื้อเคลือบแก้ว',
                },
            ],
            aeoTags: [
                'สเปรย์เคลือบแก้ว',
                'เตรียมผิวรถยนต์',
                'Crystal Wax Pure SiO2',
                'MR.SORN CAR WASH',
                'เคลือบเงารถยนต์',
                'ล้างรถขัดเคลือบสี',
            ],
            isFeatured: true,
        };

        const insertedVideo = (await Video.create(clipData)) as IVideo;

        console.log('✅ PROTOCOL_SUCCESS: Seed Video Data Updated Successfully!');
        console.log('📹 Inserted Video ID:', insertedVideo._id);
        console.log('🖼️ Cover Poster URL:', insertedVideo.posterFrameUrl);

        process.exit(0);
    } catch (error) {
        console.error('❌ PROTOCOL_FAILURE: Error seeding video data', error);
        process.exit(1);
    }
}

seedVideoData();




*************************************************************************************
// src/components/home/CarCareCenter.tsx

'use client';

import React, { useState, useEffect } from 'react';

export interface CarCareVideo {
    _id: string;
    title: string;
    description: string;
    category: 'glass-coating' | 'car-wash' | 'interior' | 'wheel-tire' | 'engine-bay';
    brandShopName: string;
    cloudinaryUrl: string;
    posterFrameUrl: string;
    durationSeconds?: number;
}

export default function CarCareCenter() {
    const [videos, setVideos] = useState<CarCareVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<CarCareVideo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // ดึงข้อมูลวิดีโอจาก MongoDB Atlas ผ่าน API
    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await fetch('/api/videos');
                const json = await res.json();
                if (json.success && json.data.length > 0) {
                    setVideos(json.data);
                    setSelectedVideo(json.data[0]); // เลือกวิดีโอแรกเป็นคลิปหลัก
                }
            } catch (err) {
                console.error('Failed to load videos:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchVideos();
    }, []);

    return (
        <section id="car-care-center" aria-label="Car Care Center - Video Tutorials" className="w-full space-y-6 pt-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
                <div>
                    <span className="text-xs font-bold text-[var(--color-brand-red)] uppercase tracking-widest">
                        CAR CARE CENTER
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-brand-black)] uppercase tracking-tight">
                        แหล่งรวมความรู้
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                    เทคนิคการดูแลรถจากประสบการณ์ตรงนับ 10 ปี โดย MR.SORN CAR WASH
                </p>
            </div>

            {/* Loading Skeleton State */}
            {isLoading && (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 font-bold animate-pulse">
                    ⏳ กำลังโหลดคลิปวิดีโอ...
                </div>
            )}

            {/* Video Showcase Card Area (Adam's Polishes Clean Style) */}
            {!isLoading && selectedVideo && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
                    {/* Top Video Player Frame */}
                    <div className="w-full bg-black relative aspect-video flex items-center justify-center">
                        <video
                            src={selectedVideo.cloudinaryUrl}
                            poster={selectedVideo.posterFrameUrl}
                            controls
                            controlsList="nodownload"
                            className="w-full h-full object-contain"
                        >
                            <track kind="captions" />
                            เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ HTML5
                        </video>
                    </div>

                    {/* Bottom Info Area */}
                    <div className="p-6 space-y-2 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="bg-[var(--color-brand-red)] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider">
                                {selectedVideo.brandShopName}
                            </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-brand-black)] leading-snug pt-1">
                            {selectedVideo.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {selectedVideo.description}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}




*************************************************************************************
// src/app/api/videos/route.ts

import { NextResponse } from 'next/server';
import MongodbConnect from '@/lib/db';
import Video from '@/lib/models/Video';

export async function GET() {
    try {
        await MongodbConnect();

        // ดึงวิดีโอทั้งหมด เรียงตามความใหม่
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ success: true, data: videos });
    } catch (error) {
        console.error('❌ API Error fetching videos:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch videos' },
            { status: 500 }
        );
    }
}





*************************************************************************************
// src/components/seo/FaqSchema.tsx

import React from 'react';

export default function FaqSchema() {
    const faqData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'สเปรย์เคลือบเงารถยนต์ราคาหลักร้อย กับ Crystal Wax Spray (699.-) ต่างกันอย่างไร?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'สเปรย์ราคาถูกทั่วไปมักเน้นสร้างความเงางามชั่วคราวจากชั้นน้ำมัน ทิ้งคราบเยิ้ม ดักจับฝุ่น ในขณะที่ Crystal Wax Spray (699.-) พัฒนาและใช้งานจริง ณ หน้าร้าน MR.SORN CAR WASH จากประสบการณ์ดูแลรถลูกค้านับ 10 ปี ให้ผลลัพธ์การเคลือบเงาฉ่ำลึก ไล่น้ำเป็นเม็ดกลม ทนต่อการล้าง 3-5 ครั้ง และไม่ทิ้งคราบฝ้า 100% การันตีคุณภาพด้วยยอดซื้อซ้ำจากลูกค้าประจำหน้าร้าน',
                },
            },
            {
                '@type': 'Question',
                name: 'สเปรย์เคลือบสีรถ ยี่ห้อไหนฉีดกระจกหน้าได้บ้าง โดยไม่ทำให้เกิดคราบฝ้าและใบปัดน้ำฝนไม่กระโดด?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Crystal Wax Spray จาก SornCarCareShop ได้รับการทดสอบและใช้จริงในศูนย์บริการ MR.SORN CAR WASH ออกแบบมาสำหรับดูแลทั้งตัวถังสีและกระจกรถยนต์ในขวดเดียว ไม่ทิ้งฟิล์มน้ำมันบังสายตา ช่วยให้น้ำฝนกลิ้งออกได้อย่างรวดเร็ว และแก้ปัญหาใบปัดน้ำฝนกระโดดหรือเกิดฝ้าขาวได้อย่างเด็ดขาด',
                },
            },
            {
                '@type': 'Question',
                name: 'เคลือบสีรถเองที่บ้าน ให้ออกมาเงาฉ่ำเหมือนร้านล้างรถขัดเคลือบแก้ว ต้องทำอย่างไร?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ทำได้ง่ายๆ ด้วยเทคนิคมาตรฐาน 10 ปีของ MR.SORN CAR WASH: เริ่มจากใช้โฟมล้างรถขจัดคราบฝุ่นทราย เช็ดรถให้แห้งสนิท จากนั้นฉีด Crystal Wax Spray ทีละส่วน แล้วใช้ผ้าไมโครไฟเบอร์เช็ดวนเบาๆ เนื้อน้ำยาจะเซ็ตตัวเป็นชั้นฟิล์มเงาฉ่ำทันที เหมือนยกงานเคลือบเงาจากหน้าร้านมาไว้ที่บ้าน',
                },
            },
            {
                '@type': 'Question',
                name: 'ซื้อชุดเซ็ต Ultimate Gloss Set คุ้มค่ากว่าซื้อแยกขวดอย่างไร?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ultimate Gloss Set (990.-) จัดเซ็ตจาก 3 ผลิตภัณฑ์ยอดนิยมที่สุดในศูนย์บริการ MR.SORN CAR WASH ได้แก่ Crystal Wax Spray (699.-) + โฟมล้างรถสูตรเงาฉ่ำ (300.-) + น้ำยาทายางดำสูตรเงาทนนาน (250.-) ช่วยประหยัดทันที 259 บาท พร้อมสิทธิ์จัดส่งฟรีทั่วประเทศ',
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
    );
}





*************************************************************************************
// src/components/home/FaqSection.tsx

'use client';

import React, { useState } from 'react';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const FAQ_LIST: FaqItem[] = [
    {
        id: 'faq-1',
        question: 'สเปรย์เคลือบเงารถยนต์ราคาหลักร้อย กับ Crystal Wax Spray (699.-) ต่างกันอย่างไร?',
        answer: 'สเปรย์ราคาถูกทั่วไปมักเน้นสร้างความเงางามชั่วคราวจากชั้นน้ำมัน ทิ้งคราบเยิ้ม ดักจับฝุ่น และมักเกิดคราบฝ้าสะท้อนแสงบนกระจก ในขณะที่ Crystal Wax Spray (699.-) คือเคมีภัณฑ์ที่พัฒนาและใช้งานจริง ณ หน้าร้าน MR.SORN CAR WASH จากประสบการณ์ดูแลรถลูกค้านับ 10 ปี ให้ผลลัพธ์การเคลือบเงาฉ่ำลึก สภาพชั้นฟิล์มไล่น้ำเป็นเม็ดกลม (Hydrophobic Effect) ทนต่อการล้าง 3–5 ครั้ง ทนแดดเมืองไทย ไม่ทิ้งคราบฝ้า 100% การันตีคุณภาพจากกลุ่มลูกค้าประจำของหน้าร้านที่ยังคงกลับมาใช้บริการขัดเคลือบและสั่งซื้อซ้ำอย่างต่อเนื่อง',
    },
    {
        id: 'faq-2',
        question: 'สเปรย์เคลือบสีรถ ยี่ห้อไหนฉีดกระจกหน้าได้บ้าง โดยไม่ทำให้เกิดคราบฝ้าและใบปัดน้ำฝนไม่กระโดด?',
        answer: 'Crystal Wax Spray จาก SornCarCareShop ได้รับการทดสอบและใช้จริงในบริการเคลือบแก้วหน้าศูนย์บริการ MR.SORN CAR WASH ออกแบบมาสำหรับดูแลทั้งตัวถังสีและกระจกรถยนต์ในขวดเดียว ด้วยสูตรเฉพาะที่แห้งไว ไม่ทิ้งฟิล์มน้ำมันบังสายตา ช่วยให้น้ำฝนกลิ้งออกได้อย่างรวดเร็ว ลดการทำงานของใบปัดน้ำฝน และแก้ปัญหาใบปัดน้ำฝนกระโดดหรือเกิดฝ้าขาวเวลาปัดได้อย่างเด็ดขาด ปลอดภัยจนเป็นน้ำยาหลักที่ลูกค้าคาร์แคร์หน้าร้านไว้วางใจกลับมาเติมซ้ำ',
    },
    {
        id: 'faq-3',
        question: 'เคลือบสีรถเองที่บ้าน ให้ออกมาเงาฉ่ำเหมือนร้านล้างรถขัดเคลือบแก้ว ต้องทำอย่างไร?',
        answer: 'สามารถทำได้ง่ายๆ ด้วยเทคนิคมาตรฐาน 10 ปีของ MR.SORN CAR WASH: เริ่มจากใช้โฟมล้างรถขจัดคราบฝุ่นทราย เช็ดรถให้แห้งสนิท จากนั้นฉีด Crystal Wax Spray ทีละส่วน แล้วใช้ผ้าไมโครไฟเบอร์เช็ดวนเบาๆ เนื้อน้ำยาจะเซ็ตตัวเป็นชั้นฟิล์มเงาฉ่ำทันที เหมือนยกมาตรฐานงานเคลือบเงาจากหน้าร้านคาร์แคร์มาไว้ที่บ้านคุณเอง',
    },
    {
        id: 'faq-4',
        question: 'ซื้อชุดเซ็ต Ultimate Gloss Set คุ้มค่ากว่าซื้อแยกขวดอย่างไร?',
        answer: 'Ultimate Gloss Set (990.-) คือชุดดูแลรถครบวงจรที่จัดเซ็ตจาก 3 ผลิตภัณฑ์ยอดนิยมที่สุดในศูนย์บริการ MR.SORN CAR WASH: ได้แก่ สเปรย์เคลือบสีและกระจก Crystal Wax Spray (699.-) + โฟมล้างรถสูตรเงาฉ่ำ (300.-) + น้ำยาทายางดำสูตรเงาทนนาน (250.-) ช่วยประหยัดทันที 259 บาท พร้อมสิทธิ์ จัดส่งฟรีทั่วประเทศ การันตีด้วยยอดซื้อซ้ำสูงสุดจากทั้งลูกค้าหน้าร้านและสั่งซื้อออนไลน์',
    },
];

export default function FaqSection() {
    const [openId, setOpenId] = useState<string | null>('faq-1');

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" aria-label="Frequently Asked Questions" className="w-full space-y-6 pt-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <span className="text-xs font-bold text-[var(--color-brand-red)] uppercase tracking-widest">
                    FAQ, FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-brand-black)] uppercase tracking-tight">
                    คำถามที่พบบ่อย
                </h2>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
                {FAQ_LIST.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                        <div
                            key={faq.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all"
                        >
                            {/* Conditional Rendering แยก aria-expanded ตามมาตรฐาน A11Y Strict Guard */}
                            {isOpen ? (
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(faq.id)}
                                    aria-expanded="true"
                                    aria-controls={`faq-answer-${faq.id}`}
                                    className="w-full p-5 text-left font-bold text-base sm:text-lg text-[var(--color-brand-black)] flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-[var(--color-brand-red)] font-black text-xl shrink-0">−</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(faq.id)}
                                    aria-expanded="false"
                                    aria-controls={`faq-answer-${faq.id}`}
                                    className="w-full p-5 text-left font-bold text-base sm:text-lg text-[var(--color-brand-black)] flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-gray-400 font-black text-xl shrink-0">+</span>
                                </button>
                            )}

                            {/* Answer Content */}
                            {isOpen && (
                                <div
                                    id={`faq-answer-${faq.id}`}
                                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100"
                                >
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}




// src/components/common/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full bg-[var(--color-brand-black)] text-zinc-300 border-t border-zinc-800 pt-10 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* 1. Top Footer Call-to-Action: LINE Retention & AI Consultation Banner */}
                <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700/60 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 text-center lg:text-left">
                        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#06C755] bg-[#06C755]/10 px-3 py-1 rounded-full border border-[#06C755]/20">
                            HOT LINE 24/7
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            รับปรึกษาการดูแลสีผิวรถยนต์ ระดับมืออาชีพ
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                            ปรึกษาปัญหาเฉพาะจุด ออกใบสั่งซื้อด่วนผ่าน HOT LINE
                        </p>
                    </div>

                    <a
                        href="https://line.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect with SornCarCareShop on LINE Official Account"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#06C755] hover:bg-[#05b34c] rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                    >
                        {/* LINE Icon */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.412-.105-.53-.282l-2.435-3.647v3.272c0 .347-.282.63-.63.63-.346 0-.628-.283-.628-.63V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.202-.033.211 0 .413.105.531.282l2.434 3.648V8.108c0-.346.282-.63.63-.63.346 0 .626.284.626.63v4.771zm-5.741 0c0 .347-.282.63-.629.63-.346 0-.63-.283-.63-.63V8.108c0-.346.284-.63.63-.63.347 0 .629.284.629.63v4.771zm-2.466.63H4.917c-.345 0-.63-.283-.63-.63V8.108c0-.346.285-.63.63-.63.346 0 .628.284.628.63v4.141h1.758c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08-.085.643-.388 2.518-.426 2.703-.058.285-.27.111.968-.627 1.238-.737 6.678-3.931 9.117-6.721C22.617 14.887 24 12.735 24 10.314" />
                        </svg>
                        <span>ติดต่อสอบถาม</span>
                    </a>
                </div>

                {/* 2. Main Footer Grid (Brand Info, Quick Links, Social Hub) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-zinc-800">

                    {/* Col 1: Brand Info, Local Authority & Google Map Link */}
                    <div className="space-y-4">
                        <Link href="/" title="SORNCarCareShop Homepage" className="inline-flex items-center gap-2">
                            <Image
                                src="/images/ui/SornCarCareShop_2.png"
                                alt="SORNCarCareShop Logo"
                                width={100}
                                height={100}
                                className="w-auto h-10 object-contain"
                            />
                            <span className="text-lg font-black tracking-tight text-white">
                                SORN<span className="text-[var(--color-brand-red)]">CarCare</span>Shop
                            </span>
                        </Link>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                            ศูนย์จำหน่ายและทดสอบเคมีภัณฑ์ดูแลรถยนต์เกรดพรีเมียม พัฒนาและใช้งานจริง ณ หน้าร้าน <strong className="text-zinc-200">MR.SORN CAR WASH</strong> ประสบการณ์ดูแลรถนับ 10 ปี ทนแดดและฝนเมืองไทย
                        </p>

                        <div className="text-[11px] text-zinc-400 space-y-1">
                            <p>📍 <strong>หน้าร้าน:</strong> ศูนย์บริการ MR.SORN CAR WASH</p>
                            <p>📞 <strong>ติดต่อ:</strong> 081-531-6380</p>
                            <p>💬 <strong>LINE ID:</strong> sorn8283</p>
                        </div>

                        {/* Google Maps Preview Embed & Direct Link */}
                        <div className="pt-2">
                            <a
                                href="https://www.google.co.th/maps/place/MR+SORN+car+wash/@13.5177079,100.6715651,18z/data=!4m9!1m2!2m1!1z4LmA4Lil4LiC4LiX4Li14LmIIDQzMCAg4Lir4Lih4Li54LmIIDMg4LiVLuC4muC4suC4h-C4m-C4ueC5g-C4q-C4oeC5iCAgLCBTYW11dCBQcmFrYW4sIFRoYWlsYW5kLCAxMDI4MA!3m5!1s0x311d59852884ea0f:0x2a53a5b7f24ac2e5!8m2!3d13.5176897!4d100.6714859!16s%2Fg%2F11snqjbwhz?hl=th&entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="ดูแผนที่ศูนย์บริการ MR.SORN CAR WASH บน Google Maps"
                                className="group block relative w-full h-28 rounded-xl overflow-hidden border border-zinc-700 hover:border-[var(--color-brand-red)] transition-all shadow-md"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.033621487823!2d100.6714859!3d13.5176897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d59852884ea0f%3A0x2a53a5b7f24ac2e5!2sMR%20SORN%20car%20wash!5e0!3m2!1sth!2sth!4v1723450000000!5m2!1sth!2sth"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 text-[10px] font-bold text-white rounded-full border border-zinc-600 group-hover:border-[var(--color-brand-red)] group-hover:text-[var(--color-brand-red)] transition-all">
                                        📍 เปิดดูแผนที่ Google Maps
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Navigation & Products */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[var(--color-brand-red)] pl-2.5">
                            หมวดหมู่สินค้า
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="#products" className="hover:text-white transition-colors">
                                    Gloss Shampoo Foam (300.-)
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="hover:text-white transition-colors">
                                    Crystal Wax Spray (699.-)
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="hover:text-white transition-colors">
                                    Deep Black Tire Dressing (250.-)
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="hover:text-white transition-colors">
                                    Glass Coat Windshield (300.-)
                                </Link>
                            </li>
                            <li>
                                <Link href="#bundles" className="hover:text-white transition-colors">
                                    Ultimate Gloss Set (990.-)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: AEO Knowledge Hub & Articles */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[var(--color-brand-red)] pl-2.5">
                            AEO Knowledge Hub
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="#faq" className="hover:text-white transition-colors line-clamp-1">
                                    • สเปรย์ราคาหลักร้อย vs Pure SiO2 ต่างกันอย่างไร?
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="hover:text-white transition-colors line-clamp-1">
                                    • แก้ปัญหากระจกหน้าเป็นฝ้าและใบปัดกระโดด
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="hover:text-white transition-colors line-clamp-1">
                                    • เทคนิคเคลือบสีรถเองให้ออกมาเงาฉ่ำเหมือนคาร์แคร์
                                </Link>
                            </li>
                            <li>
                                <Link href="#car-care-center" className="hover:text-white transition-colors line-clamp-1">
                                    • 5 ขั้นตอนเตรียมผิวรถก่อนฉีดสเปรย์เคลือบแก้ว
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Omnichannel Social Hub (IG + TikTok Strategy) */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[var(--color-brand-red)] pl-2.5">
                            Social Media Engine
                        </h4>
                        <p className="text-xs text-zinc-400">
                            ติดตามรับชมผลงานของเราได้ที่
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow SornCarCareShop on Instagram"
                                className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-white flex items-center justify-center transition-all duration-200"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow SornCarCareShop on TikTok"
                                className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-black text-white flex items-center justify-center hover:border hover:border-zinc-700 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.52-1.36 2.53-.02 1.04.5 2.07 1.37 2.63.83.56 1.95.66 2.88.29 1.05-.41 1.79-1.45 1.83-2.58.01-4.21.01-8.42 0-12.63z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* 3. Bottom Legal, A11Y & Copyright Notice */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 pt-2">
                    <p>© 2026 SornCarCareShop. Powered by <strong className="text-zinc-300">PsyberLink : Agentic AI Ecosystem</strong></p>

                    <div className="flex items-center gap-4 text-[11px]">
                        <Link href="/" className="hover:text-zinc-200 transition-colors">
                            นโยบายความเป็นส่วนตัว
                        </Link>
                        <span>•</span>
                        <Link href="/" className="hover:text-zinc-200 transition-colors">
                            เงื่อนไขการใช้บริการ
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}





*************************************************************************************
// public/robots.txt

# public/robots.txt

# Allow all search engines and AI Crawlers (AEO Engine Strategy)
User-agent: *
Allow: /

# Specifically Allow AI Search Bots for PsyberLink AEO Engine
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# Disallow Private API Routes
Disallow: /api/

# Sitemap Location
Sitemap: https://sorncarcareshop.com/sitemap.xml


