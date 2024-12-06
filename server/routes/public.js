const express = require('express')
const upload = require('../middlewares/imageUpload');

const { loginUser, signupUser } = require('../controllers/auth')

const router = express.Router()


router.post('/user/login', loginUser)
router.post('/user/signup', upload.single('dp'), signupUser)




module.exports = router