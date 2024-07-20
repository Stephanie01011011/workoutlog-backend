//controllers provide functions for inside the get post delete patch requests, so they don't get bloated.
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
//get all workouts
const getWorkouts = async (req, res) => {
    //get all workout records, leave object blank since we want all
    //sort by latest created
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout

const getWorkout = async (req, res) => {
    const { id } = req.params;
    
    //check the id and make sure its a valid mongoose type(12 bit, 24 hex)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }
    const workout = await Workout.findById(id);

    if(!workout) {
        //must return here or else code in this block will continue
        return res.status(404).json({error: "no such workout"})
    }

    res.status(200).json(workout);

}

//create new workout
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body;
    
    let emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "please fill in all fields", emptyFields})
    }
    //add doc to DB
    try {
        
        //create a new workout, adds it to DB
        const workout = await Workout.create({title, reps, load})
        
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    //check the id and make sure its a valid mongoose type(12 bit, 24 hex)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout) {
        //must return here or else code in this block will continue
        return res.status(404).json({error: "no such workout"})
    }

    res.status(200).json(workout)

}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    //check the id and make sure its a valid mongoose type(12 bit, 24 hex)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }

    //first param in method findOne... is the property you base the search on, the second is the updated information
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        //populate this object with the payload from req.body
        ...req.body
    })

    if(!workout) {
        //must return here or else code in this block will continue
        return res.status(404).json({error: "no such workout"})
    }

    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}