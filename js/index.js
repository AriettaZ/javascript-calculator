// Author: Ariel Zhu
// Created: 7/3/18
// Edit: N/A
// Description: set up calculator home page

katex.render("\\sqrt{x}", squareroot);
katex.render("x^2", square);
katex.render("\\div", division);
katex.render("\\times", times);
katex.render("x^y", exponentiation);
katex.render("-", minus);
katex.render("+", plus);
katex.render("=", equal);

//Setup clear button listener
var clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener("click",clearHistory,false);