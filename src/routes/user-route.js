const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrl');
const { createAccountValidation } = require('../middlewares/validations/userValidations');
const auth = require('../middlewares/auth/userAuth');

router.post('/new', createAccountValidation, userCtrl.createUserAccount); //** POST /api/users/new
router.post('/login', userCtrl.loginUser); //** POST /api/users/login
router.post('/logout', userCtrl.logoutUser); //** POST /api/users/logout

//** /api/users/id
router.use(auth)
      .route('/:id') //*********** PROTECTED ROUTE, USER MUST BE LOGGED IN
      .get(userCtrl.getUser) //** GET /api/users/id
      .patch(userCtrl.updateUser) //** PATCH /api/users/id
      .delete(userCtrl.deleteUser); //** DELETE /api/users/id

 module.exports = router;
