import React, { useState , useEffect} from 'react'
import '../styles/PostQuestion.css' // CSSファイルをインポート

function PostQuestion() {
  const [theme, setTheme] = useState('')
  const [question_text, setQuestion_text] = useState('')
  const [choice1, setChoice1] = useState('')
  const [choice2, setChoice2] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    console.log(userId);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // デフォルトのフォーム送信を防止
    setError('') // エラーメッセージをクリア

    // バリデーション
     if (!theme || !question_text || !choice1 || !choice2) {
    setError('すべてのフィールドを入力してください');
    return;
  }

  const payload = {
    user_id: localStorage.getItem('user_id'),
    theme: theme,
    thumbnail: "default-img.png",
    question_text: question_text,
    choice1: choice1,
    choice2: choice2,
  };

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text(); // レスポンスをテキストとして取得
    console.log('レスポンスの内容:', text);

    if (!response.ok) {
      console.error('ステータスコード:', response.status);
      throw new Error('送信に失敗しました');
    }

    const data = JSON.parse(text); // テキストをJSONにパース
    console.log('送信成功:', data);
  } catch (error) {
    console.error('送信エラー:', error);
    setError('送信に失敗しました');
  }
};

  return (
    <div className="container">
      <h2>問題投稿</h2>
      <h3>思考実験など正解の無い問題を投稿して、他人の意見を聞いてみよう！</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>問題テーマ:</label>
          <input
            className="theme-input"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            placeholder="例）トロッコ問題"
          />
        </div>
        <div className="file-input-wrapper">
          <label>画像ファイルを追加</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }} // ボタンだけを表示するために非表示にする
          />
          <button type="button" onClick={() => document.getElementById('fileInput').click()}>
            画像ファイルを選択
          </button>
        </div>
        {thumbnail && (
          <div>
            <img src={thumbnail} alt="問題画像" style={{ maxWidth: '100%' }} />
          </div>
        )}
        <div>
          <label>問題文:</label>
          <textarea
            className="large-textarea" // 特定のクラスを追加
            type="text"
            value={question_text}
            onChange={(e) => setQuestion_text(e.target.value)}
            required
            placeholder="例）線路を走っていたトロッコが制御不能になった。このままでは、前方の線路工事をしている作業員5人が轢き殺されてしまう。ポイントを切り替えると進路を変更することができるが、その場合、無実の一般人が犠牲になってしまう。このときあなたはどちらを犠牲にするか？"
          />
        </div>
        <div>
          <label>選択肢を追加:</label>
          <div className="choices">
            <input
              type="text"
              value={choice1}
              onChange={(e) => setChoice1(e.target.value)}
              required
              placeholder="例）進路を変えず、そのまま5人を犠牲にする"
            />
            <input
              type="text"
              value={choice2}
              onChange={(e) => setChoice2(e.target.value)}
              required
              placeholder="例）進路を変えて、1人を犠牲にする"
            />
          </div>
        </div>
        <button 
        className="button-pages"
        type="submit">投稿する</button>
        {/* {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  )
}

export default PostQuestion
