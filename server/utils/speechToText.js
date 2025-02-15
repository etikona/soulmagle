import axios from "axios";
export const processAudioToText = async (audioPath) => {
  const response = await axios.post(
    "https://api.speechtotextapi.com/transcribe",
    {
      audio_path: audioPath,
    },
    {
      headers: { Authorization: `Bearer ${process.env.AUDIO_API_KEY}` },
    }
  );
  return response.data.text;
};
