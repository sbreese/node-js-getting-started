const express = require('express') 
const path = require('path') // used in boilerplate, File Uploader & DB
let formidable = require('formidable') // used in File Uploader
let fs = require('fs') // used in File Uploader
let nodemailer = require('nodemailer') // used in File Uploader

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
  .get('/HTML5-Canvas-SVG-Apps', (req, res) => res.render('pages/HTML5-Canvas-SVG-Apps'))
  .get('/Web-Applications', (req, res) => res.render('pages/Web-Applications'))
  .get('/Super-Minesweeper', (req, res) => res.render('pages/Super-Minesweeper'))
  .get('/Relative-Path-Calculator', (req, res) => res.render('pages/Relative-Path-Calculator'))
  .get('/Spell-Checker', (req, res) => res.render('pages/Spell-Checker'))
  .get('/Check-Writer', (req, res) => res.render('pages/Check-Writer'))
  .get('/Node-js-Uploader',  (req, res) => res.render('pages/Node-js-Uploader'))
  .get('/Creating_a_Promise_Helper_Function_for_your_Mongoose_App', (req, res) => res.render('pages/Creating_a_Promise_Helper_Function_for_your_Mongoose_App'))
  .get('/Interactive-Websites-Image-Zooming', (req, res) => res.render('pages/Interactive-Websites-Image-Zooming'))
  .get('/Common-Coding-Interview-Problems-and-their-Most-Optimal-Solutions',  (req, res) => res.render('pages/Common-Coding-Interview-Problems-and-their-Most-Optimal-Solutions'))
  .get('/api/get-uploads', (req, res) => {
  const uploadFolder = path.join(__dirname, 'public/uploads')
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      res.send(err)
    }
    res.send(files)
  }) // END readdir
}).post('/api/upload', function (req, res) {

  // obtained from geeksforgeeks
    /*const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
 
        let oldPath = files.profilePic.filepath;
        let newPath = path.join(__dirname, 'public/uploads')
            + '/' + files.profilePic.name
        let rawData = fs.readFileSync(oldPath)
 
        /*fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
            return res.send(`Successfully uploaded`)
        })
        
    })*/
    return res.send(`Successfully uploaded`)
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
