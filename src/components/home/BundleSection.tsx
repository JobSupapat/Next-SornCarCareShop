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