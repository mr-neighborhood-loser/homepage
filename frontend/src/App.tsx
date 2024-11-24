import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null); // エラーメッセージを保持する状態

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setError(null); // クリア時にエラーメッセージもリセット
  };

  const handleCalculate = async () => {
    setError(null); // エラー状態をリセット

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.result || 'An unexpected error occurred');
        setInput(''); // エラー時に入力欄をリセット
        return;
      }

      setInput(data.result.toString());
    } catch {
      setError('Failed to connect to the server.');
      setInput(''); // エラー時に入力欄をリセット
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

      {/* エラーメッセージを別の場所に表示 */}
      {error && <div className="error-message">{error}</div>}

    </div>
  );
};

export default App;
