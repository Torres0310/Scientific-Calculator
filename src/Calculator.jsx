import React, { useState } from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  
  const handleClick = (value) => {
    setInput((prev) => {
      if (/[+\-*/.]/.test(value) && /[+\-*/.]$/.test(prev)) {
        return prev; 
      }
      return prev + value;
    });
  };


  const handleClear = () => setInput("");


  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

 
  const handleCalculate = () => {
    try {
      let expression = input
        .replace(/π/g, Math.PI)
        .replace(/√/g, "sqrt")
        .replace(/\^/g, "**");

      const result = evaluate(expression);
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      {/* Display Screen */}
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>

      {/* Buttons Grid */}
      <div className="buttons">
        {/* Top Row: Clear and Delete */}
        <button className="clear" onClick={handleClear}>C</button>
        <button className="delete" onClick={handleDelete}>DEL</button>
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>

        {/* Scientific Functions */}
        {["sin(", "cos(", "tan(", "log("].map((func) => (
          <button key={func} onClick={() => handleClick(func)}>{func.replace("(", "")}</button>
        ))}

        {/* Number Pad */}
        {["7", "8", "9", "/"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {["4", "5", "6", "*"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {["1", "2", "3", "-"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {["0", ".", "+", "="].map((btn) => (
          <button
            key={btn}
            className={btn === "=" ? "equal" : ""}
            onClick={() => (btn === "=" ? handleCalculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}

        {/* Special Functions */}
        {["π", "√", "^"].map((func) => (
          <button key={func} onClick={() => handleClick(func)}>{func}</button>
        ))}
      </div>

      {/* History Section */}
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
