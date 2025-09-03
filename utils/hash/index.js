const bcrypt = require('bcrypt')

module.exports = class Hash {

    static createHash(text,salt=null){
        if (salt === null) {
            return bcrypt.hashSync(text,10)
        }

        return bcrypt.hashSync(text,salt)
    }

    static compareHash(text,hashedText) {
        return bcrypt.compareSync(text,hashedText)
    }

}