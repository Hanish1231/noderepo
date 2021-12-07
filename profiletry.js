const { application } = require('express')
const express = require('express');
const app = express();
app.use(express.json())
const path = require('path');

const multer = require('multer')
const storage = multer.diskStorage({
     destination: (req, file, cb) =>{
         cb(null, './images')
     },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
    }) 

const uploads = multer({storage: storage});

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post('/profilemulti', uploads.array('multi', 3), (req, res)=>{
    console.log(req.file);
    res.json("Files uploaded")
});

const tUpload = uploads.fields([{ name: 'third', maxCount: 10}])

app.post('/profilemultii', tUpload, function (req, res, next){
    console.log(req.file);
    res.json("Files uploaded")
});

app.post('/profile', function (req, res) {
    uploads(req, res, function (err) {
      if (err instanceof multer.MulterError) {
            console.log(err)
      } else if (err) {
       
      }
    })
    res.json({status: -1})
  });

app.post('/try', (req, res)=>{
    res.json("fghjohgc") 
});

const PORT = process.env.PORT || 8078;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});