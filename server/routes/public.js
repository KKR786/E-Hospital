const express = require('express')
const upload = require('../middlewares/imageUpload');

const { loginUser, signupUser, updateUserProfile, updateUserPassword } = require('../controllers/auth')

const router = express.Router()


router.post('/user/login', loginUser)
router.post('/user/signup', upload.single('dp'), signupUser)


//update user info
router.patch('/user/profile/:_id', updateUserProfile)
router.patch('/user/change_password/:_id', updateUserPassword)



module.exports = router