// Web Audio API and SpeechSynthesis for kid-friendly game sound effects

let audioCtx: AudioContext | null = null;
let isSoundMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isSoundMuted = muted;
}

export function getSoundMuted(): boolean {
  return isSoundMuted;
}

/**
 * 정답을 맞췄을 때의 경쾌하고 신나는 승리 효과음 (Bright & Cheerful Correct Chime + Cute Pop)
 * 아르페지오 실로폰/글록켄슈필 차임 (도-미-솔-도) + 반짝이는 별가루 핑 + 경쾌한 팡! 효과음
 */
export function playMonsterDefeatSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. 경쾌한 마림바/글록켄슈필 실로폰 아르페지오 (C5 -> E5 -> G5 -> C6)
  const notes = [
    { freq: 523.25, time: 0.00, dur: 0.18, vol: 0.28 }, // Do (C5)
    { freq: 659.25, time: 0.08, dur: 0.18, vol: 0.30 }, // Mi (E5)
    { freq: 783.99, time: 0.16, dur: 0.22, vol: 0.32 }, // Sol (G5)
    { freq: 1046.50, time: 0.24, dur: 0.45, vol: 0.36 } // High Do (C6)
  ];

  notes.forEach(({ freq, time, dur, vol }) => {
    // Primary chime tone (warm pure sine/triangle)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(vol, now + time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + time);
    osc.stop(now + time + dur);

    // Harmonic sparkle overtone
    const overtone = ctx.createOscillator();
    const overGain = ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now + time);
    overGain.gain.setValueAtTime(vol * 0.25, now + time);
    overGain.gain.exponentialRampToValueAtTime(0.001, now + time + (dur * 0.7));

    overtone.connect(overGain);
    overGain.connect(ctx.destination);
    overtone.start(now + time);
    overtone.stop(now + time + dur);
  });

  // 2. 귀여운 카툰 팝 ("뽀잉~ 뿅!") 소리
  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();
  popOsc.type = 'sine';
  popOsc.frequency.setValueAtTime(320, now);
  popOsc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

  popGain.gain.setValueAtTime(0.22, now);
  popGain.gain.exponentialRampToValueAtTime(0.005, now + 0.16);

  popOsc.connect(popGain);
  popGain.connect(ctx.destination);
  popOsc.start(now);
  popOsc.stop(now + 0.16);

  // 3. 반짝이는 마법 별가루 글리터 챠르르 (Sparkle shimmer)
  const shimmerNotes = [1318.51, 1567.98, 2093.0]; // E6, G6, C7
  shimmerNotes.forEach((freq, idx) => {
    const sOsc = ctx.createOscillator();
    const sGain = ctx.createGain();
    sOsc.type = 'triangle';
    sOsc.frequency.setValueAtTime(freq, now + 0.26 + idx * 0.05);

    sGain.gain.setValueAtTime(0.12, now + 0.26 + idx * 0.05);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.05);

    sOsc.connect(sGain);
    sGain.connect(ctx.destination);
    sOsc.start(now + 0.26 + idx * 0.05);
    sOsc.stop(now + 0.55 + idx * 0.05);
  });
}

/**
 * 틀렸을 때의 오답 효과음 (Wrong Buzzer & Playful Chortle)
 * 삐익~ 낮은 버저와 몬스터가 키득거리는 톤
 */
export function playWrongAnswerSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Low dull double thud / buzzer
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(140, now);
  osc1.frequency.setValueAtTime(120, now + 0.15);

  gain1.gain.setValueAtTime(0.25, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.35);

  // Giggling flutter tone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(260, now + 0.15);
  osc2.frequency.linearRampToValueAtTime(320, now + 0.22);
  osc2.frequency.linearRampToValueAtTime(280, now + 0.3);
  osc2.frequency.linearRampToValueAtTime(350, now + 0.38);

  gain2.gain.setValueAtTime(0.15, now + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.15);
  osc2.stop(now + 0.45);
}

/**
 * 승리 축하 팡파레 (Victory Fanfare)
 */
export function playVictoryFanfare() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.15 }, // C5
    { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
    { freq: 783.99, time: 0.3, dur: 0.18 }, // G5
    { freq: 1046.5, time: 0.48, dur: 0.4 }, // C6
    { freq: 880.0, time: 0.9, dur: 0.18 }, // A5
    { freq: 1046.5, time: 1.1, dur: 0.6 } // C6
  ];

  const now = ctx.currentTime;
  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);
    gain.gain.setValueAtTime(0.25, now + time);
    gain.gain.exponentialRampToValueAtTime(0.01, now + time + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/**
 * 버튼 클릭 / 가벼운 선택음
 */
export function playClickSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * 몬스터 전진 경고 비프음
 */
export function playAdvanceWarningSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.setValueAtTime(240, now + 0.1);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

/**
 * 영어 단어 발음 읽어주기 (TTS)
 */
export function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // Slightly slower pace for elementary school learners
  utterance.pitch = 1.1; // Friendly warm pitch

  window.speechSynthesis.speak(utterance);
}

/**
 * 시간 초과 / 실패 시의 귀여운 좌절 효과음 (Gentle Cartoon Sad Sound: 와-와-와-와앙~)
 */
export function playGameOverDefeatSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 440, time: 0.0, dur: 0.25 }, // A4
    { freq: 415.3, time: 0.25, dur: 0.25 }, // G#4
    { freq: 392.0, time: 0.5, dur: 0.25 }, // G4
    { freq: 349.23, time: 0.75, dur: 0.6 } // F4 wobble slide
  ];

  notes.forEach(({ freq, time, dur }, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);
    if (idx === 3) {
      osc.frequency.linearRampToValueAtTime(310, now + time + dur);
    }

    gain.gain.setValueAtTime(0.25, now + time);
    gain.gain.exponentialRampToValueAtTime(0.01, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/**
 * 캐릭터 특별 보상 획득 효과음 (Sparkling Treasure Fanfare)
 */
export function playItemAcquireSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 587.33, time: 0.0, dur: 0.15 }, // D5
    { freq: 739.99, time: 0.1, dur: 0.15 }, // F#5
    { freq: 880.00, time: 0.2, dur: 0.18 }, // A5
    { freq: 1174.66, time: 0.32, dur: 0.5 } // D6
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);
    gain.gain.setValueAtTime(0.3, now + time);
    gain.gain.exponentialRampToValueAtTime(0.005, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + time);
    osc.stop(now + time + dur);
  });

  // Sparkles
  const sparkles = [1479.98, 1760.00, 2349.32];
  sparkles.forEach((freq, idx) => {
    const sOsc = ctx.createOscillator();
    const sGain = ctx.createGain();
    sOsc.type = 'triangle';
    sOsc.frequency.setValueAtTime(freq, now + 0.35 + idx * 0.06);
    sGain.gain.setValueAtTime(0.12, now + 0.35 + idx * 0.06);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + idx * 0.06);

    sOsc.connect(sGain);
    sGain.connect(ctx.destination);
    sOsc.start(now + 0.35 + idx * 0.06);
    sOsc.stop(now + 0.65 + idx * 0.06);
  });
}

/**
 * 레벨 업 효과음 (Level Up Fanfare)
 */
export function playLevelUpSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.09);
    gain.gain.setValueAtTime(0.28, now + i * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.09 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.09);
    osc.stop(now + i * 0.09 + 0.35);
  });
}
