console.log("Client is linked");

let operator = "";

//! "POST START
// Let's Gather our USER INPUTS
function submitData(event) {
  event.preventDefault();

  let numOne = document.getElementById("numOne").value;
  let numTwo = document.getElementById("numTwo").value;

  let inputData = { numOne, numTwo, operator };

  axios({
    method: "POST",
    url: "/calculations",
    data: { inputData },
  }).then((response) => {
    console.log("sent over data and message coming back.");
    fetchCalculations();
  });
}

function add(event) {
  event.preventDefault();
  // OPERATOR = "";
  operator = "+";
}
function subtract(event) {
  event.preventDefault();
  // OPERATOR = "";
  operator = "-";
}
function multiply(event) {
  event.preventDefault();
  // OPERATOR = "";
  operator = "*";
}
function divide(event) {
  event.preventDefault();
  // OPERATOR = "";
  operator = "/";
}

//! "POST" END
//! "GET" START

function fetchCalculations() {
  axios({
    method: "GET",
    url: "/calculations",
  }).then((response) => {
    console.log("We got a response!?");
    console.log("response.data is:", response.data);
    let calculations = response.data;
    // Once we get our data back call the renderCalculation() Function.
  renderCalculation(calculations);
  });
}


function renderCalculation(calculations){
    
    let recentResult = document.getElementById('recent-result');
    recentResult.innerHTML = calculations[calculations.length-1].result;
    

    let resultHistory =  document.getElementById('result-history');
     resultHistory.innerHTML ='';
    for (let acalculation of calculations){
      resultHistory.innerHTML +=`
       <li>${acalculation.numOne} ${acalculation.operator} ${acalculation.numTwo} = ${acalculation.result}</li>`
    };
   
  }
fetchCalculations();