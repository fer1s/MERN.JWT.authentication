const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const checkAuth = require('../middlewares/auth.middleware')

// POST /api/auth/login
router.post('/login', controller.login)

// POST /api/auth/register
router.post('/register', controller.register)

// GET /api/auth/user
router.get('/user', checkAuth, controller.user)

module.exports = router