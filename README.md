# ईशोपनिषद् — Sanskrit NLP Pipeline

> **Ishavasya Upanishad · 18 Mantras · Complete NLP Analysis · Domain SLM**

A full natural-language processing pipeline applied to the *Īśāvāsya Upaniṣad* (Ishavasya Upanishad), one of the shortest and most philosophically dense Upanishads of the Vedic canon. Each file in this repository corresponds to one tab of the interactive HTML dashboard.

---

## Repository Structure

| File | Tab | Description |
|------|-----|-------------|
| `01_dataset.js` | 📜 Dataset | Śānti Pāṭha + all 18 mantras with transliteration, translation, emotion, sentiment & theme labels |
| `02_challenges.js` | ⚠️ Challenges | 8 Sanskrit NLP challenges (Sandhi, Devanāgarī Unicode, inflection, etc.) + recommended Python libraries |
| `03_pipeline.py` | 🔧 Pipeline | 12-step Python NLP pipeline: scraping → normalization → sandhi → tokenization → POS → NER → n-grams → sentiment |
| `04_resources.js` | 📚 Resources | NER dictionary · POS dictionary · N-gram corpus · Vedic emotion lexicon |
| `05_sentiment.py` | 🎭 Sentiment | Corpus-level sentiment distribution, per-mantra emotion detection, scoring utilities |
| `06_slm_chatbot.js` | 🤖 SLM Chatbot | Domain-specific Small Language Model: keyword extraction → mantra retrieval → knowledge-graph answer |

---

## Corpus Stats

| Metric | Value |
|--------|-------|
| Mantras | 18 |
| Total tokens | ~108 (cleaned) / ~1,200 (raw Devanāgarī) |
| NER classes | 5 |
| Distinct emotions | 8 |
| Pipeline steps | 12 |
| Unicode block | U+0900–U+097F |
| Encoding | UTF-8 NFC |

---

## Quick Start

### Python Pipeline (Steps 1–11)

```bash
pip install requests beautifulsoup4 nltk unicodedata2
# Optional (for full morphological analysis):
pip install cltk sanskritNLP indic-transliteration
```

```python
from pipeline import run_pipeline

text = "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।"
result = run_pipeline(text)
print(result["sentiment"])   # {'raw': 1, 'normalised': 0.1429, 'label': 'positive'}
print(result["ner"])         # [('ईश', 'Divine Beings (देवता)'), ...]
```

### SLM Chatbot (Node.js)

```javascript
const { IshaUpanishadSLM } = require('./06_slm_chatbot');

const slm = new IshaUpanishadSLM();
console.log(slm.chat("What is Brahman?"));
// → "ब्रह्म (Brahman) — Mantra 4 reveals: ब्रह्म is अनेजत् ..."
```

---

## NLP Challenges (Summary)

Sanskrit poses unique NLP challenges not found in Indo-European NLP:

1. **Devanāgarī Unicode** — multi-codepoint clusters (matras, anusvāra, visarga)
2. **Sandhi (संधि)** — euphonic coalescence merges word boundaries
3. **Samāsa (समास)** — compound words collapse multiple semantic units
4. **Vibhakti (विभक्ति)** — 8 cases × 3 numbers → hundreds of word-forms per stem
5. **Vedic accent marks** — udātta/anudātta pitch accents via Unicode combining chars
6. **Encoding diversity** — ITRANS, HK, ISO 15919, SLP1, WX, Devanāgarī
7. **No standard NLP models** — Sanskrit BERT has limited Vedic domain coverage
8. **Vedic emotion lexicon** — Navarasa ≠ Ekman's 6; domain-specific extensions needed

---

## Emotion Lexicon (Vedic Navarasa Adapted)

| Emotion | Sanskrit | Mantras |
|---------|----------|---------|
| Bliss | आनन्द (Ānanda) | 4 |
| Fear | भय (Bhaya) | 3 |
| Reverence | श्रद्धा (Śraddhā) | 3 |
| Renunciation | वैराग्य (Vairāgya) | 3 |
| Wonder | विस्मय (Vismaya) | 2 |
| Devotion | भक्ति (Bhakti) | 2 |
| Inquiry | जिज्ञासा (Jijñāsā) | 2 |
| Longing | लालसा (Lālasā) | 1 |

---

## Source

- **Text**: [upanishads.org.in/upanishads/1](https://upanishads.org.in/upanishads/1) — Kāṇva Recension
- **Script**: Devanāgarī · **Transliteration**: IAST

---

*ॐ तत्सत् · ईशोपनिषद् NLP Pipeline · Sanskrit NLP Research*
