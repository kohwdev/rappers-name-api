const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
  dbConectionStr = process.env.DB_STRING
  dbName = 'simple_rapper_api'

MongoClient.connect(dbConectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())

// const rappers = {
//   "21 savage": {
//     age: 29,
//     birthName: "Shéyaa Bin Abraham-Joseph",
//     birthLocation: "London, England",
//   },
//   "chance the rapper": {
//     age: 29,
//     birthName: "Chancelor Johnathan Bennett",
//     birthLocation: "Chicago, Illinois",
//   },
//   "unknown": {
//     age: 0,
//     birthName: "unknown",
//     birthLocation: "unknown",
//   },
// };

app.get('/', (req, res) => {
  db.collection('rappers').find().sort({likes: -1}).toArray()
  .then(data => {
    console.log(data);
    res.render('index.ejs', { info: data })
  })
  .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, () => {
 console.log(`Server is running on port ${PORT}`);
})