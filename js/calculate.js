function calculate(num1,num2,operator){
  var result;
  try {
      switch(operator) {
        case "division":
            result=num1/num2;
            break;
        case "times":
            result=num1*num2;
            break;
        case "exponentiation":
            result=Math.pow(num1, num2);
            break;
        case "minus":
            result=num1-num2;
            break;
        case "reminder":
            result=num1%num2;
            break;
        case "dot":
            result=num1+num2*0.1;
            break;
        case "scientific":
            result=num1*Math.pow(10, num2);
            break;
        case "plus":
            result=num1+num2;
            break;
        default:
          throw "The operator does not exist!";

      }
    }
    catch(err) {
      alert(err);
    }
    return result;
}
