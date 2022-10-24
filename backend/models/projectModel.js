const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    subTaskID: {
        type: [String]
    }
})

module.exports = mongoose.model('Project', ProjectSchema)