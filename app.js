const { body, validationResult, check } = require('express-validator');
const { application } = require('express')
var connect = require('./connection')

const express = require('express');
const app = express();
app.use(express.json())

app.get('/sample', (req, res) => {
  console.log(req.params, req.headers)
  console.log("Headers:",req.params.id)
  res.json({status:1})
});

app.get('/data',(req,res)=>{
  let query = `select * from details where firstname = 'hanish'`
  connect.connectDB() 
  .then((conn)=>{
    conn.query(query, (err, results)=>{
      conn.end()
      if(err){
        console.log("Error:",err)
        return res.json({status:-1, message:"Error"})
      }
      console.log("results:", results)
      res.json({status:1,results})
    })
  })
  .catch((connectErr)=>{
    console.log("Error", connectErr)
  })
})

app.post("/samplepost", [ check('firstname', 'firstname should be atleast 5 characters long') .exists() .isLength({ min :5}),
check('lastname', 'lastname should be atleast 5 characters long') .isLength({ min :5})
], (req,res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  console.log("req.body",req.body)
  
  let query = `INSERT INTO details (firstname, lastname) values (?,?)`
  let data = [req.body.firstname, req.body.lastname];
  connect.connectDB() 
  .then((conn)=>{
    conn.query(query, data, (err, results)=>{
      conn.end()
      if(err){
        console.log("Error:",err)
        return res.json({status:-1, message:"Error"})
      }
      console.log("results:", results)
      res.json({status:1,results})
    })
  })
  .catch((connectErr)=>{
    console.log("Error", connectErr)
  })
})

const PORT = process.env.PORT || 8388;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});