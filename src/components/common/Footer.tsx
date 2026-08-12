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