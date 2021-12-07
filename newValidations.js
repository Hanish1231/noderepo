const {body, param } = require('express-validator')
var connect = require('./connection')
const validator1 = body('id').isNumeric()
.withMessage("Provide a proper Number")

const validator2 = body('uName').isLength(5, 10)
.withMessage("Name should be min 5 and max of 10 characters")

const validator3 = body('pincode').isLength(6)
.withMessage("Pincode should be 6 digits")

 
const testValidator = param('id').custom((val) => {
    const query = `select * from users where id=? and manager = 'y';`
    let data = val;
    let dbresult;
    connect.connectDB() 
    .then((conn)=>{
      conn.query(query, data, (err, results)=>{
        dbresult = results
        conn.end()
        if(err){
        }
        console.log("results:", dbresult)
      })
    })
    .catch((connectErr)=>{
      console.log("Error", connectErr)
    })
    console.log("line "+dbresult)
    if(dbresult) {
        throw new Error("Invalid user")
    }
    return true 

})


module.exports.createRules  = [ validator1, validator2, validator3]
module.exports.updateRules  = [validator2, validator3]
module.exports.getRules  = [testValidator]