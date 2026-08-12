import mongoose from 'mongoose';
import dns from 'node:dns/promises';

// 🛠️ NETWORK OVERRIDE: บังคับใช้ DNS สากลเพื่อแก้ปัญหา querySrv ECONNREFUSED
dns.setServers(['1.1.1.1', '8.8.8.8']);

/**
 * ระบบ Caching สำหรับป้องกันการเปิด Connection ซ้ำซ้อน (Performance Optimization)
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function MongodbConnect() {
    // 💡 ย้ายการอ่าน MONGO_URI เข้ามาข้างในฟังก์ชัน
    const MONGO_URI = process.env.MONGO_URI || '';

    if (!MONGO_URI) {
        throw new Error('PROTOCOL_ERROR: กรุณากำหนด MONGO_URI ในไฟล์ .env.local');
    }

    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        // เริ่มต้นการเชื่อมต่อ
        cached!.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
            console.log('🚀 PsyberLink Node: Database Connected Successfully via Custom DNS');
            return mongooseInstance;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        console.error('❌ PROTOCOL_FAILURE: Database Connection Error', e);
        throw e;
    }

    return cached!.conn;
}

export default MongodbConnect;