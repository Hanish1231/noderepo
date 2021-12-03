const { application } = require('express')
var connect = require('./connection')
const {validationResult } = require('express-validator')
const {generateToken, verifyToken} = require('./authentication')
const express = require('express');
const app = express();
app.use(express.json())
app.use((req, res, next)=>{
  const token = req.headers.token
  console.log("Token:", token)
  if(token){
    verifyToken(token).then((res)=>{
      console.log("Token is verified:", token)
      return next()
    })
    .catch((err)=>{
      console.log("Error", err)
      console.log("pull")
      res.status(403).json(err)
      if(err.name=== "JsonWebTokenError"){
        console.log("Please check token")
      }
    })
  }
  else{
    console.log("Line no 25")
    // testing 
return next()
}
})
const rules = require('./validations')
app.post('/samplepost', (req, res)=>{
  console.log("Verified")
  res.json("Done")
})
app.get('/', (req, res) => {
    let query = `select * from notes`
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

app.get('/:id',(req,res)=>{
  let query = `select * from notes where id = ?`
  let data = [req.params.id];
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

app.post("/createNotes", (req,res) => {
  console.log("req.body",req.body)
  
  let query = `INSERT INTO notes (title, description) values (?,?)`
  let data = [req.body.title, req.body.description];
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

app.put("/updateNotes/:id", (req,res) => {
    
    let columns = ""
    if(req.body.description) {
      columns+= "description = ? "
    }
    if(req.body.title) {
      columns+=", title = ? "
    }
    let query = `update notes set ${columns} where id=?;` 

    let data = [req.body.description,req.body.title,   req.params.id];
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

  app.delete("/deleteNotes/:id", [...rules.sampleRules], (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors:", errors)
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body",req.body)
    
    let query = `delete from notes where id=?;`
    let data = req.params.id;
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

  app.get('/events/:nId',(req,res)=>{
    let query = `select * from events where nId=?`
    let data = [req.params.nId];
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

  app.post("/createEvents", (req,res) => {
    console.log("req.body",req.body)
    
    let query = `INSERT INTO events (eId, eName, workStatus, nId) values (?,?,?,?)`
    let data = [req.body.eId, req.body.eName, req.body.workStatus, req.body.nId];
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

  

  app.put("/updateEvents/:id",
  [...rules.sampleRules],
  (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors:", errors)
      return res.status(400).json({ errors: errors.array() });
    }
    let query = `update events set workStatus = ? where nId=? and eId=?;`
    let data = [req.body.workStatus, req.params.id, req.body.eId];
    connect.connectDB() 
    .then((conn)=>{
      conn.query(query, data, (err, results)=>{
        conn.end()
        if(err){
          console.log("Error:",err)
          return res.json({status:-1, })
        }
        console.log("results:", results)
        res.json({status:1,results})
      })
    })
    .catch((connectErr)=>{
      console.log("Error", connectErr)
    })
  })

  app.delete("/deleteEvents/:eId", (req,res) => {
    console.log("req.body",req.body)
    
    let query = `delete from events where eId=?;`
    let data = req.params.eId;
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

  app.post('/login', (req,res)=>{
    const token = generateToken(req.body.user)
    res.json({status : 1, token})
  })

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});