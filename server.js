const app = require('./app')
const {db} = require('./db/db')
const seed = require('./utils/seedDB')
const PORT = 3000


app.listen(PORT, async () => {
    await seed()
    console.log(`Server is listening at http://localhost:${PORT}`)
})