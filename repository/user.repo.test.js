
// dependencies

const UserRepo = require('./user.repo');

// mocks

jest.mock('../utils/prisma/prisma.client');
const prisma = require("../utils/prisma/prisma.client");

// tests

describe('unittest for user repository', () => {

    let userRepo;

    beforeAll(() => {
        userRepo = new UserRepo(prisma)
    })

    it("it should retrieve a user with id", async () => {

        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: 'test@mail.com',
            name: 'test',
            createdAt: Date.now()
        })

        let user = await userRepo.findById(1)
        
        expect(prisma.user.findUnique).toHaveBeenCalled();
        expect(user.id).toBe(1)
        expect(user.name).toEqual('test')
        expect(user.email).toEqual('test@mail.com')
        expect(user).toHaveProperty('createdAt')

    })

    it("it should retrieve a user with email", async () => {

        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: 'test@mail.com',
            name: 'test',
            createdAt: Date.now()
        })

        let user = await userRepo.findByEmail('test@mail.com')
        
        expect(prisma.user.findUnique).toHaveBeenCalled();
        expect(user.id).toBe(1)
        expect(user.name).toEqual('test')
        expect(user.email).toEqual('test@mail.com')
        expect(user).toHaveProperty('createdAt')

    })    

    it("it should return list of users", async () => {

        prisma.user.findMany.mockResolvedValue([
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()                
            }
        ])

        let users = await userRepo.findAllUsers()
        
        expect(prisma.user.findMany).toHaveBeenCalled();
        expect(Array.isArray(users)).toBe(true)

    })

    it("it should create a user", async () => {


        data = {
            id: 1,
            email: 'test@mail.com',
            name: 'test',
        }

        prisma.user.create.mockResolvedValue(
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()
            }
        )

        let user = await userRepo.createUser(data)
        
        expect(prisma.user.create).toHaveBeenCalled();

        expect(user.id).toBe(1)
        expect(user).toHaveProperty('createdAt')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('name')

    })
})