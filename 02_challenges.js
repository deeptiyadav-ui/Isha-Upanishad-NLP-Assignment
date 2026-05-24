/**
 * ईशोपनिषद् Sanskrit NLP Pipeline
 * Tab 2: Challenges — Sanskrit NLP Complexities & Technical Challenges
 *
 * Sanskrit is morphologically rich, phonologically complex, and digitally
 * underserved. This module documents the key challenges for this pipeline.
 */

// ── NLP CHALLENGES ───────────────────────────────────────────────────────────
const CHALLENGES = [
  {
    icon: "🔤",
    title: "Devanāgarī Unicode (U+0900–U+097F)",
    desc:
      "Sanskrit uses Devanāgarī script. Vowel matras, anusvāra (ँ ं), visarga (ः), chandrabindu are " +
      "combining diacritics — they attach to preceding consonants. Tokenizers must handle multi-codepoint " +
      "clusters, not just whitespace splitting.",
  },
  {
    icon: "🔗",
    title: "Sandhi (संधि) Rules",
    desc:
      "Euphonic coalescence merges word boundaries: ईशावास्यम् = ईश + आवास्यम् → vowel sandhi. " +
      "External sandhi happens across words. NLP must apply sandhi-splitting (sandhi-viccheda) before tokenization.",
  },
  {
    icon: "🧩",
    title: "Compound Words (समास)",
    desc:
      "Bahuvrihi, Tatpuruṣa, Dvandva compounds collapse multiple semantic units: 'सत्यधर्म' " +
      "(Truth+Righteousness). Compound splitting is mandatory for lemmatization and POS tagging.",
  },
  {
    icon: "📐",
    title: "Case-Heavy Inflection (विभक्ति)",
    desc:
      "Sanskrit has 8 cases × 3 numbers × multiple declension classes → 100s of word-forms per noun stem. " +
      "Stemming/lemmatization requires morphological analysis, not suffix stripping.",
  },
  {
    icon: "🎵",
    title: "Vedic Accent Marks (स्वर)",
    desc:
      "Vedic Sanskrit uses udātta (U), anudātta, and svarita pitch accents not found in classical Sanskrit. " +
      "These are encoded via Unicode combining chars and are critical for chanting corpus.",
  },
  {
    icon: "💾",
    title: "Encoding Diversity",
    desc:
      "Sanskrit texts exist in ITRANS, Harvard-Kyoto, ISO 15919, SLP1, Velthuis, WX, and Devanāgarī. " +
      "Cross-encoding normalization (using indic-transliteration library) is mandatory for corpus aggregation.",
  },
  {
    icon: "🤖",
    title: "Absence of Standard NLP Models",
    desc:
      "No large pre-trained Sanskrit BERT/GPT with sufficient coverage exists. Sanskrit BERT (UoHyd) has " +
      "limited domain coverage. Domain-specific (Vedic/Upanishadic) vocabulary is out-of-distribution for most models.",
  },
  {
    icon: "💭",
    title: "Zero-shot Emotion Lexicons",
    desc:
      "Sanskrit rasa theory defines 9 primary emotions (Navarasa). These don't map 1:1 to Ekman's 6. " +
      "Domain-specific Vedic emotions (vairāgya, mumukṣutā, viveka) require custom lexicon construction.",
  },
];

// ── RECOMMENDED PYTHON LIBRARIES ─────────────────────────────────────────────
const LIBS = [
  {
    name: "indic-transliteration",
    desc: "Script conversion (ITRANS↔Devanāgarī)",
    install: "pip install indic-transliteration",
    docs: "https://pypi.org/project/indic-transliteration/",
  },
  {
    name: "SanskritNLP",
    desc: "Sandhi splitting, morphology",
    install: "pip install sanskritNLP",
    docs: "https://github.com/sanskrit-coders/sanscript.py",
  },
  {
    name: "CLTK",
    desc: "Sanskrit tokenizer, lemmatizer",
    install: "pip install cltk",
    docs: "https://docs.cltk.org/",
  },
  {
    name: "stanza",
    desc: "Multi-lingual NLP pipeline",
    install: "pip install stanza",
    docs: "https://stanfordnlp.github.io/stanza/",
  },
  {
    name: "Aksharamukha",
    desc: "Unicode normalization",
    install: "pip install aksharamukha",
    docs: "https://aksharamukha.appspot.com/",
  },
  {
    name: "polyglot",
    desc: "Language detection & NER",
    install: "pip install polyglot",
    docs: "https://polyglot.readthedocs.io/",
  },
];

/*
 * USAGE EXAMPLE — Sandhi Viccheda
 * ─────────────────────────────────
 * from sanskritNLP.sandhi import SandhiSplitter
 * result = SandhiSplitter().split('ईशावास्यमिदम्')
 * # → ['ईश', 'आवास्यम्', 'इदम्']
 *
 * USAGE EXAMPLE — Script Conversion
 * ──────────────────────────────────
 * from indic_transliteration import sanscript
 * devanagari = sanscript.transliterate('Ishavasya', sanscript.ITRANS, sanscript.DEVANAGARI)
 */

module.exports = { CHALLENGES, LIBS };
