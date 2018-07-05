# Project 5 - JavaScript Calculator
### 1. [Overview](#overview)
### 2. [User Manual](#user-manual)
### 3. [Team](#team)
### 4. [Individual Contributions](#individual-contributions)
  * **[Development](#development)**
  * **[Testing](#testing)**
  * **[Meetings](#meetings)**

***

### Overview

***

### User Manual
Open the ¡Calculator by openning index.html in the Firefox browser (Suggest browser: Safari).

Or, open browser and enter the following URL: https://i-calculator.herokuapp.com/

####Input methods:
1. Button (mouse)
2. Keyboard

####Functions
1. Arithmetic Operations

	| operation|Button|Keyboard|
	| ------------- |-------------|
	| Addition|+|<kbd>+</kbd>|
	| Subtraction|-|<kbd>-</kbd>|
	| Multiplication|×|<kbd>*</kbd>|
	| Division|÷|<kbd>/</kbd>|
	| Exponential|x<sup>y</sup>|<kbd>^</kbd>|
	| Square Root|√x|<kbd>alt</kbd>+<kbd>v</kbd>|
	| Parenthesis|( or )|<kbd>(</kbd> or <kbd>)</kbd>|
2. Shortcuts

	| Shortcut|Button|Keyboard|
	| ------------- |-------------|
	| Scientific notation|E|<kbd>E</kbd>|
	| Euler's number|e|<kbd>e</kbd>|
	| Square|x<sup>2</sup>|<kbd>N/A</kbd>|
	| Percentage|%|<kbd>%</kbd>|
3. Memory

	| Memory Operation|Button|Keyboard|
	| ------------- |-------------|
	| Memory Save|MS|<kbd>N/A</kbd>|
	| Memory Read|MR|<kbd>N/A</kbd>|
	| Memory Plus|M+|<kbd>N/A</kbd>|
	| Memory Minus|M-|<kbd>N/A</kbd>|
	| Memory Clear|MC|<kbd>N/A</kbd>|
	
	Ms/M+/M- will evaluate current equation and then update memory.
4. History

	4.1 Automatic history recording
	
	4.2 Single history removal
	
	4.3 All history removal
5. Display and Illustration

	5.1 Equation display
	
	5.2 Current memory display
	
	5.3 MS/MR/M+/M-/MC hover text illustration
	
	5.4 MS/MR/M+/M-/MC hover consequence(equation) illustration
	
	5.5 Window-size auto-adjust
6. Wrong Input Prevention

	6.1 Keyboard prevention: Keys not specified above are all rejected.
	
	6.2 Entering prevention: e.g. <kbd>^</kbd> is rejected right after <kbd>(</kbd>
	
	6.3 Previous entering replacement: e.g. enter <kbd>+</kbd> right after <kbd>-</kbd> will replace <kbd>-</kbd>
	
	6.4 MS/M+/M- evaluation error handling
	
7. Continuous Operation

	6.1 Result reuse: after evaluation, previous result is reused if <b>operator</b> is entered immediately.
	
	6.2 Result dismiss: after evaluation, previous result is dismissed if <b>number</b> is entered immediately.


####Known error with Different Browsers
1. Firefox (Keycode Conflict)

	1.1 Keyboard left-arrow(←) will append Percentage(%) to the end of the equation
	
	1.2 Keyboard down-array(↓) will append left parenthesis('(') to the end of equation
2. Chrome
	
	2.1 Keyboard delete(⌫) does not work
3. Safari (no error detected so far)


***

### Team

| Role|Team Member|
| ------------- |-------------|
| Overall Project Manager|  Ariel Zhu |
|Coding Manager|Gail Chen|
|Testing Manager|Mike Lin|
|Documentation Manager| Channing Jacobs|

*Contact Us: osu.magic.team@gmail.com*

***

### Individual Contributions

### Contributions

#### Development
Mike:

Channing:


Gail:


Ariel:


#### Testing
##### Test plans can be found under test folder
##### Unit Testing is implemented on single methods:



##### Integration testing


#### Meetings

* June 26th
  * Group came up with the overall algorithm and structure together
  * Group assigned tasks and set timeline
* July 3rd
  *
  *
* July 4th
  *
  *
