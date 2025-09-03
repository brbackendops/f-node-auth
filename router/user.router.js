const router = require('express').Router()

// prisma client instance
const prisma = require('../utils/prisma/prisma.client');

// middlewares

const validate = require('../middlewares/validator');

// user schema
const { userCreationSchema , userLoginSchema } = require('../utils/guard/user.guard');

// user repo instance
const UserRepo = require('../repository/user.repo');
const userRepo = new UserRepo(prisma);

// user service instance
const UserServ = require('../services/user.service');
const userSrv = new UserServ(userRepo);

// user controller instance
const UserController = require('../controllers/users');
const userCnt = new UserController(userSrv);

// middlewares
const authenticate = require('../middlewares/auth');

// rate limiter
const rateLimiter = require('express-rate-limit')

// signup limiter
// 10 requests are allowed per 4 minutes
// alg: fixed window
const registerLimiter = rateLimiter({
    windowMs: 4 * 60 * 1000,
    max: 10,
    message: "too many requests, please try again later"
})

// user routes

router.route('/').get(authenticate,userCnt.getAll.bind(userCnt));
router.route('/signup').post(validate(userCreationSchema),registerLimiter,userCnt.create.bind(userCnt));
router.route('/login').post(validate(userLoginSchema),userCnt.login.bind(userCnt));
router.route('/:id').get(userCnt.get.bind(userCnt));

module.exports = router