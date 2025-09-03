const { mockDeep , mockReset } = require('jest-mock-extended');


const userSrv = mockDeep()

beforeEach(() => {
    mockReset(userSrv)
})


module.exports = userSrv