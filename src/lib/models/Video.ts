import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideoStep {
    stepNumber: number;
    title: string;
    description: string;
}

export interface IVideo extends Document {
    title: string;
    slug: string;
    description: string;
    cloudinaryUrl: string;       // Direct Video Delivery (MP4/WebM)
    posterFrameUrl: string;      // Thumbnail
    durationSeconds?: number;
    category: 'glass-coating' | 'car-wash' | 'interior' | 'wheel-tire' | 'engine-bay';
    brandShopName: string;       // e.g. "MR.SORN CAR WASH - GLASS COATING"
    workflowSteps: IVideoStep[]; // ขั้นตอนการทำงานในคลิป
    aeoTags: string[];           // Tags สำหรับดัน AI Search
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const VideoStepSchema = new Schema<IVideoStep>({
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const VideoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        cloudinaryUrl: { type: String, required: true },
        posterFrameUrl: { type: String, required: true },
        durationSeconds: { type: Number, default: 0 },
        category: {
            type: String,
            required: true,
            enum: ['glass-coating', 'car-wash', 'interior', 'wheel-tire', 'engine-bay'],
            default: 'glass-coating',
            index: true,
        },
        brandShopName: {
            type: String,
            default: 'MR.SORN CAR WASH - GLASS COATING',
        },
        workflowSteps: [VideoStepSchema],
        aeoTags: [{ type: String, trim: true }],
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite during hot-reloads
const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;