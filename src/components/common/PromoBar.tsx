// src/components/common/PromoBar.tsx
import React from 'react';

export default function PromoBar() {
    // โครงสร้างข้อความ 2 ประโยคหลัก
    const promoContent = (
        <div className="flex items-center gap-8 sm:gap-12 px-4 whitespace-nowrap">
            {/* ประโยคที่ 1: โปรโมชันส่งฟรี */}
            <div className="flex items-center gap-2">
                <span className="bg-white text-[var(--color-brand-red)] text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                    PROMO
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                    ส่งฟรีทั่วไทย! เมื่อสั่งซื้อ <strong>Crystal Wax Spray (699.-)</strong> หรือ ซื้อครบ 800.- ขึ้นไป
                </span>
            </div>

            {/* ตัวแบ่งประโยค */}
            <span className="text-white/40 text-xs sm:text-sm">•</span>

            {/* ประโยคที่ 2: PsyberLink Ecosystem Credit */}
            <div className="flex items-center gap-2">
                <span className="bg-black/30 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 border border-white/20">
                    ECOSYSTEM
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                    2026 SornCarCareShop. Powered by <strong>PsyberLink : Agentic AI Ecosystem</strong>
                </span>
            </div>

            {/* ตัวแบ่งท้ายประโยค */}
            <span className="text-white/40 text-xs sm:text-sm">•</span>
        </div>
    );

    return (
        <aside
            aria-label="Promotion Announcement"
            className="bg-[var(--color-brand-red)] text-white py-2 overflow-hidden relative z-50 shadow-xs select-none"
        >
            {/* Container แถบวิ่ง Marquee Loop 2 ชุดต่อกันเพื่อให้ภาพหมุนวนไร้รอยต่อ */}
            <div className="w-full overflow-hidden">
                <div className="animate-marquee flex items-center">
                    {promoContent}
                    {promoContent}
                </div>
            </div>
        </aside>
    );
}