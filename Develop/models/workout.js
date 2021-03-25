const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    excersises: [
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
                require
            }


        },
    ]
})