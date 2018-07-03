

katex.render("\\sqrt{x}", squareroot);
katex.render("x^2", square);
katex.render("\\div", division);
katex.render("\\times", times);
katex.render("x^y", exponentiation);
katex.render("-", minus);
katex.render("+", plus);
katex.render("=", equal);
katex.render("\\pm",reverse)

var clearBtn = document.getElementById('clear-button');
clearBtn.addEventListener("click",clearHistory,false);

//clearBtn.addEventListener('click', function(){
//while (this.nextElementSibling.firstChild) {
//    this.nextElementSibling.removeChild(this.nextElementSibling.firstChild);
//}
//}, false);

//
//var removeBtn = document.getElementsByClassName('remove-button');
//for (var i = 0; i < removeBtn.length; i++) {
//removeBtn[i].addEventListener('click', function(){
//this.parentNode.parentNode.removeChild(this.parentNode);
//}, false);
//};
//

var backBtn = document.getElementsByClassName('fa-backspace');
backBtn[0].addEventListener('click', function(){
var equation = document.getElementById("equation-container");
if (equation.value != undefined){
    equation.value= equation.value.substring(0, equation.value.length - 1);
    if (equation.value==''){
        equation.value=0;
    }
}
}, false); 
