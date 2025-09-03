
// dependencies
const UserService = require('./user.service')
const { ModelAlreadyExists } = require('../utils/errors/models.errors')

// mocks
jest.mock('../repository/user.repo.js')
const userRepo = require('../repository/user.repo')

// tests

describe("unit tests for user service", () => {

    let userSrv = null;

    beforeAll(() => {
        userSrv = new UserService(userRepo)
    })

    it("should return a user with id", async () => {

        userRepo.findById.mockResolvedValue({
            id: 1,
            name: 'test',
            email: 'test@mail.com',
            createdAt: Date.now()
        })

        let user = await userSrv.getUser(1)

        expect(userRepo.findById).toHaveBeenCalledWith(1)
        expect(userRepo.findById).toHaveReturned()

        expect(user.id).toBe(1)
        expect(user.name).toEqual('test')
        expect(user.email).toEqual('test@mail.com')

    })

    it("should return a user with email", async () => {

        userRepo.findByEmail.mockResolvedValue({
            id: 1,
            name: 'test',
            email: 'test@mail.com',
            createdAt: Date.now()
        })


        let user = await userSrv.getUserByEmail('test@mail.com')

        expect(userRepo.findByEmail).toHaveBeenCalledWith('test@mail.com')
        expect(userRepo.findByEmail).toHaveReturned()

        expect(user.id).toBe(1)
        expect(user.name).toEqual('test')
        expect(user.email).toEqual('test@mail.com')

    })
    
    it("should return a error when trying to created with email that is already exists", async () => {
        
        let data = {
            "email": "test@mail.com",
            "name": "test",
            "password": "test123"
        }

        userRepo.createUser.mockRejectedValue(new ModelAlreadyExists())
        
        expect(userSrv.userCreate(data)).rejects.toThrow(ModelAlreadyExists)
        expect(userRepo.createUser).toHaveBeenCalled()
    })
    
    it("should create a user", async () => {


        userRepo.createUser.mockResolvedValue({
            id: 1,
            name: 'test',
            email: 'test@mail.com',
            createdAt: Date.now()
        })

        
        let data = {
            "email": "test@mail.com",
            "name": "test",
            "password": "test123"
        }

        let user = await userSrv.userCreate(data)

        expect(userRepo.createUser).toHaveBeenCalledWith(data)
        expect(userRepo.createUser).toHaveReturned()

        expect(user.id).toBe(1)
        expect(user.name).toEqual('test')
        expect(user.email).toEqual('test@mail.com')
        expect(user).toHaveProperty('createdAt')

    })    
})