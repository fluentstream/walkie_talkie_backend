const express = require('express')
const app = express()
const port = 3000
const mock_data = require("./mock_data.json")
const fileSystem = require('fs')
const path = require('path')

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})