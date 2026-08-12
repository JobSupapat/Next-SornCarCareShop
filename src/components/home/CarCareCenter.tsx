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