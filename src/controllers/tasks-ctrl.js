const Task = require('../models/Task-model');

// get all tasks
exports.getAll = async (req, res) => {

  try {

    const tasks = await Task.find();

    if(tasks) {
      res.status(200).json({tasks});
    } else {
      res.status(200).json({message: 'No tasks found'});
    }

  } catch (error) {
    res.status(400).json({message: error });
  }

}

// Add task
exports.addTask = async (req, res) => {

  try {

      const newTask = new Task({
        ...req.body
      });

      await newTask.save();
      res.status(201).json({status: 'success', newTask});

  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Task could not created' });
  }

}

// Get Single task
exports.getTask = async (req, res) => {

  try {

    const task = await Task.findOne({_id: req.params.id});

    if(!task){
      res.status(404).json({message: 'No task found' });
    }
    res.status(200).json({status: 'success', task});

  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }

}

// Update task
exports.editTask = async (req, res) => {

  try {

      const updatedTask = await Task.updateOne({_id: req.params.id}, {...req.body});
      res.status(200).json({status: 'success', message: 'updated'});

  } catch (error) {
    res.status(400).json({status: 'fail', message: 'Could not update' });

  }

}

// Delete task
exports.deleteTask = (req, res) => {

   Task.findByIdAndDelete(req.params.id)
   .then((result) => {
     res.status(200).json({ status: 'success', message: 'task deleted' });
   });

}
