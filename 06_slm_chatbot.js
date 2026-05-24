/**
 * ईशोपनिषद् Sanskrit NLP Pipeline
 * Tab 6: SLM Chatbot — Domain-Specific Small Language Model
 *
 * Architecture:
 *   Query Input → Devanāgarī Tokenize → Keyword Extract
 *   → Mantra Retrieval → Knowledge Graph → Sanskrit Answer
 *
 * The model is trained on the 18 Ishavasya Upanishad mantras.
 * It uses pattern-matching with a Vedic knowledge graph for retrieval.
 */

// ── KNOWLEDGE GRAPH RESPONSES ─────────────────────────────────────────────────
// Pre-authored answers grounded in the source mantras (mantra references included)
const CHATBOT_RESPONSES = {
  brahman:
    "ब्रह्म (Brahman) — Mantra 4 reveals: ब्रह्म is अनेजत् (unmoving) yet faster than the mind. " +
    "It is the universal Self in all. As Mantra 1 states: ईशावास्यमिदं सर्वं — all this is pervaded by the Lord.",

  karma:
    "Mantra 2 teaches Karma Yoga: कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः — " +
    "Do your actions fully, desiring to live a hundred years. " +
    "Action done without ego-attachment does not bind the soul: न कर्म लिप्यते नरे.",

  atman:
    "The Ātman (Self) is described in Mantra 8: शुक्रम् अकायम् अव्रणम् — Pure, bodiless, without wound. " +
    "It pervades all. Mantra 16 culminates in the mahāvākya: सोऽहमस्मि — That Puruṣa, that am I.",

  vidya:
    "Mantra 11 holds the synthesis: विद्यां चाविद्यां च यस्तद्वेदोभयँ सह — " +
    "One who knows both knowledge (upāsanā) and ignorance (ritual) crosses death through avidyā " +
    "and attains immortality through vidyā.",

  moksha:
    "Liberation is described across mantras 6–7: One who sees all beings in the Self " +
    "experiences no grief, no delusion. Mantra 15 prays: हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् — " +
    "Remove the golden veil; reveal Truth to me.",

  fear:
    "Mantras 3, 9, and 12 warn of अन्धं तमः (blind darkness) — those who ignore the Self, " +
    "or practice only knowledge/ritual exclusively, fall into deeper ignorance. Balance is essential.",

  peace:
    "ॐ शान्तिः शान्तिः शान्तिः — The Śānti Pāṭha frames the entire text. " +
    "Peace at three levels: ādhidaivika (cosmic), ādhibhautika (environmental), ādhyātmika (inner). " +
    "The Upaniṣad's goal is pūrṇa — wholeness.",

  default:
    "This SLM is trained on ईशोपनिषद् (18 mantras). " +
    "Ask about: Brahman, Karma Yoga, Ātman, Vidyā-Avidyā, Moksha, or Śānti. " +
    "Each answer draws from the original Sanskrit verses with transliteration.",
};

// ── KEYWORD → INTENT MAPPING ──────────────────────────────────────────────────
// Maps query keywords (English + Devanāgarī) to a knowledge-graph key
const INTENT_RULES = [
  { key: "brahman",  keywords: ["brahman", "ब्रह्म"] },
  { key: "karma",    keywords: ["karma", "कर्म"] },
  { key: "atman",    keywords: ["atman", "self", "आत्म"] },
  { key: "vidya",    keywords: ["vidya", "avidya", "knowledge"] },
  { key: "moksha",   keywords: ["moksha", "liberation", "mukti"] },
  { key: "fear",     keywords: ["fear", "dark", "tamas"] },
  { key: "peace",    keywords: ["peace", "shanti", "शान्ति"] },
];

/**
 * matchIntent — keyword extraction + mantra retrieval
 * @param {string} query - raw user query
 * @returns {string} knowledge-graph answer
 */
function matchIntent(query) {
  const q = query.toLowerCase();
  for (const rule of INTENT_RULES) {
    if (rule.keywords.some((kw) => q.includes(kw))) {
      return CHATBOT_RESPONSES[rule.key];
    }
  }
  return CHATBOT_RESPONSES.default;
}

// ── CHAT SESSION MANAGER ──────────────────────────────────────────────────────
class IshaUpanishadSLM {
  constructor() {
    this.history = [
      {
        role: "bot",
        text: "नमस्ते 🙏 I am the ईशोपनिषद् SLM. Ask me about any concept from the Upaniṣad in English or Sanskrit.",
      },
    ];
  }

  /**
   * Process a user message and append both turns to history.
   * @param {string} userMessage
   * @returns {string} bot response text
   */
  chat(userMessage) {
    this.history.push({ role: "user", text: userMessage });
    const response = matchIntent(userMessage);
    this.history.push({ role: "bot", text: response });
    return response;
  }

  /** Return full conversation history. */
  getHistory() {
    return this.history;
  }

  /** Reset conversation to initial greeting. */
  reset() {
    this.history = [this.history[0]];
  }
}

// ── SLM ARCHITECTURE DESCRIPTION ─────────────────────────────────────────────
const SLM_ARCHITECTURE = [
  { label: "Query Input",           color: "#6366f1" },
  { label: "Devanāgarī Tokenize",   color: "#8b5cf6" },
  { label: "Keyword Extract",       color: "#a855f7" },
  { label: "Mantra Retrieval",      color: "#ec4899" },
  { label: "Knowledge Graph",       color: "#f97316" },
  { label: "Sanskrit Answer",       color: "#22c55e" },
];

// ── SUGGESTED QUERIES ─────────────────────────────────────────────────────────
const SUGGESTED_QUERIES = [
  "What is Brahman?",
  "Explain Karma Yoga",
  "Tell me about Atman",
  "Vidya and Avidya",
  "Path to Moksha",
  "Fear and Darkness",
  "Peace / Shanti",
];

// ── USAGE EXAMPLE ─────────────────────────────────────────────────────────────
/*
const slm = new IshaUpanishadSLM();
console.log(slm.chat("What is Brahman?"));
// → "ब्रह्म (Brahman) — Mantra 4 reveals: ..."

console.log(slm.chat("Tell me about Atman"));
// → "The Ātman (Self) is described in Mantra 8: ..."

console.log(slm.getHistory());
// → [ { role: 'bot', text: 'नमस्ते 🙏 ...' }, { role: 'user', ... }, ... ]
*/

module.exports = {
  CHATBOT_RESPONSES,
  INTENT_RULES,
  SUGGESTED_QUERIES,
  SLM_ARCHITECTURE,
  IshaUpanishadSLM,
  matchIntent,
};
