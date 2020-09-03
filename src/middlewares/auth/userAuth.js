const User = require('../../models/User-model');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

  try {

    const header = req.headers['authorization'];

    if(!header){
      throw new Error();
    }

    const token = header.split(' ')[1];
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decode.userId
    });

    if(!user){
      throw new Error();
    }

    req.token = token;
    next();

  } catch (error) {
      res.status(401).json({ status: 'fail', message: 'Authentication failed' });
  }


}


module.exports = auth;
