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