/*
Author: Gail Chen
Created: 7/4
Edit: N/A
Description: Test functions in inputListener.js
Test plan for function invalidToAdd():
Return false if: (equation doesn't change after printToScreen)
1. input is in ["+", "*", "/", "=", "C", "^", "^2", "E", ")", "%", ".", "<-"] and equation is ""
2. input is "." and (equation is not ended with a number from 0 to 9 and dotExists is true)
3. input is a number from 0 to 9, and equation is ended with %, ) or e
4. input is in ["+", "*", "/", "^", "E", ".", "^2", ")", "%", "="], and equation is ended with "("
5. input is in [")", "%"], and equation is ended with a character in ["(", "-", "+", "*", "/", "^", "E", "."]
6. input is in ["E", "^", "^2"], and equation is ended with "%"
7. input is in ["^", "^2"], and the equation is ended with an character in ["-", "+", "*", "/", E", "."] where "%" is before this character
8. input is in ["+", "*", "/", "^", "E", ".", "^2", ")", "%"], and equation is "-" or "(-"
9. input is "=", and (equation is "" or equation ends with a character in ["(", "-", "+", "*", "/", "^", "E", "."])
10. document.getElementById("equation-container").getAttribute("placeholder") == 0

Test plan for printToScreen: checks equation
Place holder == 0:
1. input is a number from 0 to 9:
  If a nonzero number starts with 0, remove the leading 0 and add input to 0.
  If the equation is ended with %, ) or e, no change to equation.
  input == "5"
  - initial equation == "0", final equation == "5"
  - initial equation == "5+0", final equation == "5+5"
  - initial equation == "10.0", final equation == "10.05"
  - initial equation == "10.5%", final equation == "10.5%"
  - initial equation == "10.5e", final equation == "10.5e"
  - initial equation == "(10.5)", final equation == "(10.5)"
  input == "0":
  - initial equation == "0", final equation == "0"
  - initial equation == "5*0", final equation == "10*5"
  - initial equation == "0.0", final equation == "0.00"
  - initial equation == "10.5%", final equation == "10.5%"
  - initial equation == "10.5e", final equation == "10.5e"
  - initial equation == "(10.5)", final equation == "(10.5)"

2. input is "e":
  If the last character in the equation is a decimal point, repace the decimal point with the input and reset the dotExists flag.
  - initial equation == "10", final equation == "10e"
  - initial equation == "10E", final equation == "10Ee"
  - initial equation == "2.3", final equation == "2.3e", dotExists == true
  - initial equation == "2.", final equation == "2e", dotExists == false

3. input is in ["+", "*", "/"]:
  If the equation is "", "-", "(-", or ends with "(", the equation doesn't change.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  input is "+":
  - initial equation == "", final equation == ""
  - initial equation == "10.4-", final equation == "10.4+"
  - initial equation == "10.4+", final equation == "10.4+"
  - initial equation == "10.4*", final equation == "10.4+"
  - initial equation == "10.4", final equation == "10.4+"
  input is "*":
  - initial equation == "10(", final equation == "10("
  - initial equation == "-", final equation == "-"
  - initial equation == "10.4/", final equation == "10.4*"
  - initial equation == "10.4^", final equation == "10.4*"
  - initial equation == "10.4", final equation == "10.4*"
  input is "/":
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10.4E", final equation == "10.4/"
  - initial equation == "104.", final equation == "104/"
  - initial equation == "10.4", final equation == "10.4/"

4. input == "-":
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  - initial equation == "", final equation == "-"
  - initial equation == "(", final equation == "(-"
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10.4^", final equation == "10.4-"
  - initial equation == "10.4E", final equation == "10.4-"
  - initial equation == "10.4", final equation == "10.4-"

5. input is in ["^", "^2"]:
  If the equation doesn't change if the equation is "", "-", "(-", or ends with "(" or "%",
    or is ended with an character in ["-", "+", "*", "/", E", "."] where "%" is before this character.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.
  input == "^":
  - initial equation == "", final equation == ""
  - initial equation == "(-", final equation == "(-"
  - initial equation == "10%", final equation == "10%"
  - initial equation == "10%-", final equation == "10%-"
  - initial equation == "10%^", final equation == "10%^"
  - initial equation == "10.4^2", final equation == "10.4^2^"
  - initial equation == "10.4-", final equation == "10.4^"
  - initial equation == "10.4*", final equation == "10.4^"
  - initial equation == "10.4/", final equation == "10.4^"
  input == "^2":
  - initial equation == "-", final equation == "-"
  - initial equation == "10(", final equation == "10("
  - initial equation == "10%^", final equation == "10%^"
  - initial equation == "10.4^2", final equation == "10.4^2^2"
  - initial equation == "10.4E", final equation == "10.4^2"
  - initial equation == "104.", final equation == "104^2"

6. input == "%":
  The equation doesn't change if the equation is "", "-", "(-", or ends with "(",
    or ends with a character in ["(", "-", "+", "*", "/", "^", "E", ". "].
  - initial equation == "", final equation == ""
  - initial equation == "10(", final equation == "10("
  - initial equation == "10.4-", final equation == "10.4-"
  - initial equation == "10.4^", final equation == "10.4^"
  - initial equation == "10.4", final equation == "10.4%"

7. input == "E":
  If the equation is "", "-", "(-", or ends with "(", the equation doesn't change.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-", "%"], replace thie character with the input.
  - initial equation == "", final equation == ""
  - initial equation == "10(", final equation == "10("
  - initial equation == "10.4-", final equation == "10.4E"
  - initial equation == "10.4*", final equation == "10.4E"
  - initial equation == "10.4", final equation == "10.4E"
  - initial equation == "10.4%", final equation == "10.4%"

8. input == ".":
  If the equation is "", "-", "(-", or ends with "(", the equation doesn't change.
  If the quation is end with a character in ["+", "*", "/", "^", "E", ".", "-"], replace thie character with the input.

  - initial equation == "", final equation == ""

9. input == "√(":
  - initial equation == "", final equation == "√("

10. input == "(":

  - initial equation == "", final equation == "("

11. input == ")":
  - initial equation == "", final equation == ""
  - initial equation == "√(", final equation == "√("

12. input == "<-":
  - initial equation == "", final equation == ""

13. input == "C":
  - initial equation == "", final equation == ""

14. input == "=":
  - initial equation == "", final equation == ""

*/
