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