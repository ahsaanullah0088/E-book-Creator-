const express = require('express');
const {
  registerUser,
  loginUser,
  getProfile,
  updateUserProfile,
} = require('../controller/authController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);
router.get("/test", (req, res) => {
  res.send("Auth route is working");
} );



module.exports = router;
