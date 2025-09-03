
module.exports = class UserController {
    constructor(service){
        this.userService = service
    }

    async getAll(req,res) {
        try {   

            let users = await this.userService.getAllUsers()
            return res.status(200).json({
                "status": "success",
                "data": users
            })

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                "status": "error",
                "error": error.name,
                "message": error.message,
                "stack": error.stack
            })
        }        
    }

    async get(req,res){

        console.log(req.path)
        if(req.method === "GET" && req.path !== "/") {
            return res.status(400).send("Method GET Not Allowed")
        }

        try {
            const { id } = req.params

            let user = await this.userService.getUser(Number(id))
            return res.status(200).json({
                "status": "success",
                "data": user
            })

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                "status": "error",
                "error": error.name,
                "message": error.message,
                "stack": error.stack
            })
        }
    }

    async create(req,res) {
        try {
            let user = await this.userService.userCreate(req.body)
            return res.status(201).json({
                "status": "success",
                "data": user
            })
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                "status": "error",
                "error": error.name,
                "message": error.message,
                "stack": error.stack
            })
        }
    }

    async login(req,res){
        try {

            let token = await this.userService.userLogin(req.body)
            // console.log(token)
            return res.status(200).json({
                "status": "success",
                "token": token
            })
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                "status": "error",
                "error": error.name,
                "message": error.message,
                "stack": error.stack
            })
        }
    }
}