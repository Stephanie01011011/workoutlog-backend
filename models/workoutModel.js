//create a models folder, then create each file that will hold structure of each feature, such as workouts

const mongoose = require('mongoose');

const Schema = mongoose.Schema

//create the schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

//model name must be singular, because it will be turned into the plural in the database
module.exports = mongoose.model('Workout', workoutSchema)

//will be able to access and manip the collection using
//Workout.find() or something similar