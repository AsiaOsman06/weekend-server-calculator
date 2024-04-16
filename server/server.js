const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = 
    [
    {
      numOne: 3,
      numTwo: 5,
      operator: '+',
      result: 8
    },
    {
      numOne: 11,
      numTwo: 7,
      operator: '-',
      result: 4
    }
  ]



// Here's a wonderful place to make some routes:
//! GET /calculations
app.get('/calculations', (req, res) => {
  console.log('GET /calculations received a request!');
  // console.log('req is:', req); // 👈 This will log an ENORMOUS object.
  res.send(calculations);
})


//! POST /calculations
app.post('/calculations', (req, res) => {
  console.log('POST /calculations received a request!');
  let dataToAdd = req.body.inputData;
  console.log('data to add',dataToAdd);


  let result;
  let operator = dataToAdd.operator;
  let numOne = dataToAdd.numOne;
  let numTwo = dataToAdd.numTwo;



  if(operator === '+'){
    result = Number(numOne) + Number(numTwo);
  }else if(operator === '-'){
    result = Number(numOne) - Number(numTwo);
  }else if(operator === '*'){
    result = Number(numOne) * Number(numTwo);
  }else if(operator === '/'){
    result = Number(numOne) / Number(numTwo);
  };

let calculationsObject = {
      numOne: dataToAdd.numOne,
      numTwo: dataToAdd.numTwo,
      operator: dataToAdd.operator,
      result: result
}
calculations.push(calculationsObject);
console.log('calcualtions of objects', calculationsObject);
 
  res.sendStatus(201); // 👈 Send "CREATED" back to client.
})







// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;