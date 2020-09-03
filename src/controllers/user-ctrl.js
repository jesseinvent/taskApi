const User = require('../models/User-model');
const jwt = require('jsonwebtoken');
const hashPassword = require('../functions/hashPassword');
const generateAuthToken = require('../functions/generateAuthToken');
const bcrypt = require('bcryptjs');

async function getUserToken(user) {
  const payload = {
                    userId : user._id,
                    name: user.name,
                    username: user.username,
                    userType: user.userType }

  const token = await generateAuthToken(payload);

  return token;
}

// Create new account
exports.createUserAccount = async (req, res) => {

    try {

      req.body.password  = await hashPassword(req.body.password);
      const newUser = new User({ ...req.body });
      await newUser.save();
      // send email
      const token = await getUserToken(newUser);

      res.status(201).json({status: 'success', newUser, token});

    } catch (error) {
      res.status(400).json({message: 'Could not create account' });
    }

  }


// Login User
exports.loginUser = async (req, res) => {

    try {

      const user = await User.findOne({ username: req.body.username});

      if(!user){
        throw new Error('No user found');
      }

      const isMatched = await bcrypt.compare(req.body.password, user.password);

      if(!isMatched) {
        throw new Error('Wrong password');

      } else {

        const token = await getUserToken(user);
        res.status(200).json({ status: 'success', user, token });
      }

    } catch (e) {
        res.status(400).json({ message: 'Invalid details'  });
    }

}

// Logout User
exports.logoutUser = async (req, res) => {

}

// get single user
exports.getUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);
    if(!user){
      res.status(204).json({ status: 'success', message: 'No user found' });
    }
    res.status(200).json({ status: 'success', 'user' : { name: user.name, username: user.username } });

  } catch (e) {
    res.status(400).json({ status: 'fail', message: 'Cannot get user'  });
  }

}

// update user
exports.updateUser = async (req, res) => {

   try {

     const updatedUser = await User.updateOne({_id: req.params.id}, {...req.body});
     res.status(200).json({status: 'success', message: 'updated'});

   } catch (e) {

   }

}

// delete user
exports.deleteUser = async (req, res) => {

  User.findByIdAndDelete(req.params.id).then(result => {
    res.status(200).json({ status: 'success', message: 'user deleted' });
  })
  
}
