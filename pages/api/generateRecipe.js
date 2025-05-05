import { Configuration, OpenAIApi } from 'openai';
import { fetchTranscript } from '../../utils/fetchTranscript';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { videoUrl } = req.body;

  const transcript = await fetchTranscript(videoUrl);
  if (!transcript) {
    return res.status(500).json({ error: 'Transcript not available.' });
  }

  const prompt = `다음은 요리 영상의 자막입니다:\n\n${transcript}\n\n이 자막을 기반으로 요리 레시피를 작성해주세요.`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const recipe = completion.data.choices[0].message.content;
    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
}
