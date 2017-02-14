const express = require('express')
const multer = require('multer')
const uploadDir = "./uploads/";
const upload = multer({ dest: uploadDir })
const app = express()
app.set('view engine', 'pug')
app.set('views', './views')
const del = require('node-delete');

app.get('/',(req,res) => {
  res.render('index', {
    title: "FCC File Metadata Microservice"
  })
})

app.post('/upload', upload.single('targetFile') , (req,res) => {
  res.setHeader("Content-Type", "application/json");
  const size = req.file.size;

  // clear upload folders
  del([uploadDir+'*'], function (err, paths) {
    if(err) throw err;
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });

  res.json({
    size
  });
})


const port = process.env.PORT || 8080;
app.listen(port);
