const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static(__dirname + '/examples'))

app.use(bodyParser.json())

const router = express.Router()
app.use(router)

router.get('/base/test', function (req, res) {
  console.log(req.body, req.query)
  res.json({ code: 200, msg: 'success' })
})


app.listen(3000, () => console.log('dev server listening on port 3000!'));