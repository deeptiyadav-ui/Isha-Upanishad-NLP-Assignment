"""
ईशोपनिषद् Sanskrit NLP Pipeline
Tab 5: Sentiment Analysis & Emotion Detection

Corpus-level sentiment distribution, per-mantra emotion tagging,
and bubble-chart frequency data for the 18-mantra corpus.
"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Literal

# Import corpus data (from Tab 1 / 01_dataset.py)
# from dataset import VERSES, EMOTION_LEXICON
# For standalone use, abbreviated verse data is included below.

# ── TYPE ALIASES ─────────────────────────────────────────────────────────────
Sentiment = Literal["positive", "negative", "neutral"]


# ── SENTIMENT SCORING DICTIONARY ─────────────────────────────────────────────
# Domain-specific lexicon for Vedic/Upanishadic text
SENTIMENT_DICT: dict[str, int] = {
    # Positive (+1) — liberation, bliss, divine presence
    "पूर्ण": 1,    # fullness/completeness
    "अमृत": 1,    # immortality
    "मुक्त": 1,    # freed
    "आनन्द": 1,   # bliss
    "कल्याण": 1,  # auspiciousness
    "शान्ति": 1,   # peace
    "ब्रह्म": 1,  # Brahman (absolute)
    "सत्य": 1,    # truth
    "धर्म": 1,    # righteousness
    "विद्या": 1,  # knowledge
    "मोक्ष": 1,   # liberation
    # Negative (-1) — darkness, death, ignorance
    "तमस्": -1,   # darkness
    "मृत्यु": -1, # death
    "विनाश": -1,  # destruction
    "असुर्य": -1, # demonic
    "अन्ध": -1,   # blind
    "अविद्या": -1, # ignorance (contextual — see Mantra 11)
    "मोह": -1,    # delusion
    "शोक": -1,    # grief
}


@dataclass
class VerseRecord:
    """Minimal verse record needed for sentiment analysis."""
    id: int
    sentiment: Sentiment
    emotion: str
    domain_emotion: str
    theme: str
    first_line: str   # first ~45 chars of Sanskrit


# ── CORPUS SENTIMENT DATA ─────────────────────────────────────────────────────
# Pre-computed labels for the 18 mantras (output of rule-based scoring)
VERSE_SENTIMENTS: list[VerseRecord] = [
    VerseRecord(1,  "positive", "शान्ति (Śānti / Peace)",            "vairāgya",       "Renunciation & Divine Pervasion",       "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां…"),
    VerseRecord(2,  "positive", "उत्साह (Utsāha / Enthusiasm)",       "dharma_bodha",   "Karma Yoga",                            "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं…"),
    VerseRecord(3,  "negative", "भय (Bhaya / Fear)",                   "bhaya",          "Warning / Consequence",                 "असुर्या नाम ते लोका अन्धेन तमसावृताः…"),
    VerseRecord(4,  "positive", "विस्मय (Vismaya / Wonder)",           "adbhuta",        "Nature of Brahman / Atman",             "अनेजदेकं मनसो जवीयो नैनद्देवा…"),
    VerseRecord(5,  "neutral",  "विस्मय (Vismaya / Wonder)",           "adbhuta",        "Paradox of Brahman",                    "तदेजति तन्नैजति तद्दूरे तद्वन्तिके…"),
    VerseRecord(6,  "positive", "प्रेम (Prema / Love)",                "ānanda",         "Unity Consciousness / Advaita",         "यस्तु सर्वाणि भूतान्यात्मन्येवानु…"),
    VerseRecord(7,  "positive", "आनन्द (Ānanda / Bliss)",              "ānanda",         "Liberation from Sorrow",                "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्…"),
    VerseRecord(8,  "positive", "श्रद्धा (Śraddhā / Reverence)",      "bhakti",         "Divine Attributes",                     "स पर्यगाच्छुक्रमकायमव्रणमस्नाविरं…"),
    VerseRecord(9,  "negative", "भय (Bhaya / Fear)",                   "bhaya",          "Danger of Ignorance & Knowledge",       "अन्धं तमः प्रविशन्ति येऽविद्यामुपा…"),
    VerseRecord(10, "neutral",  "जिज्ञासा (Jijñāsā / Curiosity)",     "viveka",         "Synthesis of Knowledge & Action",       "अन्यदेवाहुर्विद्ययाऽन्यदाहुरविद्यया…"),
    VerseRecord(11, "positive", "आशा (Āśā / Hope)",                    "moksha_kāṅkṣā", "Integration / Immortality",             "विद्यां चाविद्यां च यस्तद्वेदोभयँ…"),
    VerseRecord(12, "negative", "भय (Bhaya / Fear)",                   "bhaya",          "Warning on Incomplete Practice",        "अन्धं तमः प्रविशन्ति येऽसम्भूतिमु…"),
    VerseRecord(13, "positive", "श्रद्धा (Śraddhā / Reverence)",      "bhakti",         "Wisdom of Sages",                       "अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात्…"),
    VerseRecord(14, "positive", "आनन्द (Ānanda / Bliss)",              "moksha_kāṅkṣā", "Integration / Immortality",             "सम्भूतिं च विनाशं च यस्तद्वेदोभयँ…"),
    VerseRecord(15, "positive", "लालसा (Lālasā / Longing)",            "mumukṣutā",      "Prayer / Revelation of Truth",          "हिरण्मयेन पात्रेण सत्यस्यापिहितं…"),
    VerseRecord(16, "positive", "आनन्द (Ānanda / Bliss)",              "ānanda",         "So'ham / I Am That",                    "पूषन्नेकर्षे यम सूर्य प्राजापत्य…"),
    VerseRecord(17, "neutral",  "करुणा (Karuṇā / Compassion)",         "vairāgya",       "Death / Remembrance / Surrender",       "वायुरनिलममृतमथेदं भस्मान्तँ शरीरम्…"),
    VerseRecord(18, "positive", "भक्ति (Bhakti / Devotion)",           "bhakti",         "Final Prayer / Liberation",             "अग्ने नय सुपथा राये अस्मान्विश्वानि…"),
]


# ── CORPUS-LEVEL METRICS ─────────────────────────────────────────────────────
def compute_corpus_sentiment(verses: list[VerseRecord]) -> dict:
    """Aggregate sentiment counts and percentages for the full corpus."""
    total = len(verses)
    pos   = sum(1 for v in verses if v.sentiment == "positive")
    neg   = sum(1 for v in verses if v.sentiment == "negative")
    neu   = sum(1 for v in verses if v.sentiment == "neutral")
    return {
        "total": total,
        "positive": {"count": pos, "pct": round(pos / total * 100)},
        "negative": {"count": neg, "pct": round(neg / total * 100)},
        "neutral":  {"count": neu, "pct": round(neu / total * 100)},
    }


def compute_emotion_frequency(verses: list[VerseRecord]) -> dict[str, int]:
    """Count how many mantras express each emotion."""
    freq: dict[str, int] = {}
    for v in verses:
        freq[v.emotion] = freq.get(v.emotion, 0) + 1
    return dict(sorted(freq.items(), key=lambda x: x[1], reverse=True))


def score_tokens(tokens: list[str]) -> dict:
    """
    Rule-based sentiment scoring for an arbitrary token list.
    +1 for positive Vedic vocabulary, -1 for negative.
    """
    raw   = sum(SENTIMENT_DICT.get(t, 0) for t in tokens)
    norm  = raw / len(tokens) if tokens else 0.0
    label: Sentiment = "positive" if norm > 0 else "negative" if norm < 0 else "neutral"
    return {"raw": raw, "normalised": round(norm, 4), "label": label}


# ── MAIN ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    stats = compute_corpus_sentiment(VERSE_SENTIMENTS)
    print("Corpus Sentiment Distribution")
    print(f"  Positive: {stats['positive']['count']} mantras ({stats['positive']['pct']}%)")
    print(f"  Negative: {stats['negative']['count']} mantras ({stats['negative']['pct']}%)")
    print(f"  Neutral : {stats['neutral']['count']}  mantras ({stats['neutral']['pct']}%)")

    print("\nEmotion Frequency (per mantra):")
    for emotion, count in compute_emotion_frequency(VERSE_SENTIMENTS).items():
        print(f"  {emotion}: {count}")
