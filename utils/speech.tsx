export function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) return resolve();

    function doSpeak() {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1.2;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      // Prefer Zira, then Google UK English Female, then any English female
      const preferredVoices = [
        'Microsoft Zira - English (United States)',
        'Google UK English Female'
      ];
      let femaleVoice = voices.find(v => preferredVoices.includes(v.name));
      if (!femaleVoice) {
        femaleVoice = voices.find(
          v =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('female') ||
             v.name.toLowerCase().includes('zira'))
        );
      }
      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    }

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = doSpeak;
    } else {
      doSpeak();
    }
  });
}