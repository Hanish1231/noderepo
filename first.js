const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello!!!');
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});