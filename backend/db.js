const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI = "mongodb://localhost:27017/iNoteBook"
//mongodb://localhost:27017/
const connectToMongo =  ()=>{
    mongoose
    .connect(mongoURI)
    .then(()=>console.log("connected successufully"))
    .catch(error=>console.log(error))
    
}

module.exports = connectToMongo;