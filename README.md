# 🎙️ Orator - A Transcription App  


**Orator** is a transcription app that enables users to **record or upload audio**, **transcribe** and **translate** it effortlessly using powerful AI models. It combines the capabilities of **OpenAI Whisper** for transcription and **Xenova's NLLB-200 Distilled (600M)** model for multilingual translation—without relying on external APIs.

<img src="./src/asset/voice2.gif" alt="Orator Banner" width="300"/>

---

## 🚀 Features

- 🎤 Record live audio via microphone
- 📁 Upload audio files
- 🧠 **Transcribe speech using OpenAI Whisper**
- 🌍 **Translate transcriptions using Xenova’s `nllb-200-distilled-600M`**
- 📥 Copy or download the final result
- 💻 Responsive, mobile-friendly UI

---

## 🧠 Powered by AI

### 🔊 Transcription – OpenAI Whisper
- High-quality multilingual speech recognition
- Robust even in noisy environments
- Converts spoken audio into accurate text

### 🌍 Translation – Xenova’s `nllb-200-distilled-600M`
- Lightweight distilled version of Meta AI’s NLLB-200
- Supports 200+ languages
- Runs locally in-browser

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Transcription**: OpenAI Whisper
- **Translation**: Xenova/nllb-200-distilled-600M

---

📦 Dependencies

"react": "^18.x",
"vite": "^4.x",
"tailwindcss": "^3.x",
"font-awesome": "^6.x",
"@xenova/transformers": "^2.x"





