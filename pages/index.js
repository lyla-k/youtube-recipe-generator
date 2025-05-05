import { useState } from 'react';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleGenerate = async () => {
    const response = await fetch('/api/generateRecipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl }),
    });
    const data = await response.json();
    setRecipe(data.recipe);
  };

  return (
    <div>
      <h1>YouTube 요리 레시피 생성기</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="YouTube 영상 URL을 입력하세요"
      />
      <button onClick={handleGenerate}>레시피 생성</button>
      <pre>{recipe}</pre>
    </div>
  );
}
