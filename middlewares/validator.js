

module.exports = (uValidatorObj) => {

    return (req,res,next) => {
        try {      
            
            if (req.body == undefined || req.body == null) {
                throw new Error("request body not found")
            }

            let result = uValidatorObj.validate(req.data)

            if (result.error) {
                return res.status(400).json({
                    "status": "error",
                    "errors": result.error.details
                })
            }

            console.log(result.value)

            next()

        } catch (error) {
            return res.status(400).json({
                "status": "error",
                "error": error.message
            })
        }
    }

}