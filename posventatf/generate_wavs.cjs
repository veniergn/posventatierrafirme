const fs = require('fs');
const path = require('path');

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function createWavFile(filename, sampleRate, samples) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');

  // FMT sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, 1, true); // NumChannels (1 for mono)
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate
  view.setUint16(32, 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // Data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true); // Subchunk2Size

  // Write samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  const dir = path.join(__dirname, 'public', 'sounds');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), Buffer.from(buffer));
  console.log('Saved', filename);
}

const sampleRate = 44100;

// 1. Login Click (Futuristic blip)
const loginSamples = [];
for (let i = 0; i < sampleRate * 0.15; i++) {
  const t = i / sampleRate;
  const env = Math.exp(-t * 30);
  const freq = 1200 - (t * 4000);
  loginSamples.push(Math.sin(2 * Math.PI * freq * t) * env * 0.8);
}
createWavFile('login.wav', sampleRate, loginSamples);

// 2. Space Transition (Softer, modern UI sweep)
const spaceSamples = [];
for (let i = 0; i < sampleRate * 1.2; i++) {
  const t = i / sampleRate;
  
  // Smooth volume envelope: very fast attack, smooth decay
  let env = 0;
  if (t < 0.05) env = t / 0.05;
  else env = Math.exp(-(t - 0.05) * 3.5);
  
  // Warm sine sweep (starts around 400Hz and sweeps down to 100Hz)
  const freq = 100 + 300 * Math.exp(-t * 8);
  
  // Subtle harmonics for richness
  const base = Math.sin(2 * Math.PI * freq * t);
  const harm1 = Math.sin(2 * Math.PI * (freq * 1.5) * t) * 0.3;
  
  const mixed = (base + harm1) * 0.4;
  spaceSamples.push(mixed * env);
}
createWavFile('transition.wav', sampleRate, spaceSamples);

// 3. Save Success (Bright Chime)
const saveSamples = [];
for (let i = 0; i < sampleRate * 0.8; i++) {
  const t = i / sampleRate;
  let s = 0;
  // Note 1: C6 (1046.5 Hz) from 0 to 0.4s
  if (t < 0.4) {
    const env1 = Math.exp(-t * 12);
    s += Math.sin(2 * Math.PI * 1046.5 * t) * env1;
  }
  // Note 2: G6 (1567.98 Hz) from 0.15s to 0.8s
  if (t >= 0.15) {
    const t2 = t - 0.15;
    const env2 = Math.exp(-t2 * 8);
    s += Math.sin(2 * Math.PI * 1567.98 * t2) * env2;
  }
  saveSamples.push(s * 0.6);
}
createWavFile('success.wav', sampleRate, saveSamples);
