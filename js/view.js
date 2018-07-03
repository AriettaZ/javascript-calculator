//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: update the equation field with given equation
//Update: #equation-container
//Return: N/A
function update(equation){
	var equationField = document.getElementById("equation-container"); //Which equation
	equationField.innerHTML=equation;
}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Add a history record (equation + result) to the history-container
//Update: #history-container
//Return: N/A
function addHistory(equation, result){
	var historyContainer = document.getElementById("history-container");

	//If there is no record in the history container, then let clear button appear
	var currentLines = historyContainer.getElementsByClassName("history-line");
	if(currentLines.length==0){
		changeClearButtonOpacity(1);
	}

	//Create a record
	var line = document.createElement("div");
	line.setAttribute("class","history-line");
	var eqContainer = document.createElement("p");
	eqContainer.innerHTML = equation+" = "+result;
	eqContainer.setAttribute("class","eq-container")
	var removeButton  = document.createElement("button");
	removeButton.setAttribute("class", "remove-button");
	removeButton.innerHTML = "Remove History";

	//Append the record to the historyContainer
	line.appendChild(eqContainer);
	line.appendChild(removeButton);
	historyContainer.appendChild(line);

	//Setup remove button listener
	removeButton.addEventListener("click",removeHistory);
}

//Author: Mike
//Created: 7/1
//Edit:N/A
//Description: Remove a history record through event from history-container
//Update: #history-container
//Return: N/A
function removeHistory(event){
	var line = event.target.parentNode;
	var historyContainer = line.parentNode;
	historyContainer.removeChild(line);
	var currentLines = historyContainer.getElementsByClassName("history-line");
	if(currentLines.length==0){
		changeClearButtonOpacity(0);
	}
}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Remove all history records in the history-container
//Update: #history-container
//Return: N/A
function clearHistory(){
	var historyContainer = document.getElementById("history-container");
	var children = historyContainer.getElementsByClassName("history-line");
	while(children.length>0){
		historyContainer.removeChild(children[0]);
	}
	changeClearButtonOpacity(0);
}

//Author: Mike
//Created: 7/1
//Edit: N/A
//Description: Change clear button opacity
//Update: #clear-button.opacity
//Return: N/A
function changeClearButtonOpacity(opacity){
	var clearButton = document.getElementById("clear-button");
	clearButton.style.opacity = opacity;
}
