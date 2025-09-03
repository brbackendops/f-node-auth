const { mockReset , mockDeep } = require('jest-mock-extended');

const prisma = mockDeep();

beforeEach(() => {
    mockReset(prisma)
})

module.exports = prisma;