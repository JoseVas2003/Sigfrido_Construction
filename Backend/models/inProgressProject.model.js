    const mongoose = require('mongoose');

const InProgressProjectSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please enter the customer name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter the customer email'],
    },
    projectType: {
        type: String,
        required: [true, 'Please specify the project type'],
        enum: ['ADU', 'Bathroom', 'Floor', 'Kitchen', 'Roof', 'Rooms'],
    },
    dateStarted: {
        type: Date,
        default: Date.now,
    },
    estimatedCost: {
        type: Number,
    },
    expectedCompletion: {
        type: Date,
    },
    quote: {
        data: {
        type: Buffer,
        },
        contentType: {
        type: String,
        },
    },
}, { timestamps: true });

    module.exports = mongoose.model('InProgressProject', InProgressProjectSchema);
