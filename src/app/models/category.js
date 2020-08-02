const mongoose = require('../../database');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
        unique: true,
    },
    description: {
        type: String, 
        require: true,
    },
    color: {
        type: String, 
        require: true,
        lowercase: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }],
    createdAt: { 
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;