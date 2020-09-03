const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks-ctrl');
const { updateTaskValidation, addTaskValidation } = require('../middlewares/validations/taskValidations');
const auth = require('../middlewares/auth/userAuth');

// Auth middleware
router.use(auth);

 //** /api/tasks
  router.route('/')
        .get(tasksCtrl.getAll) //** GET /api/tasks
        .post(addTaskValidation, tasksCtrl.addTask) //** POST /api/tasks

  //** /api/tasks/id
  router.route('/:id')
        .get(tasksCtrl.getTask) // ** GET /api/tasks/id
        .patch(updateTaskValidation, tasksCtrl.editTask) // ** PATCH /api/tasks/id
        .delete(tasksCtrl.deleteTask) // ** DELETE /api/tasks/id


module.exports = router;
