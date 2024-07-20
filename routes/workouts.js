const express = require('express')
const Workout = require('../models/workoutModel')
const {createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const router = express.Router()

//when user goes to api/workouts/ it will use this first route
router.get('/', getWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post a new workout
//make async because we are create something
router.post('/', createWorkout);

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports = router

