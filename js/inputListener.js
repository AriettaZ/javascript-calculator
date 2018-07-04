// Author: Gail Chen
// Created: 7/1
// Edit: Gail 7/2 update corresponding to design of buttons in index.html
// Description: Using buttons and keyboard to enter the equation.

var equation = "";
var CHAR_CODE = [43, 45, 56, 42, 47, 40, 41, 69, 13, 61, 8, 46, 37, 94, 8730];

// Author: Gail Chen
// Created: 7/2
// Edit: N/A
// Description: Get valid inputs from keyboard or buttons.
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function getInput() {
	update(equation);
	// handleMemory();

	var textArea = document.getElementById("equation-container");
	document.addEventListener("keypress", keyboardInput, true);

	textArea.addEventListener("focusin", function(event) {
		document.removeEventListener("keypress", keyboardInput, true);
		textArea.addEventListener("keyup", inputKeyHandling, true);
		textArea.addEventListener("keydown", enterEvaluateHandling, true);
	});

	textArea.addEventListener("focusout", function(event) {
		textArea.removeEventListener("keydown", enterEvaluateHandling, true);
		textArea.removeEventListener("keyup", inputKeyHandling, true);
		document.addEventListener("keypress", keyboardInput, true);
	});

	// document.addEventListener("keypress", keyboardInput);
  var buttons = document.getElementsByClassName("keyboard-item");
  var backSpace = document.getElementsByClassName('fa-backspace');
  backSpace[0].addEventListener("click", handleInput);
  for (i = 5; i < buttons.length; i++){
    buttons[i].addEventListener("click", handleInput);
  }
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: Use keyboard "enter" in the equation-container to click "=" button
// Require: N/A
// Update: equation, #current-input, #history-container
// Return: N/A
function enterEvaluateHandling(event) {
	if(event.keyCode == 13) {
		document.getElementById("equal").click();
	}
}

// Author: Mike
// Created: 7/3
// Edit: N/A
// Description: Restrict invalid input in the input field
// Require: N/A
// Update: equation, #current-input
// Return: N/A
function inputKeyHandling(event) {
	var textArea = document.getElementById("equation-container");
	var inputIndex = textArea.selectionStart - 1;
	if(inputIndex < 0) {
		inputIndex = 0;
	}
	if(!/\d|[\+\-\*\/\^\%\(\)\.E]/.test(textArea.value[inputIndex])) {
		textArea.value = textArea.value.slice(0, inputIndex) + textArea.value.slice(inputIndex + 1, textArea.value.length);
		textArea.selectionStart = inputIndex;
		textArea.selectionEnd = inputIndex;
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
              input = "*";
              document.getElementById("times").click();
              break;
            case 47:
              input = "/";
              document.getElementById("division").click();
              break;
            case 40:
              input = "(";
              document.getElementById("(").click();
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
              event.preventDefault();
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
      }
    }
}

