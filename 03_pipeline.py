"""
ईशोपनिषद् Sanskrit NLP Pipeline
Tab 3: Pipeline — 12-Step NLP Preprocessing

A complete pipeline from raw Sanskrit corpus to ML-ready features.
Each step includes the actual Python implementation code.
"""

import re
import unicodedata

# ── STEP 1: DATA COLLECTION & SCRAPING ──────────────────────────────────────
def step1_collect(url="https://upanishads.org.in/upanishads/1"):
    """Scrape Devanāgarī text blocks and save raw corpus."""
    import requests
    from bs4 import BeautifulSoup

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    # Extract Sanskrit text blocks
    text_blocks = [tag.get_text() for tag in soup.find_all(class_="sanskrit")]
    raw_corpus = "\n".join(text_blocks)
    with open("corpus.txt", "w", encoding="utf-8") as f:
        f.write(raw_corpus)
    return raw_corpus


# ── STEP 2: UNICODE NORMALIZATION (NFC) ─────────────────────────────────────
def step2_normalize(raw_text: str) -> str:
    """
    Canonical Decomposition followed by Canonical Composition (NFC).
    Ensures consistent representation of Devanāgarī combining characters.
    """
    return unicodedata.normalize("NFC", raw_text)


# ── STEP 3: SANDHI SPLITTING (VICCHEDA) ─────────────────────────────────────
def step3_sandhi_split(text: str) -> list[str]:
    """
    Euphonic coalescence reversal — split merged Sanskrit words.
    Example: 'ईशावास्यमिदम्' → ['ईश', 'आवास्यम्', 'इदम्']
    Requires: pip install sanskritNLP
    """
    from sanskritNLP.sandhi import SandhiSplitter  # type: ignore
    return SandhiSplitter().split(text)


# ── STEP 4: TOKENIZATION ────────────────────────────────────────────────────
def step4_tokenize(normalized_text: str) -> list[str]:
    """
    Devanāgarī-aware boundary detection.
    Splits on whitespace, daṇḍa (।), and double daṇḍa (॥).
    """
    tokens = re.split(r"[\s।॥]+", normalized_text)
    return [t for t in tokens if t.strip()]


# ── STEP 5: STOPWORD REMOVAL ─────────────────────────────────────────────────
STOPWORDS_SA = {"च", "एव", "तु", "इव", "हि", "वा", "न", "अथ", "इति",
                "यत्", "तत्", "इदम्", "एतत्", "अपि", "किम्", "कः"}

def step5_remove_stopwords(tokens: list[str]) -> list[str]:
    """Remove Sanskrit grammatical particles and indeclinables."""
    return [t for t in tokens if t not in STOPWORDS_SA]


# ── STEP 6: STEMMING / LEMMATIZATION ────────────────────────────────────────
def step6_lemmatize(clean_tokens: list[str]) -> list[str]:
    """
    Morphological analysis — not simple suffix stripping.
    Handles 8 cases × 3 numbers × multiple declension classes.
    Requires: pip install cltk
    """
    from cltk.lemmatize.sanskrit import SanskritLemmatizer  # type: ignore
    return SanskritLemmatizer().lemmatize(clean_tokens)


# ── STEP 7: POS TAGGING ──────────────────────────────────────────────────────
# Rule-based heuristics for Sanskrit POS detection
NOUN_SUFFIXES = ("न्", "म्", "ः", "स्", "त्")
VERB_SUFFIXES = ("ति", "ते", "न्ति", "न्ते", "तु")

def _get_pos(token: str) -> str:
    if token.endswith(VERB_SUFFIXES):
        return "VERB"
    if token.endswith(NOUN_SUFFIXES):
        return "NOUN"
    if token in {"सः", "तत्", "यः", "अहम्", "त्वम्"}:
        return "PRON"
    return "UNK"

def step7_pos_tag(lemmas: list[str]) -> dict[str, str]:
    """Rule-based POS tagging using Sanskrit morphological endings."""
    return {token: _get_pos(token) for token in lemmas}


