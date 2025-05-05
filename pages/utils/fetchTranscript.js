import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchTranscript(videoUrl) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    return transcript.map(entry => entry.text).join(' ');
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return null;
  }
}
