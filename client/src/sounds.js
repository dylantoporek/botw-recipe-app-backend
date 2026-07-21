// Tiny synthesized sound effects via the Web Audio API — no audio files needed.
// Must be triggered from a user gesture (button click) so the context can start.

let ctx;

function ensureContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function note(freq, startOffset, duration, type = "triangle", peak = 0.12) {
  const c = ensureContext();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(c.destination);
  const t = c.currentTime + startOffset;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

// Bright ascending arpeggio for a successful dish.
export function playSuccessSound() {
  const melody = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  melody.forEach((freq, i) => note(freq, i * 0.09, 0.4));
  note(1318.5, melody.length * 0.09, 0.55, "triangle", 0.1); // E6 sparkle
}

// Sad little descending "wah" for a failed recipe.
export function playFailureSound() {
  note(233.08, 0, 0.28, "sawtooth", 0.07); // Bb3
  note(220.0, 0.22, 0.3, "sawtooth", 0.07); // A3
  note(196.0, 0.44, 0.55, "sawtooth", 0.08); // G3
}
