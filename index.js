const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/About-Steve', (req, res) => res.render('pages/About-Steve'))
  .get('/Web-Development-Certifications', (re, res) => res.render('pages/Web-Development-Certifications'))
  .get('/MEAN-Full-Stack-Development', (req, res) => res.render('pages/MEAN-Full-Stack-Development'))
  .get('/Web-Applications', (req, res) => res.render('pages/Web-Applications'))
  .get('/Relative-Path-Calculator', (req, res) => res.render('pages/Relative-Path-Calculator'))
  .get('/Check-Writer', (req, res) => res.render('pages/Check-Writer'))
  .get('/Node-js-Uploader',  (req, res) => res.render('pages/Node-js-Uploader'))
  .get('/Interactive-Websites-Image-Zooming', (req, res) => res.render('pages/Interactive-Websites-Image-Zooming'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
