import React, { useState } from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Handle Button Click
  const handleClick = (value) => {
    setInput((prev) => {
      if (/[+\-*/.]/.test(value) && /[+\-*/.]$/.test(prev)) {
        return prev; // Prevent multiple consecutive operators
      }
      return prev + value;
    });
  };

  // Clear Input
  const handleClear = () => setInput("");

  // Delete Last Character
  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

  // Perform Calculation
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
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>

      <div className="buttons">
        {/* Top Row: Clear and Delete */}
        <button className="clear" onClick={handleClear}>C</button>
        <button className="delete" onClick={handleDelete}>DEL</button>
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>

        {/* Scientific Functions */}
        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("tan(")}>tan</button>
        <button onClick={() => handleClick("log(")}>log</button>

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
        <button onClick={() => handleClick("π")}>π</button>
        <button onClick={() => handleClick("√")}>√</button>
        <button onClick={() => handleClick("^")}>^</button>
      </div>

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
