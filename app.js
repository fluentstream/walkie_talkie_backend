const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const mock_data = require("./mock_data.json")
const fileSystem = require('fs')
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
<<<<<<< HEAD

app.get('/', (req, res) => {
  res.send({"Message": "Walkie Talkie Server Running..."})
})

=======
>>>>>>> 9c2379a117f4ee6206895a16b9f6b0763c3d05b6
app.get('/history', (req, res) => {
    setTimeout(() => {
        res.send(mock_data)        
    }, 4000);
})

app.get('/recording', (req, res) => {
  res.writeHead(200, {'Content-Type': 'audio/mpeg'});
  let opStream = fileSystem.createReadStream('./sample_recording.mp3');
  opStream.pipe(res)
})

<<<<<<< HEAD
// Not found error handler
app.use((err, res, next) => {
  res.status(404).send({error: 'Not found!', status: 404})
})

// Generic server error
=======
app.use((err, res, next) => {
  res.status(404).send({error: 'Not found!', status: 404})
})
>>>>>>> 9c2379a117f4ee6206895a16b9f6b0763c3d05b6
app.use((err, res, next) => {
  console.error('Error Handler:', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack})
})

app.listen(port, () => {
  console.log(process.env.NODE_ENV !== 'production' ? `Example app listening at http://localhost:${port}` : `https://HEROKU_URL_HERE`)
})