import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
