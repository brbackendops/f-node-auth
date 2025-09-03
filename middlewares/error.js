require('dotenv').config()


module.exports = (err,req,res,next) => {

    const statusCode = err.statusCode || 500

    if( process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
            status: "error",
            error: err.name | "Error",
            message: err.message || "Internal Server Error",
            stack: err.stack || undefined
        })
    }

    return res.status(statusCode).json({
        status: "error",
        error: err.name | "Error",
        message: err.message || "Internal Server Error"
    })
    
}