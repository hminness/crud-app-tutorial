//yoda fhq1TUYN1SlILtXM

console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://yoda:fhq1TUYN1SlILtXM@cluster0.3yhsl.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')
  app.set('view engine', 'ejs')
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(express.static('public'))
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(quotes => {
        res.render('index.ejs', { quotes: quotes })
      })
      .catch(/* ... */)
  })
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
        .then(result=> {
            res.redirect('/')
        })
        .catch(error=> console.error(error))
  })
  app.listen(3000,function() {
    console.log('listening on 3000')
  })
  app.put('/quotes', (req, res) => {
    console.log(req.body)
  })
})
.catch(error => console.error(error))
