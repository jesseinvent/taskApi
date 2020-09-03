const jwt = require('jsonwebtoken');

module.exports = async (payload) => {

  try {

    const token = await jwt.sign({...payload}, process.env.JWT_SECRET_KEY);
    return token;

  } catch (error) {
      return error;
  }

}
