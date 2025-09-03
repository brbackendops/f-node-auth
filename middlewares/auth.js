
const JWT = require('../utils/jwt')

module.exports = (req,res,next) => {
    try {        
        
        const headers = req.headers

        if (headers.authorization === undefined) {
            return res.status(401).json({
                "status": "error",
                "message": "unauthorized",
                "error": "unable to proceed"
            })
        }

        let token = (headers.authorization).split(' ')[1]

        let data = JWT.verifyToken(token)
        req.user = data

        next()

    } catch (error) {
        return res.status(401).json({
            "status": "error",
            "message": "unauthorized",
            "error": "invalid token"
        })        
    }
}