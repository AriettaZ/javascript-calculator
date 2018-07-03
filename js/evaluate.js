// Author: Channing Jacobs
// Created: 7/3/18
// Edit: N/A
// Description: Evaluates a well-formatted input string. Returning
// a single number. Updates the string == "".
function evaluate() {
  var equation = ["(",1,")"]
  return expression(equation);

  // Expression consists of [term +|- term] or just [term]
  function expression(equation) {
    // Get the first term
    var result = term(equation);
    // Find, remove, and use the operator with the second term
    while(equation[0] === "+" || equation[0] === "-"){
      if (equation[0] === "+") {
        equation.shift();  // remove operator
        result += term(equation);  // use operator
      } else if (equation[0] === "-") {
        equation.shift();  // remove operator
        result -= term(equation);
      }
    }
    return result;
  }

  // Term consists of [factor *|/ factor] or [factor]
  function term(equation) {
    // Get first factor
    var result = factor(equation);
    // Find, remove, and use the operator with the second factor
    while (equation[0] === "*" || equation === "/") {
      if (equation[0] === "*") {
        equation.shift();  // remove operator
        result *= factor(equation);  // use operator
      } else if (equation[0] === "/") {
        equation.shift();  // remove operator
        result /= factor(equation); // use operator
      }
    }
    return result;
  }

  // Factor consists of [val^val] or [val]
  function factor(equation) {
    // Get first val
    var result = val(equation);
    // Find, remove, and use the operator with the second val
    while (equation[0] === "^") {
      equation.shift();  // remove operator
      result ** val(equation);  // use operator
    }
    return result;
  }


    // Val consists of [num] or [(expression)]
    function val(equation) {
      var result = 0;
      if (equation[0] === "(") {
        equation.shift();
        result = expression(equation);
        equation.shift();
      } else if (typeof(equation[0]) == typeof(1)){
        var result = equation[0];
        equation.shift();
      }
      // unshift
      return result;
    }
}

console.info(evaluate())
