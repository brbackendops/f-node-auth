require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = class JwtTokenObtain {


    static token(data) {
        return jwt.sign(
            data,
            process.env.SECRET_KEY,
            {
                "expiresIn": '1d',
                
            }
        )
    }


    static verifyToken(token) {
        return jwt.verify(token,process.env.SECRET_KEY)
    }

}