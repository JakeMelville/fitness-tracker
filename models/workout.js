const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                require: 'Enter an excersise',
            },
            name: {
                type: String,
                trim: true,
                require: 'Enter an excersise name'
            },
            duration: {
                type: Number,
                require: 'Enter the duration'
            },
            weight: {
                type: Number,
                require: 'Enter weight'
            },
            reps: {
                type: Number,
                require: 'Enter amount of reps'
            },
            sets: {
                type: Number,
                require: 'Enter the number of sets'
            }


        },
    ]
})

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;