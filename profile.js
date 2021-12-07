const { application } = require('express')
const express = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
     destination: (req, file, cb) =>{
         cb(null, './images')
     },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
    }) 
const upload = multer({storage: storage});
const app = express()
app.use(express.json())
// const uploads = multer().single('single')

app.post('/profile', upload.single("single"), function (req, res, next){
    console.log(req.file);
    res.json("File uploaded")
})

app.post('/profile/multi', upload.array("multi", 3), function (req, res, next){
    res.json("Files uploaded")
})

const tUpload = upload.fields([{ name: 'third', maxCount: 10}])

app.post('/profile/multii', tUpload, function (req, res, next){
    res.json("Files uploaded")
})

// app.post('/profile', function (req, res) {
//     uploads(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//             console.log(err)
//       } else if (err) {
       
//       }
//     })
//     res.json({status: -1})
//   })

app.get('/try', (req, res)=>{
    res.json({"status" : 1 }) 
})

const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});