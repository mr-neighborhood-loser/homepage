import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: input }),
      });
      const data = await response.json();
      setInput(data.result.toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div className="calculator">
      <h1>電卓アプリ</h1>
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>
      <div className="buttons">
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', 'C', '=', '/'].map((button) => (
          <button
            key={button}
            onClick={() => {
              if (button === 'C') handleClear();
              else if (button === '=') handleCalculate();
              else handleButtonClick(button);
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
