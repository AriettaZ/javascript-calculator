// Author: Gail Chen
// Created: 7/1
// Edit: Gail 7/2 update corresponding to design of buttons in index.html
// Description: Using buttons and keyboard to enter the equation.

var equation = "0";
var CHAR_CODE = [16, 43, 45, 56, 42, 47, 40, 41, 69, 13, 61, 8, 46, 37, 94, 8730];

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Get valid inputs from keyboard or buttons.
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function getInput(){
  update(equation);
  handleMemory();
  document.addEventListener("keypress", keyboardInput, false);
  // var backsapce = document.getElementsById("keyboard-item");
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
  var charCode = event.which || event.keyCode;
  var input;
  if (charCode != 0) {
    if (!((charCode <= 57) && (charCode >= 48)) && !CHAR_CODE.includes(charCode)) {
      event.preventDefault();
    }else {
      if((charCode <= 57) && (charCode >= 48)){
        input = String.fromCharCode(charCode);
      } else {
          switch(charCode){
            case 43:
              input = "+";
              break;
            case 45:
              input = "-";
              break;
            case 42:
              input = "×";
              break;
            case 47:
              input = "÷";
              break;
            case 40:
              input = "(";
              break;
            case 41:
              input = ")";
              break;
            case 69:
              input = "E";
              break;
            case 13: //enter
            case 61:
              input = "=";
              break;
            case 8: // backspace
              input = "<-";
              break;
            case 46:
              input = ".";
              break;
            case 37:
              input = "%";
              break;
            case 94:
              input = "^";
              break;
            case 8730:
              input = "√(";
              break;
          }
        }
        printToScreen(input);
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
