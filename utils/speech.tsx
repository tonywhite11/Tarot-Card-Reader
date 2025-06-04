let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string) {
  if (!('speechSynthesis' in window)) return;

  function doSpeak() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;
    utterance.rate = 1;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      v =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('female') ||
         v.name.toLowerCase().includes('woman') ||
         v.name.toLowerCase().includes('susan') ||
         v.name.toLowerCase().includes('samantha') ||
         v.name.toLowerCase().includes('zoe') ||
         v.name.toLowerCase().includes('linda') ||
         v.name.toLowerCase().includes('karen') ||
         v.name.toLowerCase().includes('zira'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = doSpeak;
  } else {
    doSpeak();
  }
}

export function pauseSpeech() {
  window.speechSynthesis.pause();
}

export function resumeSpeech() {
  window.speechSynthesis.resume();
}

export function stopSpeech() {
  window.speechSynthesis.cancel();
}