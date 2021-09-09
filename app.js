const express = require('express')
const app = express()
const port = 3000
const mock_data = require("./mock_data.json")

app.get('/history', (req, res) => {
    setTimeout(() => {
        res.send(mock_data)        
    }, 4000);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})