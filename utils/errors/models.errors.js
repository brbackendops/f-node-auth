
class ModelDoesNotExists extends Error {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 409;
        // this.stack = (new Error()).stack;
    }
}

class ModelAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}



module.exports = {
    ModelDoesNotExists,
    ModelAlreadyExists
}