const { mockDeep , mockReset } = require('jest-mock-extended');


let userRepo = mockDeep()

beforeEach(() => {
    mockReset(userRepo)
})



module.exports = userRepo;