// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Handles MS, MR, M+, M-, MC
// MS, M+, M-, MC can only be called if the equation == "0".
// MR is can be used after operation

function handleMemory(){
  updateMemory(memory); // Node need to display the memory
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
// Edit: Channing, rewritten to handle errors in input and expression eval.
// Description: MS(Memory Store) puts the displayed result into the memory
// Require: N/A
// Update: memory
// Return: N/A
function handleMS(){
  var invalid_expression = invalidToAdd("=");
  var placeholder = document.getElementById("equation-container").getAttribute("placeholder");
  if (!invalid_expression) {
    printToScreen("=");
    memory = result;
    updateMemory(memory);
  } else if(placeholder !=0){
  	memory = parseFloat(placeholder);
  	updateMemory(memory);
  }else {
    update("ERROR");
  }
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: MR(Memory Recall) uses the number in memory, acts as if you had keyed in that number yourself
// Require: N/A
// Update: memory
// Return: N/A
function handleMR(){
  equation = memory.toString();
  if(equation.includes(".")){
    dot=1;
  }
  update(equation);
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: M+(Memory Add) adds the result of current equation to the memory
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function handleMPlus(){
  var invalid_expression = invalidToAdd("=");
  if (!invalid_expression) {
    printToScreen("=");
    memory += result;
    updateMemory(memory);
  } else {
    update("ERROR");
  }
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Handles memory store.
// Require: N/A
// Update: memory
// Return: N/A
function handleMMinus(){
  var invalid_expression = invalidToAdd("=");
  if (!invalid_expression) {
    printToScreen("=");
      memory -= result;
      updateMemory(memory);
  } else {
    update("ERROR");
  }
}

// Author: Gail Chen
// Created: 7/2
// Edit: Channing, updated call to updateMemory.
// Description: MC(Memory Clear) sets the memory to 0
// Require: N/A
// Update: memory
// Return: N/A
function handleMC(){
  memory = 0;
  updateMemory(memory);
}
