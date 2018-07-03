// Author: Gail Chen
// Created: 7/1
// Edit: Gail 7/2 update corresponding to design of buttons in index.html
// Description: Using buttons and keyboard to enter the equation.

// var equation = "0";
var CHAR_CODE = [16, 43, 45, 56, 42, 47, 40, 41, 69, 13, 61, 8, 46, 37, 94, 8730];

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Get valid inputs from keyboard or buttons.
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function getInput(){
  update("0");
  handleMemory();

  var textArea = document.getElementById("equation-container");
  document.addEventListener("keypress",keyboardInput,true);

  textArea.addEventListener("focusin", function(event) {
    document.removeEventListener("keypress", keyboardInput, true);
  });

  textArea.addEventListener("focusout", function(event) {
    document.addEventListener("keypress", keyboardInput, true);
  });

  // document.addEventListener("keypress", keyboardInput);
  var buttons = document.getElementsByClassName("keyboard-item");
  for (i = 5; i < buttons.length; i++){
    buttons[i].addEventListener("click", handleInput);
  }
}

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Handles the inputs from buttons.
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function handleInput(){
  printToScreen(this.getAttribute("name"));
}

// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Get valid keyboard inputs the equation to calculate.
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function keyboardInput(event) {
  var keyCode = event.which || event.keyCode;
  var input;
  if (keyCode != 0) {
    if (!((keyCode <= 57) && (keyCode >= 48)) && !CHAR_CODE.includes(keyCode)) {
      event.preventDefault();
    }else {
      if((keyCode <= 57) && (keyCode >= 48)){
        input = String.fromCharCode(keyCode);
        document.getElementById(input).click();
      } else {
          switch(keyCode){
            case 43:
              input = "+";
              document.getElementById("plus").click();
              break;
            case 45:
              input = "-";
              document.getElementById("minus").click();
              break;
            case 42:
              input = "×";
              document.getElementById("times").click();
              break;
            case 47:
              input = "÷";
              document.getElementById("plus").click();
              break;
            case 40:
              input = "(";
              document.getElementById("division").click();
              break;
            case 41:
              input = ")";
              document.getElementById(")").click();
              break;
            case 69:
              input = "E";
              document.getElementById("scientific").click();
              break;
            case 13: //enter
            case 61:
              input = "=";
              document.getElementById("equal").click();
              break;
            case 8: // backspace
              input = "<-";
              document.getElementsByClassName('fa-backspace')[0].click();
              break;
            case 46:
              input = ".";
              document.getElementById("dot").click();
              break;
            case 37:
              input = "%";
              document.getElementById("percentage").click();
              break;
            case 94:
              input = "^";
              document.getElementById("exponentiation").click();
              break;
            case 8730:
              input = "√(";
              document.getElementById("squareroot").click();
              break;
          }
        }
        // printToScreen(input);
      }
    }
}

var all = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "×", "÷", "=", "C", "^", "^2", "E", "(", ")", "%", "√(", ".", "MR", "MS", "M+", "M-", "MC", "<-"];
var operation = ["+", "-", "×", "÷", "^", "E", ".", "(", "√("];
var startOp = ["(", "√(", "-"];
var midOp = ["+", "×", "÷", "^", "E"];
var endOp = ["^2", ")", "%"];
var clear = ["=", "C", "MR", "MS", "M+", "M-", "MC"];
var other = ["<-"];
var setexp = 0;
var dot = 0;

// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Adjust the inputs to an create an acceptable equation
// then print the result of the calculation and update the history list.
// Require: N/A
// Update: equation, #current-input, #history-container
// Return: N/A
function printToScreen(input){
  var equation = document.getElementById("equation-container").value;
  var last = equation.slice(-1);
  var last2 = equation.slice(-2);
  var twoBefore = equation.charAt(equation.length - 2);
  var threeBefore = equation.charAt(equation.length - 3);
  var cutLast = equation.substring(0, equation.length - 1);
  var cutLast2 = equation.substring(0, equation.length - 2);
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var nochange = ((equation == "0") && [")", "<-"].includes(input)) ||
                  (operation.includes(last) && input == ".") ||
                  (last == "(" && (endOp.includes(input) || midOp.includes(input))) ||
                  (input == "%" && (startOp.includes(last) || midOp.includes(last))) ||
                  ((input == "^" || input == "^2") && (last == "%")) ||
                  ((endOp.includes(input) || midOp.includes(input)) && last == "-" && twoBefore == "");

  if (!nochange){
    id = "";
    switch(input){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if((last == "0" && !numbers.includes(twoBefore) && twoBefore != ".") || endOp.includes(last)){
          equation = cutLast;
        }
        break;

      case "+":
      case "×":
      case "÷":
        if(["+", "-", "×", "÷", "^", "E", "."].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "-":
        if(["+", "-", "×", "÷", "^", "."].includes(last) || (last == "0" && twoBefore == "")){
          equation = cutLast;
        }
        break;

      case "%":
        if(["+", "-", "×", "÷", "^", "E", "(", ".", "%"].includes(last)){
          equation = cutLast;
        }
        break;

      case "^":
      case "^2":
        if(["+", "-", "×", "÷", "E", "(", "."].includes(last)){
          equation = cutLast;
        }
        break;

      case ".":
        if(["%", ")"].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "√(":
        if(["","."].includes(last)){
          equation = cutLast;
        }
        break;

      case "(":
        if(["."].includes(last) || (last == "0" && twoBefore == "")){
          equation = cutLast;
        }
        break;

      case ")":
        if(["+", "-", "×", "÷", "^", "E", "."].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "E":
        if (!numbers.includes(last)){
          equation = cutLast;
        }
        break;

      case "<-":
        if(last2 == "√("){
          equation = cutLast2;
        } else {
          equation = cutLast;
        }
        if(last == "."){
          dot = 0;
        }
        if(last == "^"){
          setexp = 0;
        }
        break;

      case "C":
        equation = "0";
        break;

      case "MR":
      case "MS":
      case "M+":
      case "M-":
      case "MC":
      case "=":
        if(["+", "-", "×", "÷", "^", "E", ".", "("].includes(last)  || last2 == "√("){
          equation = cutLast;
        }
        equation += "=";
        // result = evaluate equation
        // addHistory(equation, result);
        equation = "0";
        update(equation);
        setexp = 0;
        dot = 0;
        break;
      }
    if(!clear.includes(input) && input != "<-"){
      if(!(input == "^2" || input == "^") && input != "."){
        equation += input;
        if (["+", "-", "×", "÷", "(", ")"].includes(input)){
          setexp = 0;
        }
        if (["+", "-", "×", "÷", "(", "^"].includes(input)){
          dot = 0;
        }
      } else{
        if(setexp == 0 && (input == "^2" || input == "^")){
          setexp = 1;
          dot = 0;
          equation += input;
        } else if (input == "." && dot == 0){
          dot = 1;
          equation += input;
        }
      }
    }

    if(equation === ""){
      equation += "0";
    }
    update(equation);
  }
}
