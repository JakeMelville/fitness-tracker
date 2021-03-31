const router = require('express').Router();
const Workout = require('../models/workout');
const path = require('path');

router.post('/api/workouts', ({ body }, res) => {
   // console.log('POST /api/workouts hits=====');
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

router.get("/api/workouts", (req, res) => {
  // console.log('GET /api/workouts hits=====');
  Workout.aggregate([ { $addFields: { totalDuration: { $sum: "$exercises.duration" }}}])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
   // console.log('GET /api/workouts/range hits=====');
  Workout.aggregate([ { $addFields: { totalDuration: { $sum: "$exercises.duration" }}}])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);

    });
});

//updating workouts by id
router.put('/api/workouts/:id', (req, res) => {
   // console.log('PUT /api/workouts/id hits ======');
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } },
    { new: true}
    )
  .then(dbWorkout => {
    res.json(dbWorkout);

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