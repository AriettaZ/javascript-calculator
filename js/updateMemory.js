// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Handles MS, MR, M+, M-, MC
// MS, M+, M-, MC can only be called if the equation == "0".
// MR is can be used after operation

var memory = 0;
function handleMemory(){
  updateMemory(); // Node need to display the memory
  document.getElementById("mr").addEventListener("click", handleMR);
  document.getElementById("ms").addEventListener("click", handleMS);
  document.getElementById("m+").addEventListener("click", handleMPlus);
  document.getElementById("m-").addEventListener("click", handleMMinus);
  document.getElementById("mc").addEventListener("click", handleMC);
}
/*
function disableMemory(){
  document.getElementById("ms").removeEventListener("click", handleMS);
  document.getElementById("m+").removeEventListener("click", handleMPlus);
  document.getElementById("m-").removeEventListener("click", handleMMinus);
  document.getElementById("mc").removeEventListener("click", handleMC);
}
*/
// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: MS(Memory Store) puts the displayed result into the memory
// Require: N/A
// Update: memory
// Return: N/A
function handleMS(){
  var invalid_expression = invalidToAdd("=");
  if (!invalid_expression) {
    printToScreen("=");
    memory = result;
  } else {
    update("ERROR");
  }
  updateMemory();
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: MR(Memory Recall) uses the number in memory, acts as if you had keyed in that number yourself
// Require: N/A
// Update: memory
// Return: N/A
function handleMR(){
  // var result = parseFloat(document.getElementById("current-value").innerHTML);
  //result += memory;
  update(equation + memory.toString());
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: M+(Memory Add) adds the result of current equation to the memory
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function handleMPlus(){
  // var result = parseFloat(document.getElementById("current-value").innerHTML);
  memory += result;
  updateMemory();
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Handles memory store.
// Require: N/A
// Update: memory
// Return: N/A
function handleMMinus(){
  // var result = parseFloat(document.getElementById("current-value").innerHTML);
  memory -= result;
  updateMemory();
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: MC(Memory Clear) sets the memory to 0
// Require: N/A
// Update: memory
// Return: N/A
function handleMC(){
  memory = 0;
  updateMemory();
}

function updateMemory(){
  document.getElementById("current-memory").innerHTML = memory;
}
