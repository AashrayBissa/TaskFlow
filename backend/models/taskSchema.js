const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    description : String,

    dueDate: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    isCompleted: {
        type: Boolean,
        default: false        
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;