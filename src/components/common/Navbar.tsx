// src/components/common/Navbar.tsx
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