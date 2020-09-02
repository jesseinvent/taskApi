const express = require('express');
const router = express.Router();
const tasksCtrl = require('../controllers/tasks-ctrl');
const { updateAuth, addAuth } = require('../middlewares/auth');


  //** /api/tasks
  router.route('/')
        .get(tasksCtrl.getAll) //** GET /api/tasks
        .post(addAuth, tasksCtrl.addTask) //** POST /api/tasks

  //** /api/tasks/id
  router.route('/:id')
        .get(tasksCtrl.getTask) // ** GET /api/tasks/id
        .patch(updateAuth, tasksCtrl.editTask) // ** PATCH /api/tasks/id
        .delete(tasksCtrl.deleteTask) // ** DELETE /api/tasks/id


module.exports = router;
