// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Using buttons and keyboard to enter the equation.

// Set up the keyboard and buttons to get the equation for calculation.
var equation = '0';
update(equation, 'screen');
var CHAR_CODE = [16, 43,45,56,42,47,40,41,69,13,61,8,46,37,94, 8730];
document.addEventListener('keypress', keyboardInput, false);
var buttons = document.getElementsByTagName('button');
for (i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', handler);
}

function handler(){
  printToScreen(this.name);
}

// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Get valid keyboard inputs the equation to calculate.
// Require: N/A
// Update: equation
// Return: N/A
function keyboardInput(event) {
  var charCode = event.charCode;
  var input;
  if (charCode != 0) {
    if (!((charCode <= 57) && (charCode >= 48)) && !CHAR_CODE.includes(charCode)) {
      event.preventDefault();
    }else {
      if((charCode <= 57) && (charCode >= 48)){
        input = String.fromCharCode(charCode);
      } else {
          // if(event.shiftKey){
          //   update("here", "history");
          //   update(event.keyCode, "history");
          // }
          switch(charCode){
            case 43:
              input = "+";
              break;
            case 45:
              input = "-";
              break;
            case 42:
              input = "*";
              break;
            case 47:
              input = "/";
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
              input = "√";
              break;
          }
        }
        printToScreen(input);
      }
    }
}

var all = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', '=', 'C', '^', '^2', 'E', '(', ')', '%', '√', '.', 'MR', 'MS', 'M+', 'M-', 'MC', '<-'];
var operation = ['+', '-', '×', '÷', '^', 'E', '.', '(', '√'];
var endOp = ['^2', ')', '%'];
var clear = ['=', 'C', 'MR', 'MS', 'M+', 'M-', 'MC'];
var other = ['<-'];
var setexp = 0;

// Author: Gail Chen
// Created: 7/1
// Edit: N/A
// Description: Adjust the inputs to an acceptable equation then print the result of the calculation.
// Require: N/A
// Update: equation
// Return: N/A
function printToScreen(input){
  // var input = this.name;
  var last = equation.slice(-1);
  var oneBefore = equation.charAt(equation.length - 2);
  var cutLast = equation.substring(0, equation.length - 1);
  var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var nochange = ((equation == '0') && [')', '<-'].includes(input)) && (numbers.include[last] && input == '.');

  if (!((equation == '0') && [')', '<-'].includes(input))){
    if (!nochange){
      id = '';
      switch(input){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if(((last == '0') && !numbers.includes(oneBefore)) || endOp.includes(last)){
            equation = cutLast;
          }
          break;

        case '+':
        case '×':
        case '÷':
          if(['+', '-', '×', '÷', '^', 'E', '.', '(', '√'].includes(last)){
            equation = cutLast;
          }
          break;

        case '-':
          if(['+', '-', '×', '÷', '^', '.'].includes(last)){
            equation = cutLast;
          }
          break;

        case '%':
          if(['+', '-', '×', '÷', '^', 'E', '(', '.'].includes(last)){
            equation = cutLast;
          }
          break;

        case '^':
        case '^2':
          if(['+', '-', '×', '÷', 'E', '(', '.', '%'].includes(last)){
            equation = cutLast;
          }
          break;

        case '.': // '+', '-', '×', '÷', '^', 'E'
          if(['.', '%', '√', ')'].includes(last)){
            equation = cutLast;
          }
          break;

        case '√', '(':
          if(['.'].includes(last)){
            equation = cutLast;
          }
          break;

        case ')':
          if(['+', '-', '×', '÷', '^', 'E', '.', '(', '√'].includes(last)){
            equation = cutLast;
          }
          break;

        case 'E':
          if (!numbers.includes(last)){
            equation = cutLast;
          }
          break;

        case '<-':
          equation = cutLast;
          break;

        case 'C':
          equation = '0';
          break;

        case 'MR':
        case 'MS':
        case 'M+':
        case 'M-':
        case 'MC':
        case '=':
          if(['+', '-', '×', '÷', '^', 'E', '.', '(', '√'].includes(last)){
            equation = cutLast;
          }
          equation += '=';
          //evaluate equation
          update(equation, 'history');
          equation = '0';
          update(equation, 'screen');
          setexp = 0;
          break;
        }
      if(!clear.includes(input) && input != '<-'){
        if(!(input == '^2' || input == '^')){
          equation += input;
          if (['+', '-', '*', '÷'].includes(input)){
            setexp = 0;
          }
        } else{
          if(setexp == 0){
            setexp = 1;
            equation += input;
          }
        }
      }

      if(equation === ''){
        equation += '0';
      }
      update(equation, 'screen');
    }
  }
}

function update(equation, id){
  if(id == 'screen'){
    document.getElementById(id).innerHTML = equation;
  } else if (id == 'history') {
    document.getElementById(id).innerHTML += equation + '<br/>';
  }
}
