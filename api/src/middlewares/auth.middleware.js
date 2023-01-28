const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) {
        return res.json({ message: 'no token provided'})
    }

    try {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) {
                return res.json({ message: 'invalid token' })
            } else {
                req.user = decoded
                next()
            }
        })
    } catch (error) {
        console.error('some error occured with authentication middleware')
        res.json({ message: 'server error' })
    }
}