# ── STEP 8: NER ANNOTATION ───────────────────────────────────────────────────
NER_DICT = {
    "Divine Beings (देवता)": [
        "ईश (Īśa)", "अग्नि (Agni)", "पूषन् (Pūṣan)",
        "सूर्य (Sūrya)", "मातरिश्वन् (Mātariśvan)", "प्रजापति (Prajāpati)",
    ],
    "Philosophical Concepts (तत्त्व)": [
        "ब्रह्म (Brahman)", "आत्मन् (Ātman)", "पुरुष (Puruṣa)",
        "विद्या (Vidyā)", "अविद्या (Avidyā)", "माया (Māyā)",
    ],
    "Cosmic Principles (लोक)": [
        "जगत् (Jagat)", "सम्भूति (Sambhūti)", "विनाश (Vināśa)",
        "अमृत (Amṛta)", "मृत्यु (Mṛtyu)",
    ],
    "States & Paths (मार्ग)": [
        "कर्म (Karma)", "उपासना (Upāsanā)", "मोक्ष (Mokṣa)",
        "संसार (Saṃsāra)", "धर्म (Dharma)",
    ],
    "Qualities (गुण)": [
        "पूर्ण (Pūrṇa)", "शुक्र (Śukra)", "अकाय (Akāya)",
        "शुद्ध (Śuddha)", "स्वयम्भू (Svayambhū)",
    ],
}

def step8_ner_annotate(tokens: list[str]) -> list[tuple[str, str]]:
    """Tag tokens with NER categories from the Vedic knowledge dictionary."""
    annotated = []
    for token in tokens:
        tag = "O"  # Outside
        for category, entities in NER_DICT.items():
            if any(token in entity for entity in entities):
                tag = category
                break
        annotated.append((token, tag))
    return annotated


# ── STEP 9: N-GRAM EXTRACTION ────────────────────────────────────────────────
def step9_extract_ngrams(tokens: list[str], n: int = 1):
    """Extract n-grams using NLTK. Returns list of n-gram tuples."""
    from nltk import ngrams  # type: ignore
    return list(ngrams(tokens, n))

def step9_all_ngrams(tokens: list[str]) -> dict[str, list]:
    return {
        "unigrams": step9_extract_ngrams(tokens, 1),
        "bigrams":  step9_extract_ngrams(tokens, 2),
        "trigrams": step9_extract_ngrams(tokens, 3),
    }


# ── STEP 10: EMOTION LEXICON TAGGING ────────────────────────────────────────
EMOTION_LEXICON = {
    "आनन्द (Ānanda / Bliss)":           {"words": ["पूर्ण", "अमृत", "मुक्त", "आनन्द", "कल्याण"], "count": 4},
    "भय (Bhaya / Fear)":                 {"words": ["अन्धतमस्", "असुर्य", "मृत्यु", "विनाश"],      "count": 3},
    "श्रद्धा (Śraddhā / Reverence)":    {"words": ["देव", "ईश", "पूषन्", "अग्नि", "सूर्य"],       "count": 3},
    "विस्मय (Vismaya / Wonder)":         {"words": ["अनेजत्", "जवीयस्", "परिभू", "स्वयम्भू"],     "count": 2},
    "वैराग्य (Vairāgya / Renunciation)": {"words": ["त्यक्त", "मा गृधः", "संन्यास", "शान्ति"],    "count": 3},
    "भक्ति (Bhakti / Devotion)":         {"words": ["नम", "विधेम", "पूषन्", "अग्ने"],             "count": 2},
    "जिज्ञासा (Jijñāsā / Inquiry)":     {"words": ["शुश्रुम", "धीर", "विचचक्षिरे"],              "count": 2},
    "लालसा (Mumukṣu / Longing)":        {"words": ["अपावृणु", "दृष्टये", "सत्यधर्म"],             "count": 1},
}

