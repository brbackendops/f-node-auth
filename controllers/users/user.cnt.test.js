
const { mockDeep } = require('jest-mock-extended')

// mocks

jest.mock('../../utils/prisma/prisma.client');
const prisma = require('../../utils/prisma/prisma.client');


const mockUserRepo = mockDeep()
const mockUserSrv = mockDeep()

jest.mock('../../repository/user.repo.js', () => {
    return jest.fn().mockImplementation(() => mockUserRepo)
})

jest.mock('../../services/user.service.js', () => {
    return jest.fn().mockImplementation(() => mockUserSrv)
})


// const UserRepo = require('../../repository/user.repo.js');
// const UserService = require('../../services/user.service.js');


// client

const request = require('supertest');

// our app
const app = require('../../app.js');
const JWT = require('../../utils/jwt');


describe('unittest for user handler', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return 200 successfull for GET / ", async () => {


        prisma.user.findMany.mockResolvedValue(
            [
                {
                    id: 1,
                    email: 'test@mail.com',
                    name: 'test',
                    createdAt: Date.now()
                }
            ]
        )

        request(app)
            .get('/')
            .expect('Content-Type','application/json')
            .expect(200);

    })


    it("should create a user & return 201 status for POST /signup ", async () => {

        let data = {
            id: 1,
            email: 'test@mail.com',
            name: 'test',
            createdAt: Date.now()
        }

        prisma.user.create.mockResolvedValue(
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()
            }
        )

        mockUserSrv.getUser.mockResolvedValue(
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()
            }            
        )        

        let response = await request(app)
            .post('/signup')
            .send(data)
            .set('Content-Type','application/json')
            .expect(201);

        console.log(response.headers)
        console.log(response.body)
        console.log(response.status)

        expect(response.headers['content-type']).toContain('json')

    })


    it("should login with email & password POST /login ", async () => {

        let data = {
            email: 'test@mail.com',
            password: 'test',
        }

        const mockToken = JWT.token(data, "test123");

        prisma.user.findUnique.mockResolvedValue(
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()
            }
        )

        mockUserSrv.getUserByEmail.mockResolvedValue(
            {
                id: 1,
                email: 'test@mail.com',
                name: 'test',
                createdAt: Date.now()
            }            
        )
        
        mockUserSrv.userLogin.mockResolvedValue(mockToken);
        
        let res = await request(app)
        .post('/login')
        .send(data)
        .set('Content-Type','application/json')
        .expect(200);
        
        expect(mockUserSrv.userLogin).toHaveBeenCalled()
        expect(res.headers['content-type']).toContain('json')
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('token')

    })
})
