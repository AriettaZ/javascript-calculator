// Author: Channing Jacobs
// Created: 7/4
// Edit: N/A
// Description: Adds a button that allows the
// user to switch calculator themes.

var state = 0;  // Current click state of heart icon

var footer_text = document.getElementById("secret");
footer_text.addEventListener("click", changeTheme);

var buttons = ["ms","mr","m+","m-","mc","(",")","squareroot","square","e","7","8","9","division","c","4","5","6","times","exponentiation","1","2","3","minus","percentage","0","dot","scientific","plus","equal"];

// Create styling in html to support hover color changes
var head = document.getElementsByTagName("head")[0];
var css = ".keyboard-item:hover {background-color: #5c1e19;} .keyboard-item {background-color: #db847d;}";
css = css + " #clear-button { border-top-color: #b87332; background-color: #db847d;} #clear-button:hover { background-color: #b87332;}"
var style = document.createElement("style");
style.appendChild(document.createTextNode(css));


function changeTheme() {
  // BLUE THEME
  state = (state + 1) % 2; // state is 0 or 1
  if (state == 0) {
    console.info("state is 0");
    // Remove body style
    document.body.removeAttribute("style")
    // // Remove keyboard_items styling
    var keyboard_items = document.getElementsByClassName("keyboard-item");
    for(button in buttons){
      document.getElementById(buttons[button]).removeAttribute("style");
    }
    // Remove memory styling
    var memory = document.getElementsByClassName("memory");
    console.info(memory[0]);
    memory[0].removeAttribute("style");
    // Remove history styling
    document.getElementsByClassName("history-section")[0].getElementsByTagName("p")[0].removeAttribute("style");
    document.getElementsByClassName("history-section")[0].removeAttribute("style");
    // Remove clear button styling
    document.getElementById("clear-button").removeAttribute("style");
    // Revert heart color
    document.getElementsByClassName("fa-heart")[0].removeAttribute("style");
    // Remove styling from header (for hover)
    head.removeChild(style);
  } else {
    // RED THEME
    console.info("state is 1");
    // Get body background-color
    document.body.style.backgroundColor = "#5c1e19";
    // Get history background color
    document.getElementsByClassName("history-section")[0].getElementsByTagName("p")[0].style.backgroundColor = "#b87332";

    // History Section border color
    document.getElementsByClassName("history-section")[0].style.borderColor = "#b87332";
    // Get clear button background color (and hover)
    //document.getElementById("clear-button").style.backgroundColor = "#db847d";
    // Clear button border top color
    //document.getElementById("clear-button").style.borderTopColor = "#b87332";
    // Get memory class background
    var memory = document.getElementsByClassName("memory");
    memory[0].style.background = "#db847d";
    // Get keyboard item border color and background
    var keyboard_items = document.getElementsByClassName("keyboard-item");
    for(button in buttons){
      //document.getElementById(buttons[button]).style.background = "#db847d";
      document.getElementById(buttons[button]).style.borderColor = "#5c1e19";
    }
    // Change heart color
    document.getElementsByClassName("fa-heart")[0].style.color = "blue";

    // Append styling to allow for hover
    head.appendChild(style);
  }
}
