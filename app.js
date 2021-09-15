const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const mock_data = require("./mock_data.json")
const fileSystem = require('fs')

let transmissions = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send({"Message": "Walkie Talkie Server Running..."})
})

app.get('/history', (req, res) => {
    setTimeout(() => {
        res.send(mock_data)        
    }, 4000);
})

app.get('/transmission_observer', (req, res) => {
  res.send(transmissions)
})

app.get('/recording', (req, res) => {
  res.writeHead(200, {'Content-Type': 'audio/mpeg'});
  let opStream = fileSystem.createReadStream('./sample_recording.mp3');
  opStream.pipe(res)
})

app.post('/upload', (req, res) => {
  const body = req.body

  if (!body["datetime"] || 
      !body["username_to"] ||
      !body["username_from"] ||
      !body["recording"]){
        res.status(400);
        res.send('Uh oh, please send the headers we need');
  }

  let newTransmission = {
    "datetime"      :     `${body.datetime}`,
    "username_to"   :     `${body.username_to}`,
    "username_from" :     `${body.username_from}`,
    "recording"     :     `${body.recording}`
  }

  transmissions.push(newTransmission)
  res.status(200).send()
  
})

// Not found error handler
app.use((err, res, next) => {
  res.status(404).send({error: 'Not found!', status: 404})
})

// Generic server error
app.use((err, res, next) => {
  console.error('Error Handler:', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})