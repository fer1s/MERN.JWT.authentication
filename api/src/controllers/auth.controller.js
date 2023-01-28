const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserSchema } = require('../mongo')

const SECRET = process.env.SECRET

const login = async (req, res) => {
   const { username, password } = req.body

   if (!username || !password) {
      return res.json({
         message: 'username and password are required',
      })
   }

   const findUser = await UserSchema.findOne({ username })
   if (!findUser) {
      return res.json({
         message: "can't find this user",
      })
   }

   const hashedPassword = findUser.password
   const checkHash = await bcrypt.compare(password, hashedPassword)
   if (!checkHash) {
      return res.json({
         message: 'wrong password',
      })
   }

   const payload = {
      id: findUser._id,
      username: findUser.username,
   }

   const token = jwt.sign(payload, SECRET, {
      expiresIn: 1000 * 60 * 60 * 24, // 24 hours
   })

   res.json({
      message: 'successfully logged in',
      token,
   })
}

const register = async (req, res) => {
   const { username, password } = req.body

   if (!username || !password) {
      return res.json({
         message: 'username and password are required',
      })
   }

   const userExist = await UserSchema.findOne({ username })
   if (userExist) {
      return res.json({
         message: 'username are taken',
      })
   }

   const hashedPassword = await bcrypt.hash(password, 10)
   const user = new UserSchema({
      username: username,
      password: hashedPassword,
   })
   await user.save()

   res.json({ message: 'registered successfully' })
}
const user = async (req, res) => {
    req.user ? res.json(req.user) : res.json({ message: 'unauthorized' })
}

module.exports = {
   login,
   register,
   user,
}
