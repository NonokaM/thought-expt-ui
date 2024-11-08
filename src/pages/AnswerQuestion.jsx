import React, { useState, useEffect } from 'react';
import '../styles/AnswerQuestion.css'; // CSSファイルをインポート*/
//http://localhost:5173/questions/questionsId/answer


const AnswerQuestion = ({ question_id, user_id, user_name, theme, question_text, choice1, choice2, thumbnail }) => {
    const [choice, setChoice] = useState('');
    const [reason, setReason] = useState('');
    const [questionData, setQuestionData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/questions/{question_id}`);
          const data = await response.json();
          setQuestionData(data);
        } catch (error) {
          console.error('データの取得に失敗しました', error);
        }
      };
  
      fetchData();
    }, [question_id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { question_id, user_id, user_name, choice, reason };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/questions/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('データが正常に送信されました');
      } else {
        alert('データ送信に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('エラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>問題のテーマ</h2>
        <p>{theme}</p>
      </div>

      <div>
        <h2>画像</h2>
        {thumbnail && <img src={thumbnail} alt="プレビュー" />}
      </div>

      <div>
        <h2>問題文</h2>
        <p>{question_text}</p>
      </div>

      <div>
        <h2>選択肢</h2>
        <label>
          <input
            type="radio"
            name="choice"
            value="choice1"
            checked={choice === 'choice1'}
            onChange={(e) => setChoice(e.target.value)}
          />
          {choice1}
        </label>
        <label>
          <input
            type="radio"
            name="choice"
            value="choice2"
            checked={choice === 'choice2'}
            onChange={(e) => setChoice(e.target.value)}
          />
          {choice2}
        </label>
      </div>

      <div>
        <h2>理由</h2>
        <textarea 
        className="reason-textarea"
        value={reason} onChange={(e) => setReason(e.target.value)} placeholder="理由を入力してください"></textarea>
      </div>

      <button 
      className="button"
      type="submit">送信</button>
    </form>
  );
};

export default AnswerQuestion;