const express = require('express');
const app = express();

const number = 6;

if(number % 2 == 0) {
    
app.get('/', (req, res) => {
    res.send('The number is even.!!!');
  });
}
else {
    app.get('/', (req, res) => {
        res.send('The number is odd.!!!');
      });
    }
  
  const PORT = process.env.PORT || 8083;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });