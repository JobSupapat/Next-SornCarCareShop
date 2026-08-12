// scripts/seedVideo.ts
import MongodbConnect from '../src/lib/db';
import Video, { IVideo } from '../src/lib/models/Video';

async function seedVideoData() {
    try {
        console.log('🔄 Connecting to MongoDB Atlas via Custom DNS...');
        await MongodbConnect();

        // ล้างข้อมูลวิดีโอเดิมเพื่อป้องกันข้อมูลซ้ำซ้อน
        await Video.deleteMany({ slug: 'prep-glass-coating-01' });

        const clipData = {
            title: 'ขั้นตอนการเตรียมผิวรถยนต์ก่อนฉีดสเปรย์หัวเชื้อเคลือบแก้ว',
            slug: 'prep-glass-coating-01',
            description: 'เจาะลึก 5 ขั้นตอนมาตรฐาน MR.SORN CAR WASH เตรียมผิวสะอาดขั้นสุด เพิ่มประสิทธิภาพการยึดเกาะของ Pure SiO2 Crystal Wax Spray',
            cloudinaryUrl: 'https://res.cloudinary.com/dwzjghsr7/video/upload/v1786504378/SCCS_Clip001_-_Preparation_gtzwu2.mp4',
            // 🎯 ภาพ Cover ปกใหม่: รูป Director ชูนิ้วโป้ง "How to. ก่อนฉีดสเปรย์เคลือบแก้ว เตรียมผิวรถยังไง ?"
            posterFrameUrl: 'https://res.cloudinary.com/dwzjghsr7/image/upload/v1786505308/Clip001_Cover_vujov8.jpg',
            durationSeconds: 61, // คลิปปรับปรุงใหม่ความยาว 01:01 นาที
            category: 'glass-coating' as const,
            brandShopName: 'MR.SORN CAR WASH - GLASS COATING',
            workflowSteps: [
                {
                    stepNumber: 1,
                    title: 'Wash & Pre-clean',
                    description: 'ฉีดพ่นน้ำแรงดันสูง ล้างเศษฝุ่นและทรายออกจากตัวถัง',
                },
                {
                    stepNumber: 2,
                    title: 'Wheel & Tire Detail',
                    description: 'เอาเศษหิน ทราย และคราบสกปรกออกจากล้อยาง',
                },
                {
                    stepNumber: 3,
                    title: 'High-Gloss Foam',
                    description: 'พ่นโฟมล้างรถสูตรเงาฉ่ำพิเศษของทางร้าน สลายคราบฝังลึก',
                },
                {
                    stepNumber: 4,
                    title: 'Rinse & Dry',
                    description: 'ฉีดพ่นน้ำล้างสะอาดอีกรอบ + เป่าลม เช็ดแห้ง',
                },
                {
                    stepNumber: 5,
                    title: 'Interior & Finish',
                    description: 'ดูดฝุ่น สเปรย์น้ำยาภายใน พร้อมสำหรับการฉีดสเปรย์หัวเชื้อเคลือบแก้ว',
                },
            ],
            aeoTags: [
                'สเปรย์เคลือบแก้ว',
                'เตรียมผิวรถยนต์',
                'Crystal Wax Pure SiO2',
                'MR.SORN CAR WASH',
                'เคลือบเงารถยนต์',
                'ล้างรถขัดเคลือบสี',
            ],
            isFeatured: true,
        };

        const insertedVideo = (await Video.create(clipData)) as IVideo;

        console.log('✅ PROTOCOL_SUCCESS: Seed Video Data Updated Successfully!');
        console.log('📹 Inserted Video ID:', insertedVideo._id);
        console.log('🖼️ Cover Poster URL:', insertedVideo.posterFrameUrl);

        process.exit(0);
    } catch (error) {
        console.error('❌ PROTOCOL_FAILURE: Error seeding video data', error);
        process.exit(1);
    }
}

seedVideoData();