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