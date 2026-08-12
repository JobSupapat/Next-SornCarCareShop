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