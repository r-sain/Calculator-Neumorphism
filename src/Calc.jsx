import { useEffect, useState } from "react";
import "./calc.css";
import deleteIcon from "./assets/backspace.png";

function Calc() {
  var tempTotal = "";
  const [total, setTotal] = useState(tempTotal);
  const [fontSize, setFontSize] = useState("3");
  // **************getting what is clicked********
  const handleClick = (event) => {
    const prevChar = total.charAt(total.length - 1);
    const clickedElement = event.target;
    var content = clickedElement.textContent || clickedElement.innerText;
    if (content === "X") {
      content = "*";
    }
    if (
      (total.length < 1 && content === ".") ||
      (content === "." && isOperator(prevChar))
    ) {
      content = "0.";
    }
    if (total.length === 0 && isOperator(content) === true) {
      content = "";
    }
    // const prevChar = total.charAt(total.length - 1);
    if (
      (isOperator(content) && isOperator(prevChar)) ||
      (isDecimal(content) && isDecimal(prevChar)) ||
      (isDecimal(prevChar) && isOperator(content))
    ) {
      setTotal((tempTotal) => tempTotal.slice(0, -1) + content);
    } else if (content === "." && total.charAt(total.length - 2) === ".") {
      setTotal((tempTotal) => tempTotal.slice(0, -2) + content);
    } else {
      setTotal((tempTotal) => tempTotal + content);
    }
  };

  // Function to check if a character is an operator
  const isOperator = (char) => {
    return char === "+" || char === "-" || char === "*" || char === "/";
  };
  const isDecimal = (char) => {
    return char === ".";
  };
  // **************getting what is clicked********

  // **************resetting total********
  const resetTotal = () => {
    setTotal("");
  };
  // **************resetting total********

  // **************controlling display font size dynamically********

  useEffect(() => {
    if (total.length <= 14) {
      setFontSize(3);
    }
    if (total.length >= 15 && total.length <= 21) {
      setFontSize(2);
    }
    if (total.length >= 22 && total.length <= 45) {
      setFontSize(1);
    }
    if (total.length > 45) {
      setFontSize(0.5);
    }
  }, [total]);

  // **************controlling display font size dynamically********

  //************button press animation */
  const [activeButtonId, setActiveButtonId] = useState(null);

  const handleMouseDown = (event) => {
    const buttonId = event.target.id;
    setActiveButtonId(buttonId);
  };

  const handleMouseUp = () => {
    setActiveButtonId(null);
  };
  //************button press animation */

  // **********handing delete**********
  const handleDelete = () => {
    setTotal((tempTotal) => tempTotal.slice(0, -1));
  };
  // **********handing delete**********

  // **************evaluating expression************
  const evalExp = () => {
    if (
      total.length > 0 ||
      total.charAt(total.length - 1) !== "+" ||
      total.charAt(total.length - 1) !== "-" ||
      total.charAt(total.length - 1) !== "/" ||
      total.charAt(total.length - 1) !== "*"
    ) {
      if (total.startsWith("0") || isOperator(total[total.indexOf("0") - 1])) {
        alert("Leading zeros not allowed");
      }
      var result = eval(total);
      result = parseFloat(result.toFixed(3));
      tempTotal = result;
      setTotal(JSON.stringify(result));
    }
  };

  return (
    <div id="calc">
      <div className="display" style={{ fontSize: `${fontSize}em` }}>
        {total}
      </div>
      <div className="buttons">
        <div className="btn-grid">
          <div
            className={`btnDiv div1 ${activeButtonId === "C" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              onClick={resetTotal}
              className={`neumorphRed ${activeButtonId === "C" ? "press" : ""}`}
              id="C"
            >
              C
            </span>
          </div>
          <div
            className={`btnDiv div4 ${activeButtonId === "+" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorphGrey ${
                activeButtonId === "+" ? "press" : ""
              }`}
              onClick={handleClick}
              id="+"
            >
              +
            </span>
          </div>

          <div
            className={`btnDiv div2 ${activeButtonId === "X" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorphGrey ${
                activeButtonId === "X" ? "press" : ""
              }`}
              onClick={handleClick}
              id="X"
            >
              X
            </span>
          </div>
          <div
            className={`btnDiv div3 ${activeButtonId === "-" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorphGrey ${
                activeButtonId === "-" ? "press" : ""
              }`}
              onClick={handleClick}
              id="-"
            >
              -
            </span>
          </div>
          <div
            className={`btnDiv div4 ${activeButtonId === "+" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorphGrey ${
                activeButtonId === "+" ? "press" : ""
              }`}
              onClick={handleClick}
              id="+"
            >
              +
            </span>
          </div>
          <div
            className={`btnDiv div5 ${activeButtonId === "/" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorphGrey ${
                activeButtonId === "/" ? "press" : ""
              }`}
              onClick={handleClick}
              id="/"
            >
              /
            </span>
          </div>
          <div
            className={`btnDiv div6 ${activeButtonId === "1" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "1" ? "numPress" : ""}`}
              onClick={handleClick}
              id="1"
            >
              1
            </span>
          </div>
          <div
            className={`btnDiv div7 ${activeButtonId === "2" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "2" ? "numPress" : ""}`}
              onClick={handleClick}
              id="2"
            >
              2
            </span>
          </div>
          <div
            className={`btnDiv div8 ${activeButtonId === "3" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "3" ? "numPress" : ""}`}
              onClick={handleClick}
              id="3"
            >
              3
            </span>
          </div>
          <div
            className={`btnDiv div9 ${activeButtonId === "4" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "4" ? "numPress" : ""}`}
              onClick={handleClick}
              id="4"
            >
              4
            </span>
          </div>
          <div
            className={`btnDiv div10 ${activeButtonId === "5" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "5" ? "numPress" : ""}`}
              onClick={handleClick}
              id="5"
            >
              5
            </span>
          </div>
          <div
            className={`btnDiv div11 ${activeButtonId === "6" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "6" ? "numPress" : ""}`}
              onClick={handleClick}
              id="6"
            >
              6
            </span>
          </div>
          <div
            className={`btnDiv div12 ${activeButtonId === "7" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "7" ? "numPress" : ""}`}
              onClick={handleClick}
              id="7"
            >
              7
            </span>
          </div>
          <div
            className={`btnDiv div13 ${activeButtonId === "8" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "8" ? "numPress" : ""}`}
              onClick={handleClick}
              id="8"
            >
              8
            </span>
          </div>
          <div
            className={`btnDiv div14 ${activeButtonId === "9" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "9" ? "numPress" : ""}`}
              onClick={handleClick}
              id="9"
            >
              9
            </span>
          </div>
          <div
            className={`btnDiv div15 ${activeButtonId === "0" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`neumorph ${activeButtonId === "0" ? "numPress" : ""}`}
              onClick={handleClick}
              id="0"
            >
              0
            </span>
          </div>
        </div>
        <div className="last-row">
          <div
            className={`equal ${activeButtonId === "=" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`last ${activeButtonId === "=" ? "press" : ""}`}
              onClick={() => {
                handleClick;
                evalExp();
              }}
              id="="
            >
              =
            </span>
          </div>
          <div
            className={`decimal ${activeButtonId === "." ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`last2 ${activeButtonId === "." ? "press" : ""}`}
              onClick={handleClick}
              id="."
            >
              .
            </span>
          </div>
          <div
            className={`delete ${activeButtonId === "delete" ? "active" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span
              className={`last3 ${activeButtonId === "delete" ? "press" : ""}`}
              onClick={handleDelete}
              id="delete"
            >
              <img src={deleteIcon} alt="delete" id="deleteImg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calc;
