const mongoose = require('../../database');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String, 
        require: true
    },
    url: {
        type: String, 
        unique: true,
        require: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;