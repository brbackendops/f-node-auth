
const Hash = require('../utils/hash')
const JWT = require('../utils/jwt')
const { 
    ModelDoesNotExists,
    ModelAlreadyExists
} = require('../utils/errors/models.errors.js')
const { 
    BadRequestError,
} = require('../utils/errors/client.errors.js')

module.exports = class UserService {
    constructor(userRepo){
        this.userRepo = userRepo;
    }

    async getUser(userId){
        /**
         * service to find user with their id or pk 
         * 
         */
        try {

            let user = await this.userRepo.findById(userId)
            if (user === undefined || user === null ) {
                throw new ModelDoesNotExists(
                    "user not found",
                )
            }

            return user

        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email){
        /**
         * service to find user with their id or pk 
         * 
         */
        try {

            let user = await this.userRepo.findByEmail(email)
            if (user === undefined || user === null ) {
                throw new ModelDoesNotExists(
                    "Invalid email or password",
                )
            }

            return user

        } catch (error) {
            throw error
        }
    }


    async userLogin(data) {
        /**
         * service to login user
         * 
         */
        try {
            let user = await this.getUserByEmail(data.email)

            let password_matches = Hash.compareHash(data.password,user.password)
            if (!password_matches) {
                throw new ModelDoesNotExists("Invalid email or password")
            }

            data = {
                "id": user.id,
                "email": user.email,
                "username": user.username
            }

            let token = JWT.token(data)
            return token

        } catch (error) {
            throw error
        }
    }

    async getAllUsers(){
        /**
         * service to get a list of users from database
         */
        try {
            return await this.userRepo.findAllUsers()
        } catch (error) {
            throw error
        }
    }

    async userCreate(data){
        /**
         * service for creating user 
         */
        try {

            data['password'] = Hash.createHash(data.password)

            let newUser = await this.userRepo.createUser(data)
            return newUser
        } catch (error) {

            if ('code' in error && error.code === 'P2002') {
                throw new ModelAlreadyExists("user with this email already exists")                
            }

            throw error
        }
    }
}