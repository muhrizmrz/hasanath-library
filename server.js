const express = require('express');
const cors = require('cors');
const { application } = require('express');
const db = require('./backend/config/connection')
const bodyParser = require('body-parser')
var adminRouter = require('./backend/routes/admin');
var usersRouter = require('./backend/routes/user');

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/admin', adminRouter);
app.use('/', usersRouter);

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];

  res.json(customers);
});

/*app.post('/api/add-classification', cors(), (req, res) => {
  if (req.body.classification_number.charAt(2) == 0) {
    db.get().collection('classification').insertOne({
      classificationNumber: req.body.classification_number,
      classificationName: req.body.classification_name,
      summary: "first summary"
    }).then((result) => {
      res.json(result)
    })
  }
})*/

db.connect((err)=>{
  if(err) console.log(err)
  else console.log('connected to database')
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);