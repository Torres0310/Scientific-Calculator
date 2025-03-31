import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Handle Button Click
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear Input
  const handleClear = () => {
    setInput("");
  };

  // Delete Last Character
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Perform Calculation
  const handleCalculate = () => {
    try {
      const result = evaluate(input);
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
        {["7", "8", "9", "/", "sin", "cos", "tan"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        {["4", "5", "6", "*", "log", "√", "^"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        {["1", "2", "3", "-", "(", ")", "π"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
        {["0", ".", "+", "=", "C", "DEL"].map((btn) => (
          <button
            key={btn}
            className={btn === "=" ? "equal" : btn === "C" ? "clear" : ""}
            onClick={() =>
              btn === "="
                ? handleCalculate()
                : btn === "C"
                ? handleClear()
                : btn === "DEL"
                ? handleDelete()
                : handleClick(btn)
            }
          >
            {btn}
          </button>
        ))}
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
