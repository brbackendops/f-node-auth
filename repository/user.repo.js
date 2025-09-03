

module.exports = class UserRepo {
    constructor(client){
        this.model = client.user
    }


    async findAllUsers(){
        try {
            let users = await this.model.findMany();
            return users
        } catch (error) {
            throw error
        }
    }

    async findById(userId) {
        try {
            let user = await this.model.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true
                }
            });

            return user
        } catch (error) {
            throw error
        }
    }

    async findByEmail(email) {
        try {
            let user = await this.model.findUnique({
                where: {
                    email: email
                }
            });

            return user
        } catch (error) {
            throw error
        }
    }    

    async createUser(data) {
        try {
            let user = await this.model.create({
                data: data,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            });
            return user
        } catch (error) {
            throw error
        }
    }

}