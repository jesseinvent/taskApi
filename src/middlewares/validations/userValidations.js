const User = require('../../models/User-model');


// validate account creation details
exports.createAccountValidation = async (req, res, next) => {

  let errors = [];

  if(req.body.name && req.body.username && req.body.password) {

      if(req.body.password.length < 8){
        errors.push('Password must be greater than 8 digits');
      }

      const user = await User.findOne({username: req.body.username});

      if(user){
        errors.push('User with this username already exists');
      }

  } else {
      errors.push('Missing parameters');
  }

  if(errors.length > 0){
    res.status(400).json({errors});
  } else {
    next();
  }

}
