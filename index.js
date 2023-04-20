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
  .get('/Common-Coding-Interview-Problems-and-their-Most-Optimal-Solutions',  (req, res) => res.render('pages/Common-Coding-Interview-Problems-and-their-Most-Optimal-Solutions')
).post('/Node-js-Uploader', function (req, res) {
  // create an incoming form object
  let form = new formidable.IncomingForm()
  let msgComplete
  let fileName
  let acceptableExt = [
    'pdf',
    'png',
    'jpg',
    'gif',
    'mp4',
    'mov',
    'avi',
    'txt',
    'mpeg4',
    'flv'
  ]

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, 'public/uploads')
  console.log('Does this top level upload dir exist?: ', form.uploadDir)

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    fileName = file.name
    let ext = file.name.split('.').pop()
    console.log('ext:', ext)
    if (file.size > 50000000) {
      msgComplete = 'Upload Failed: file too large'
      fs.unlink(file.path, err => {
        if (err) throw err
        console.log('successfully deleted ' + file.path)
      })
    } else if (!ext || !acceptableExt.includes(ext)) {
      msgComplete = 'Upload Failed: ' + file.name + ' is not a valid file type'
      fs.unlink(file.path, err => {
        if (err) throw err
        console.log('successfully deleted ' + file.path)
      })
    } else {
      fs.rename(file.path, path.join(form.uploadDir, file.name))
      msgComplete = file.name + ' Uploaded Successfully'
    }
    console.log('Msg Complete:', msgComplete)
  })

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err)
  })

  // once all the file(s) have been uploaded, send a response to the client
  form.on('end', function () {
    // Notify Steve of uploaded file(s)
    /* If using GMail, Less Secure Apps must be turned ON: https://myaccount.google.com/lesssecureapps?pli=1
    // Unlock Captcha: http://www.google.com/accounts/DisplayUnlockCaptcha
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
        user: 'sbreese@gmail.com',
        pass: 'Rainey9-'
      }
    }));
    */
    /*
    let transport = nodemailer.createTransport("SMTP", {
      service: "hotmail",
      auth: {
        user: "steve.breese@outlook.com",
        pass: "Rainey7-"
      }
    });*/
    let transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com', // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: 'steve.breese@outlook.com',
        pass: 'Rainey8-'
      }
    })

    let mailOptions = {
      from: 'steve.breese@outlook.com',
      to: 'sbreese@gmail.com',
      subject: '[www.SteveBreese.com] A file was uploaded to your website',
      text: `Hi Steve,
A file named ${fileName} was just uploaded to your personal
website via the upload form on the File Uploader page.

https://www.stevebreese.com/Node-js-Uploader

You had better check this page to ensure that the uploaded file 
is not any offensive or copywrited material.

Kind regards,
Steve Breese`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.end(error.toString())
      } else {
        res.end(msgComplete)
      }
    })
    // END Notify Steve Breese of uploaded file(s)

    //res.end('success');
  }) // END upload(s) complete

  // parse the incoming request containing the form data
  form.parse(req)
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
