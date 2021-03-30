const router = require('express').Router();
const Workout = require('../models/workout');
const path = require('path');

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout)
      console.log('POST /api/workouts hits=====');
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([ { $addfields: { totalDuration: { sum: 'exercises.duration' }}}])
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log('GET /api/workouts hits=====');
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([ { $addfields: { totalDuration: { $sum }}}])
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log('GET /api/workouts/range hits=====');
    })
    .catch(err => {
      res.status(400).json(err);

    });
});

//updating workouts by id
router.put('/api/workouts/:id', ({ params, body }, res) => {
  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body }})
  .then(dbWorkout => {
    res.json(dbWorkout);
    console.log('PUT /api/workouts/id hits ======');
  })
  .catch(err => {
    res.status(400).json(err)
  })
})

//delete workouts
router.delete('api/workouts', ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      return res.json(true);
    })
    .catch((err) => {
      res.json(400).json(err)
    })
})

module.exports = router;