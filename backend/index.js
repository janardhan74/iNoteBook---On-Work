const express = require('express')
const connectToMongo = require('./db')
connectToMongo()
const app = express()
const port = 3000
// app.get('/about', (req, res) => {
//     // console.log(req)
//   res.send('Hello World!')
// })

app.use(express.json())
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes" , require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})