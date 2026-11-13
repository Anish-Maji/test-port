// ============================================================================
// STARTUP CHIME
// An original late-90s style startup sound synthesised with the Web Audio API:
// a slow swelling pad chord, a rising bell arpeggio and a soft echo, ~4s long.
// Must be called from a user gesture (a click) so the browser allows audio.
// ============================================================================

const PAD_NOTES = [155.56, 233.08, 392.0, 587.33]; // Eb3, Bb3, G4, D5
const BELL_NOTES = [466.16, 622.25, 783.99, 932.33, 1244.51]; // Bb4, Eb5, G5, Bb5, Eb6

export function playStartupChime() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = 0.16;
  master.connect(ctx.destination);

  // Feedback echo stands in for a reverb tail
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.28;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.35;
  const wet = ctx.createGain();
  wet.gain.value = 0.3;
  master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  const tone = (freq, type, start, attack, hold, release, level) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(level, start + attack);
    gain.gain.setValueAtTime(level, start + attack + hold);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + hold + release);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + attack + hold + release + 0.05);
  };

  PAD_NOTES.forEach((freq) => {
    tone(freq, 'triangle', now, 0.7, 1.4, 1.8, 0.22);
    tone(freq * 1.004, 'sine', now, 0.9, 1.2, 1.9, 0.14);
  });

  BELL_NOTES.forEach((freq, i) => {
    tone(freq, 'sine', now + 0.35 + i * 0.16, 0.02, 0.05, 1.3, 0.2);
  });

  setTimeout(() => ctx.close(), 5000);
}
