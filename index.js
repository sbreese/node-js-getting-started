const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/MEAN-Full-Stack-Development', (req, res) => res.render('pages/MEAN-Full-Stack-Development'))
  .get('/Web-Applications', (req, res) => res.render('pages/Web-Applications'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
