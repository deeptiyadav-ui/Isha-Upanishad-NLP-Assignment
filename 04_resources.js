/**
 * ईशोपनिषद् Sanskrit NLP Pipeline
 * Tab 4: Resources — NER · POS · N-Grams · Emotion Lexicon
 *
 * All domain-specific linguistic resources for the Ishavasya Upanishad corpus.
 */

// ── NAMED ENTITY RECOGNITION (NER) DICTIONARY ────────────────────────────────
const NER_DICT = {
  "Divine Beings (देवता)": [
    "ईश (Īśa)",
    "अग्नि (Agni)",
    "पूषन् (Pūṣan)",
    "सूर्य (Sūrya)",
    "मातरिश्वन् (Mātariśvan)",
    "प्रजापति (Prajāpati)",
  ],
  "Philosophical Concepts (तत्त्व)": [
    "ब्रह्म (Brahman)",
    "आत्मन् (Ātman)",
    "पुरुष (Puruṣa)",
    "विद्या (Vidyā)",
    "अविद्या (Avidyā)",
    "माया (Māyā)",
  ],
  "Cosmic Principles (लोक)": [
    "जगत् (Jagat)",
    "सम्भूति (Sambhūti)",
    "विनाश (Vināśa)",
    "अमृत (Amṛta)",
    "मृत्यु (Mṛtyu)",
  ],
  "States & Paths (मार्ग)": [
    "कर्म (Karma)",
    "उपासना (Upāsanā)",
    "मोक्ष (Mokṣa)",
    "संसार (Saṃsāra)",
    "धर्म (Dharma)",
  ],
  "Qualities (गुण)": [
    "पूर्ण (Pūrṇa)",
    "शुक्र (Śukra)",
    "अकाय (Akāya)",
    "शुद्ध (Śuddha)",
    "स्वयम्भू (Svayambhū)",
  ],
};

// ── POS TAGGING DICTIONARY ────────────────────────────────────────────────────
// Rule-based classification of attested lexical items from the corpus
const POS_DICT = {
  "Nouns (नाम)": {
    items: ["ईश", "कर्म", "जगत्", "आत्मन्", "ब्रह्म", "विद्या", "मृत्यु", "धर्म", "सत्य", "तेजस्"],
    color: "#4ade80",
    description: "Substantives (nāman) — declined in 8 cases × 3 numbers",
  },
  "Verbs (क्रिया)": {
    items: ["पश्यति", "जानाति", "गच्छति", "भवति", "स्मर", "नय", "विधेम", "अश्नुते", "तीर्त्वा"],
    color: "#60a5fa",
    description: "Finite verbs (tiṅ) and non-finite forms (kṛt)",
  },
  "Pronouns (सर्वनाम)": {
    items: ["सः", "तत्", "यः", "अहम्", "त्वम्", "एषः", "इदम्", "अदस्"],
    color: "#f472b6",
    description: "Sarvanāma — demonstrative, relative, personal pronouns",
  },
  "Adjectives (विशेषण)": {
    items: ["पूर्ण", "शुद्ध", "अन्ध", "हिरण्मय", "सुपथ", "कल्याण"],
    color: "#fb923c",
    description: "Viśeṣaṇa — agree with noun in gender, case, and number",
  },
  "Indeclinables (अव्यय)": {
    items: ["ॐ", "च", "एव", "न", "तु", "इव", "यत्र", "तत्र", "इति"],
    color: "#a78bfa",
    description: "Avyaya — particles, conjunctions, adverbs; never inflected",
  },
};

// ── N-GRAM ANALYSIS ──────────────────────────────────────────────────────────
// Most significant n-grams extracted from the 18-mantra corpus
const NGRAMS = {
  unigrams: [
    "ईश", "आत्मन्", "कर्म", "विद्या", "ब्रह्म",
    "पूर्ण", "सत्य", "धर्म", "मोक्ष", "तमस्",
  ],
  bigrams: [
    "ईशावास्यम् इदम्",
    "अन्धं तमः",
    "अविद्यया मृत्युम्",
    "सर्वाणि भूतानि",
    "विद्यां चाविद्याम्",
    "पूर्णमदः पूर्णमिदम्",
  ],
  trigrams: [
    "विद्यां च अविद्याम्",
    "सम्भूतिं च विनाशम्",
    "ॐ शान्तिः शान्तिः",
    "न कर्म लिप्यते",
    "तत् त्वम् अस्मि",
  ],
};

// ── DOMAIN-SPECIFIC EMOTION LEXICON ──────────────────────────────────────────
// Based on Vedic Navarasa (Nine Emotions) adapted for Upanishadic domain.
// Standard Navarasa: śṛṅgāra, hāsya, karuṇā, raudra, vīra, bhayānaka, bībhatsa, adbhuta, śānta
// Vedic adaptation adds: vairāgya, mumukṣutā, viveka, bhakti, dharma-bodha
const EMOTION_LEXICON = {
  "आनन्द (Ānanda / Bliss)": {
    color: "#fbbf24",
    words: ["पूर्ण", "अमृत", "मुक्त", "आनन्द", "कल्याण"],
    count: 4,
    navarasa_equivalent: "śānta (tranquillity)",
  },
  "भय (Bhaya / Fear)": {
    color: "#ef4444",
    words: ["अन्धतमस्", "असुर्य", "मृत्यु", "विनाश"],
    count: 3,
    navarasa_equivalent: "bhayānaka (terror)",
  },
  "श्रद्धा (Śraddhā / Reverence)": {
    color: "#8b5cf6",
    words: ["देव", "ईश", "पूषन्", "अग्नि", "सूर्य"],
    count: 3,
    navarasa_equivalent: "bhakti (devotion) — extended",
  },
  "विस्मय (Vismaya / Wonder)": {
    color: "#06b6d4",
    words: ["अनेजत्", "जवीयस्", "परिभू", "स्वयम्भू"],
    count: 2,
    navarasa_equivalent: "adbhuta (wonder)",
  },
  "वैराग्य (Vairāgya / Renunciation)": {
    color: "#6ee7b7",
    words: ["त्यक्त", "मा गृधः", "संन्यास", "शान्ति"],
    count: 3,
    navarasa_equivalent: "Vedic extension — no classical equivalent",
  },
  "भक्ति (Bhakti / Devotion)": {
    color: "#f97316",
    words: ["नम", "विधेम", "पूषन्", "अग्ने"],
    count: 2,
    navarasa_equivalent: "śṛṅgāra (sublimated) — devotional love",
  },
  "जिज्ञासा (Jijñāsā / Inquiry)": {
    color: "#38bdf8",
    words: ["शुश्रुम", "धीर", "विचचक्षिरे"],
    count: 2,
    navarasa_equivalent: "Vedic extension — philosophical curiosity",
  },
  "लालसा (Mumukṣu / Longing)": {
    color: "#e879f9",
    words: ["अपावृणु", "दृष्टये", "सत्यधर्म"],
    count: 1,
    navarasa_equivalent: "Vedic extension — longing for liberation",
  },
};

module.exports = { NER_DICT, POS_DICT, NGRAMS, EMOTION_LEXICON };
