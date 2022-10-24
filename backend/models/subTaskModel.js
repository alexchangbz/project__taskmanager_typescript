const mongoose = require('mongoose')

const SubTaskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['IN PROGRESS', 'DONE', 'COMPLETE']
    },
    projectID: {
        type: String,
    }
})

module.exports = mongoose.model('SubTask', SubTaskSchema)