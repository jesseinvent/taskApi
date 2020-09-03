
exports.addTaskValidation = (req, res, next) => {

  if(req.body.name && req.body.description){

    if(req.body.name != '' && req.body.description != ''){
      next();
    } else {
      res.status(400).json({message: 'Missing parameters' });
    }

  } else {
    res.status(400).json({message: 'Missing parameters' });
  }

}


exports.updateTaskValidation = (req, res, next) => {

  if(req.body.name || req.body.description || req.body.completed){
    next();
  } else {
    res.status(400).json({message: 'Missing parameters' });
  }

}