var all = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", "C", "^", "^2", "E", "(", ")", "%", "√(", ".", "MR", "MS", "M+", "M-", "MC", "<-"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operation = ["+", "-", "*", "/", "^", "E", ".", "(", "√("];
var startOp = ["(", "√(", "-"];
var midOp = ["+", "*", "/", "^", "E", "."];
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
//var equation = document.getElementById("equation-container").value;
  var last = equation.slice(-1);
  var last2 = equation.slice(-2);
  var twoBefore = equation.charAt(equation.length - 2);
  var threeBefore = equation.charAt(equation.length - 3);
  var cutLast = equation.substring(0, equation.length - 1);
  var cutLast2 = equation.substring(0, equation.length - 2);
	// Not acceptable inputs: start the equation with midOp or endOp
	//
//nochange is false, if the equation can be evaluated
  var nochange = ((equation == "" || equation == "0") && [")"].includes(input)) ||
									(equation == "" && (midOp.includes(input) || endOp.includes(input))) ||
                  (operation.includes(last) && input == ".") ||
									(numbers.includes(input) && endOp.includes(last)) ||
                  (last == "(" && (endOp.includes(input) || midOp.includes(input))) ||
                  (input == "%" && (startOp.includes(last) || midOp.includes(last))) ||
                  ((input == "^" || input == "^2") && last == "%") ||
                  ((endOp.includes(input) || midOp.includes(input)) && last == "-" && twoBefore == "") ||
									(input == "=" && (equation == "" || operation.includes(last) || last2 == "√("));
	if(document.getElementById("equation-container").getAttribute("placeholder")!=0){
		nochange=false;
	}

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
      case "9": // || endOp.includes(last)
        if(last == "0" && !numbers.includes(twoBefore) && twoBefore != "."){
          equation = cutLast;
        }
        clearPlaceholder();
        break;

			case "e":
			clearPlaceholder()
				if(last == "."){
					equation = cutLast;
				}
				break;

      case "+":
      case "*":
      case "/":
      handlePlaceholder()
        var last = equation.slice(-1);
        if(["+", "-", "*", "/", "^", "E", "."].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "-":
      handlePlaceholder()
        var last = equation.slice(-1);
        if(["+", "-", "*", "/", "^", "."].includes(last) || (last == "0" && twoBefore == "")){
          equation = cutLast;
        }
        break;

      case "%":
      handlePlaceholder()
        var last = equation.slice(-1);

        if(["+", "-", "*", "/", "^", "E", "(", ".", "%"].includes(last)){
          equation = cutLast;
        }
        break;

      case "^":
      case "^2":
      handlePlaceholder()
        var last = equation.slice(-1);
        if(["+", "-", "*", "/", "E", "(", "."].includes(last)){
          equation = cutLast;
        }
        break;

      case ".":
      handlePlaceholder()
        var last = equation.slice(-1);
  var last2 = equation.slice(-2);
        if(["%", ")"].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "√(":
      clearPlaceholder();
      var last = equation.slice(-1);
        if(["","."].includes(last)){
          equation = cutLast;
        }
        break;

      case "(":
      clearPlaceholder()
        if(["."].includes(last)){
          equation = cutLast;
        }
        break;

      case ")":
      clearPlaceholder()
        if(["+", "*", "/", "^", "E", "."].includes(last) || last2 == "√("){
          equation = cutLast;
        }
        break;

      case "E":
      	handlePlaceholder()
      	  var last = equation.slice(-1);
        if (!numbers.includes(last)){
          equation = cutLast;
        }
        break;

      case "<-":
      	handlePlaceholder();
      	  var last = equation.slice(-1);
  var cutLast = equation.substring(0, equation.length - 1);
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
      clearPlaceholder()
        equation = "";
				dot = 0;
				setexp = 0;
        break;

      case "MR":
      case "MS":
      case "M+":
      case "M-":
      case "MC":
      case "=":
      clearPlaceholder()
        if(["+", "-", "*", "/", "^", "E", ".", "("].includes(last)  || last2 == "√("){
          equation = cutLast;
        }
        result = normalize(evaluate());
        updatePlaceholder(result);
        addHistory(equation, result);
        equation = "";
        setexp = 0;
        dot = 0;
        break;
      }
    if(!clear.includes(input) && input != "<-"){
      if(!(input == "^2" || input == "^") && input != "."){
        equation += input;
        if (["+", "-", "*", "/", "(", ")"].includes(input)){
          setexp = 0;
        }
        if (["+", "-", "*", "/", "(", "^"].includes(input)){
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


		// if(equation === "") {
		// 	equation += "0";
		// }
		update(equation);
		if(equation !== "") {
			disableMemory();
		} else {
			handleMemory();
		}
	}
}


function handlePlaceholder(){
	var inputfield = document.getElementById("equation-container");
	var placeholder = inputfield.getAttribute("placeholder");
	if(placeholder!=0){
		equation=placeholder.toString();
		inputfield.setAttribute("placeholder",0);
		if(parseFloat(equation)!=parseInt(equation)){
			dot=1;
		}
		update(equation);
	}
}

function clearPlaceholder(){
	var inputfield = document.getElementById("equation-container");
	var placeholder = inputfield.getAttribute("placeholder");
	inputfield.setAttribute("placeholder",0);
}
