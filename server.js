require('dotenv').config()
const app = require('./app')



const PORT = 3000 || process.env.PORT
app.listen(PORT,() => {
    console.log(`server is listening on http://127.0.0.1:${PORT}`)
})