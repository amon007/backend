const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

//registration and login
router.post('/registration', [
    check('email', "Invalid email address. Please provide a valid email.").notEmpty().trim().isEmail(),

    check('username', "Username cannot be empty. Please provide a valid username.")
    .notEmpty()
    .trim()
    .isLength({min: 6, max: 15})
    .withMessage('Username must be at least 6 characters long. Please choose a longer username.'),

    check('password', "Password must be at least 8 characters long. Please choose a longer password.").isLength({min: 8, max: 15}),
],controller.registration)
router.post('/login', controller.login)

//get users and delete user
router.get('/users', controller.getUsers)
router.delete('/admin/users/deleteuser',authMiddleware, roleMiddleware(['ADMIN']),controller.deleteUser)

//get posts and delete post
router.post('/post', controller.addPost)
router.delete('/deletepost',controller.deletePost)
router.get('/getposts', controller.getPosts)
module.exports = router