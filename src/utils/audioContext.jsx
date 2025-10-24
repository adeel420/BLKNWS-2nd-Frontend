// Create a global audio context file (e.g., audioContext.js)
let globalAudio = null;

export const initializeGlobalAudio = (audioSource) => {
  if (!globalAudio) {
    globalAudio = new Audio(audioSource);
    globalAudio.loop = true;
  }
  return globalAudio;
};

export const getGlobalAudio = () => globalAudio;

export const setGlobalAudio = (audio) => {
  globalAudio = audio;
};
