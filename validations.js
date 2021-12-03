const {body, param } = require('express-validator')
var connect = require('./connection')
const sampleValidator1 = param('id').isNumeric()
.withMessage("Provide a proper Number")

const sampleValidator2 = param('id').equals(1)
.withMessage("second error")

const sampleValidator3 = body('workStatus').contains('one')
.withMessage("Error Working")

const sampleValidator4 = body('workStatus').isEmail().withMessage("Invalid email")

const sampleValidator5 = param('id').isDivisibleBy(3)
.withMessage("not divisible")
const sampleValidator6 = param('id').isEmpty() 
.withMessage("not empty")
const sampleValidator7 = param('id').isFloat() 
.withMessage("is float")
const sampleValidator8 = param('id').isHexadecimal()
.withMessage("hexa")

const sampleValidator9 = body('workStatus').isLowercase()
.withMessage("Provide a proper value")

const sampleValidator10 = body('workStatus').isStrongPassword()
.withMessage("Provide a strong password")

 
const testValidator = param('id').custom((val) => {
    const query = `delete from notes where id=?;`
    let data = val;
    let dbresult;
    connect.connectDB() 
    .then((conn)=>{
      conn.query(query, data, (err, results)=>{
        dbresult = results
        conn.end()
        if(err){
          console.log("Error:",err)
          return res.json({status:-1, message:"Error"})
        }
        console.log("results:", results)
      })
    })
    .catch((connectErr)=>{
      console.log("Error", connectErr)
    })
    if(dbresult) {
        throw new Error("Id not found")
    }
    return true 

})

const custValidator = param('id').custom((val) => {
    if(val < 10) {
        throw new Error("Id less than 10")
    }
    return true 

})



module.exports.sampleRules  = [sampleValidator1, sampleValidator3, sampleValidator4, sampleValidator5, sampleValidator6,
    sampleValidator7,sampleValidator8, sampleValidator9, sampleValidator10, custValidator, testValidator]