def step10_tag_emotions(tokens: list[str]) -> list[tuple[str, str]]:
    """Assign emotion labels to tokens using the Vedic Navarasa-adapted lexicon."""
    tagged = []
    for token in tokens:
        emotion = "neutral"
        for emo, data in EMOTION_LEXICON.items():
            if token in data["words"]:
                emotion = emo
                break
        tagged.append((token, emotion))
    return tagged


# ── STEP 11: SENTIMENT SCORING ───────────────────────────────────────────────
SENTIMENT_DICT = {
    # Positive (moksha / ānanda words) → +1
    "पूर्ण": 1, "अमृत": 1, "मुक्त": 1, "आनन्द": 1, "कल्याण": 1,
    "शान्ति": 1, "ब्रह्म": 1, "सत्य": 1, "धर्म": 1,
    # Negative (tamas / mṛtyu words) → -1
    "तमस्": -1, "मृत्यु": -1, "विनाश": -1, "असुर्य": -1,
}

def step11_sentiment_score(tokens: list[str]) -> dict:
    """
    Rule-based sentiment scoring.
    +1 for liberation/bliss words, -1 for darkness/death words.
    Returns raw score and normalised score per token.
    """
    raw_score = sum(SENTIMENT_DICT.get(t, 0) for t in tokens)
    norm_score = raw_score / len(tokens) if tokens else 0.0
    label = "positive" if norm_score > 0 else "negative" if norm_score < 0 else "neutral"
    return {"raw": raw_score, "normalised": round(norm_score, 4), "label": label}


# ── STEP 12: SLM / CHATBOT GENERATION ───────────────────────────────────────
# See 06_slm_chatbot.py for the full domain chatbot implementation.
# Architecture: keyword extraction → mantra retrieval → knowledge-graph answer generation


# ── PIPELINE METADATA (mirrors HTML UI data) ─────────────────────────────────
PIPELINE_STEPS = [
    {"id": 1,  "step": "Data Collection & Scraping",   "fn": step1_collect},
    {"id": 2,  "step": "Unicode Normalization (NFC)",   "fn": step2_normalize},
    {"id": 3,  "step": "Sandhi Splitting (Viccheda)",   "fn": step3_sandhi_split},
    {"id": 4,  "step": "Tokenization",                  "fn": step4_tokenize},
    {"id": 5,  "step": "Stopword Removal",              "fn": step5_remove_stopwords},
    {"id": 6,  "step": "Stemming / Lemmatization",      "fn": step6_lemmatize},
    {"id": 7,  "step": "POS Tagging",                   "fn": step7_pos_tag},
    {"id": 8,  "step": "NER Annotation",                "fn": step8_ner_annotate},
    {"id": 9,  "step": "N-Gram Extraction",             "fn": step9_all_ngrams},
    {"id": 10, "step": "Emotion Lexicon Tagging",       "fn": step10_tag_emotions},
    {"id": 11, "step": "Sentiment Scoring",             "fn": step11_sentiment_score},
    {"id": 12, "step": "SLM / Chatbot Generation",      "fn": None},  # see 06_slm_chatbot.py
]


# ── FULL PIPELINE RUNNER ─────────────────────────────────────────────────────
def run_pipeline(text: str) -> dict:
    """Execute all preprocessing steps and return structured output."""
    normalized  = step2_normalize(text)
    tokens      = step4_tokenize(normalized)          # skip sandhi: needs library
    clean       = step5_remove_stopwords(tokens)
    # lemmas    = step6_lemmatize(clean)              # skip: needs CLTK install
    pos_tags    = step7_pos_tag(clean)
    ner_tags    = step8_ner_annotate(clean)
    ngrams      = step9_all_ngrams(clean)
    emotions    = step10_tag_emotions(clean)
    sentiment   = step11_sentiment_score(clean)
    return {
        "tokens":   tokens,
        "clean":    clean,
        "pos":      pos_tags,
        "ner":      ner_tags,
        "ngrams":   ngrams,
        "emotions": emotions,
        "sentiment": sentiment,
    }


if __name__ == "__main__":
    sample = "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।"
    result = run_pipeline(sample)
    print(result)
