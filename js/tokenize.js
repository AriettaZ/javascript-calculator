//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Take a string of equation, put each element (oprator/number) into an array and add necessary operators.
//				Catch parenthesis error.
//Update: N/A
//Return: An array of tokens
function tokenize(equation) {
	var parenthesis = 0;
	var tokens = new Array();
	for(var i = 0; i < equation.length; i++) {
		var str = equation[i];
		switch(true) {
			case /\d/.test(str):
				if(tokens[tokens.length - 1] == ")") {
					tokens.push("*")
					tokens.push(str);
				} else if(/\d.*/.test(tokens[tokens.length - 1])) {
					tokens[tokens.length - 1] += str;
				} else {
					tokens.push(str);
				}
				break;
			case /E/.test(str):
				tokens.push("*");
				tokens.push("10");
				tokens.push("^");
				break;
			case /%/.test(str):
				tokens.push("*");
				tokens.push("0.01");
				break;
			case /-/.test(str):
				if(equation[i - 1] == "(" && ((i + 1) < equation.length) && equation[i + 1] == ")") {
					tokens.push(str);
					tokens.push("1")
				} else if(equation[i - 1] == "(") {
					tokens.push("0");
					tokens.push(str)
				} else if(equation[i - 1] == "E") {
					tokens[tokens.length - 2] = "0.1";
				} else {
					tokens.push(str)
				}
				break;
			case /\./.test(str):
				if(/[+\-*\/\(E\^]/.test(equation[i - 1])) {
					tokens.push("0.");
				} else if(/\d.*/.test(tokens[tokens.length - 1])) {
					tokens[tokens.length - 1] += str;
				} else {
					tokens.push(str);
				}
				break;
			case /\(/.test(str):
				if(/\d/.test(equation[i - 1]) || tokens[tokens.length - 1] == ")") {
					tokens.push("*")
				}
				tokens.push(str);
				parenthesis+=1;
				break;
			case /s/.test(str):
				if(tokens[tokens.length - 1] == "%" || tokens[tokens.length - 1] == ")") {
					tokens.push("*")
				}
				tokens.push("sqrt");
				i = i + 3;
				break;
			case /\)/.test(str):
				parenthesis-=1;
				tokens.push(str);
				break;
			default:
				tokens.push(str);
				break;
		}
	}
	for(var i = 0; i < tokens.length; i++) {
		var parse2num = parseFloat(tokens[i]);
		if(!isNaN(parse2num)){
			tokens[i]=parse2num;
		}
//		document.write(tokens[i]);
//		document.write(typeof(tokens[i]) + "<br />");
	}
	if(parenthesis!=0){
		alert("Parenthesis error");
	}
	return tokens;
}