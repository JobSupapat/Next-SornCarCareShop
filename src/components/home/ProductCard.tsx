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