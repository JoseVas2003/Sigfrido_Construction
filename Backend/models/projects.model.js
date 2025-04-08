const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a project name"],
        },
        description: {
            type: String,
        },
        timeTaken: {
            type: String,
        },
        cost: {
            type: String,
        },
        categories: {
            type: [String],
            default: [],
        },
        images: [
            {
              data: Buffer,
              contentType: String,
            }
        ],
    },
    {
        timestamps: true,
    },
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;