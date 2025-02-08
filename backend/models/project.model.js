import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    requests: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    fileTree: {
        type: Object,
        default: {}
    }
})

const project = mongoose.model('Project', projectSchema);

export default project