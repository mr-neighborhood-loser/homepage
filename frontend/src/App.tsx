import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null); // エラー用の状態を分けて管理

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
    setError(null); // ボタンを押したときにエラーメッセージをリセット
  };

  const handleClear = () => {
    setInput('');
    setError(null); // クリアボタンを押したときにエラーメッセージをリセット
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

      if (response.ok) {
        setInput(data.result.toString());
        setError(null); // 計算成功時はエラーメッセージをリセット
      } else {
        setError(data.result); // サーバーからのエラーメッセージを設定
      }
    } catch {
      setError('エラーが発生しました');
    }
  };


  // キーボード入力を処理する
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key;

    if ('0123456789'.includes(key)) {
      handleButtonClick(key); // 数字を入力
    } else if ('+-*/'.includes(key)) {
      handleButtonClick(key); // 演算子を入力
    } else if (key === 'Enter') {
      handleCalculate(); // Enterキーで計算
    } else if (key === 'Backspace') {
      setInput(input.slice(0, -1)); // バックスペースで最後の文字を削除
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      handleClear(); // Cキーでクリア
    }
  };

  // マウント時にキーボードイベントをリスン
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      handleKeyPress(e);
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [input]);

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

      {/* エラーメッセージをボタンの下に表示 */}
      {error && <div className="error-message">{error}</div>}

    </div>
  );
};

export default App;
