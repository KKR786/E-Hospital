const express = require('express')
const upload = require('../middlewares/imageUpload');


const { updateUserProfile, updateUserPassword, getUser } = require('../controllers/auth')
const { getNearbyUsers } = require('../controllers/main')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/user/profile/:_id', getUser)


//update user info
router.patch('/user/profile/:_id', upload.single('dp'), updateUserProfile)
router.patch('/user/change_password/:_id', updateUserPassword)

router.post('/find/blood', getNearbyUsers);



module.exports = router