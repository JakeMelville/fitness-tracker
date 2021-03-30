const router = require('express').Router();
const Workout = require('../models/workout');
const path = require('path');

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});
router.get("/api/workouts", (req, res) => {
  Workout.aggrega({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
//getting the workouts by id
router.put('/api/workouts/:id', async (req, res) => {
  console.log('/api/workouts/1 hits======');
  try {
    const workoutData = await Workout.findByPk(req.params.id)
    if (!workoutData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
})
//agregate for the duration and duration range==> look up .aggregate for mongoose to get answer


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