/**
 * ईशोपनिषद् Sanskrit NLP Pipeline
 * Tab 1: Dataset — Corpus & 18 Mantras
 *
 * Source: https://upanishads.org.in/upanishads/1
 * Recension: Kāṇva · Encoding: UTF-8 NFC · Unicode block: U+0900–U+097F
 * Corpus size: ~1,200 Devanāgarī tokens
 */

// ── ŚĀNTI PĀṬHA (Opening Invocation) ────────────────────────────────────────
const SHANTI_PATHA = {
  sanskrit:
    "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
  roman:
    "oṃ pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate | pūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate || oṃ śāntiḥ śāntiḥ śāntiḥ ||",
  english:
    "Om. That (Brahman) is infinite, this (universe) is infinite; from the infinite, the infinite is manifest; " +
    "taking the infinite from the infinite, only the infinite remains. Om Peace Peace Peace.",
};

// ── 18 MANTRAS ───────────────────────────────────────────────────────────────
const VERSES = [
  {
    id: 1,
    sanskrit:
      "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
    roman:
      "īśāvāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat | tena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||",
    translation:
      "All this — whatever exists in this changing universe — should be covered by the Lord. " +
      "Protect yourself through that renunciation. Do not covet anyone's wealth.",
    theme: "Renunciation & Divine Pervasion",
    emotion: "शान्ति (Śānti / Peace)",
    sentiment: "positive",
    domain_emotion: "vairāgya",
  },
  {
    id: 2,
    sanskrit:
      "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः । एवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥",
    roman:
      "kurvann eveha karmāṇi jijīviṣec chataṃ samāḥ | evaṃ tvayi nānyatheto'sti na karma lipyate nare ||",
    translation:
      "By doing works in this way (without attachment), one should wish to live a hundred years. " +
      "There is no other way for you. Thus, karma does not taint the person.",
    theme: "Karma Yoga",
    emotion: "उत्साह (Utsāha / Enthusiasm)",
    sentiment: "positive",
    domain_emotion: "dharma_bodha",
  },
  {
    id: 3,
    sanskrit:
      "असुर्या नाम ते लोका अन्धेन तमसावृताः । ताँस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः ॥",
    roman:
      "asuryā nāma te lokā andhena tamasāvṛtāḥ | tāṃs te pretyābhigacchanti ye ke cātmahano janāḥ ||",
    translation:
      "Those worlds of darkness are called 'asuric'. Those who slay the Self — those people — go there after death.",
    theme: "Warning / Consequence",
    emotion: "भय (Bhaya / Fear)",
    sentiment: "negative",
    domain_emotion: "bhaya",
  },
  {
    id: 4,
    sanskrit:
      "अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत् । तद्धावतोऽन्यानत्येति तिष्ठत् तस्मिन्नपो मातरिश्वा दधाति ॥",
    roman:
      "anejad ekaṃ manaso javīyo nainad devā āpnuvan pūrvam arṣat | tad dhāvato'nyān atyeti tiṣṭhat tasmin napo mātariśvā dadhāti ||",
    translation:
      "It is unmoving yet faster than the mind. The gods cannot catch it — it ran ahead. " +
      "Standing still, it outstrips those who run. The Wind supports all activities in it.",
    theme: "Nature of Brahman / Atman",
    emotion: "विस्मय (Vismaya / Wonder)",
    sentiment: "positive",
    domain_emotion: "adbhuta",
  },
  {
    id: 5,
    sanskrit:
      "तदेजति तन्नैजति तद्दूरे तद्वन्तिके । तदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः ॥",
    roman:
      "tad ejati tan naijati tad dūre tad v antike | tad antarasya sarvasya tad u sarvasyāsya bāhyataḥ ||",
    translation:
      "It moves and moves not. It is far yet near. It is within all this; It is also outside all this.",
    theme: "Paradox of Brahman",
    emotion: "विस्मय (Vismaya / Wonder)",
    sentiment: "neutral",
    domain_emotion: "adbhuta",
  },
  {
    id: 6,
    sanskrit:
      "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति । सर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥",
    roman:
      "yas tu sarvāṇi bhūtāny ātmany evānupaśyati | sarvabhūteṣu cātmānaṃ tato na vijugupsate ||",
    translation:
      "One who sees all beings in the Self itself, and the Self in all beings, he no longer hates or withdraws from anything.",
    theme: "Unity Consciousness / Advaita",
    emotion: "प्रेम (Prema / Love)",
    sentiment: "positive",
    domain_emotion: "ānanda",
  },
  {
    id: 7,
    sanskrit:
      "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः । तत्र को मोहः कः शोकः एकत्वमनुपश्यतः ॥",
    roman:
      "yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ | tatra ko mohaḥ kaḥ śokaḥ ekatvam anupaśyataḥ ||",
    translation:
      "For the knower in whom all beings have become the Self — what delusion, what grief can exist for one who sees only unity?",
    theme: "Liberation from Sorrow",
    emotion: "आनन्द (Ānanda / Bliss)",
    sentiment: "positive",
    domain_emotion: "ānanda",
  },
  {
    id: 8,
    sanskrit:
      "स पर्यगाच्छुक्रमकायमव्रणमस्नाविरं शुद्धमपापविद्धम् । कविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान्व्यदधाच्छाश्वतीभ्यः समाभ्यः ॥",
    roman:
      "sa paryagāc chukram akāyam avraṇam asnāviraṃ śuddham apāpaviddham | kavir manīṣī paribhūḥ svayambhūr yāthātathyato'rthān vyadadhāc chāśvatībhyaḥ samābhyaḥ ||",
    translation:
      "He pervades all, pure, bodiless, without wound, without sinews, spotless, untouched by sin — " +
      "the seer, the thinker, the all-encompassing, the self-existent.",
    theme: "Divine Attributes",
    emotion: "श्रद्धा (Śraddhā / Reverence)",
    sentiment: "positive",
    domain_emotion: "bhakti",
  },
  {
    id: 9,
    sanskrit:
      "अन्धं तमः प्रविशन्ति येऽविद्यामुपासते । ततो भूय इव ते तमो य उ विद्यायाँ रताः ॥",
    roman:
      "andhaṃ tamaḥ praviśanti ye'vidyām upāsate | tato bhūya iva te tamo ya u vidyāyāṃ ratāḥ ||",
    translation:
      "Into blinding darkness enter those who worship ignorance. " +
      "Into even greater darkness, as it were, enter those who delight in knowledge alone.",
    theme: "Danger of Ignorance & Exclusive Knowledge",
    emotion: "भय (Bhaya / Fear)",
    sentiment: "negative",
    domain_emotion: "bhaya",
  },
  {
    id: 10,
    sanskrit:
      "अन्यदेवाहुर्विद्ययाऽन्यदाहुरविद्यया । इति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥",
    roman:
      "anyad evāhur vidyayā'nyad āhur avidyayā | iti śuśruma dhīrāṇāṃ ye nas tad vicacakṣire ||",
    translation:
      "By knowledge (upāsanā) one thing is attained; by ignorance (ritual action), another. " +
      "Thus we have heard from the wise ones who explained this to us.",
    theme: "Synthesis of Knowledge & Action",
    emotion: "जिज्ञासा (Jijñāsā / Curiosity)",
    sentiment: "neutral",
    domain_emotion: "viveka",
  },
  {
    id: 11,
    sanskrit:
      "विद्यां चाविद्यां च यस्तद्वेदोभयँ सह । अविद्यया मृत्युं तीर्त्वा विद्ययामृतमश्नुते ॥",
    roman:
      "vidyāṃ cāvidyāṃ ca yas tad vedobhayaṃ saha | avidyayā mṛtyuṃ tīrtvā vidyayāmṛtam aśnute ||",
    translation:
      "One who knows both knowledge and ignorance together — by ignorance crossing death, by knowledge attaining immortality.",
    theme: "Integration / Immortality",
    emotion: "आशा (Āśā / Hope)",
    sentiment: "positive",
    domain_emotion: "moksha_kāṅkṣā",
  },
  {
    id: 12,
    sanskrit:
      "अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते । ततो भूय इव ते तमो य उ सम्भूत्याँ रताः ॥",
    roman:
      "andhaṃ tamaḥ praviśanti ye'sambhūtim upāsate | tato bhūya iva te tamo ya u sambhūtyāṃ ratāḥ ||",
    translation:
      "Into blinding darkness enter those who worship the unmanifest. " +
      "Into even greater darkness enter those devoted only to the manifest.",
    theme: "Warning on Incomplete Practice",
    emotion: "भय (Bhaya / Fear)",
    sentiment: "negative",
    domain_emotion: "bhaya",
  },
  {
    id: 13,
    sanskrit:
      "अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात् । इति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥",
    roman:
      "anyad evāhuḥ sambhavād anyad āhur asambhavāt | iti śuśruma dhīrāṇāṃ ye nas tad vicacakṣire ||",
    translation: "By the manifest, one thing is attained; by the unmanifest, another. Thus we heard from the wise.",
    theme: "Wisdom of Sages",
    emotion: "श्रद्धा (Śraddhā / Reverence)",
    sentiment: "positive",
    domain_emotion: "bhakti",
  },
  {
    id: 14,
    sanskrit:
      "सम्भूतिं च विनाशं च यस्तद्वेदोभयँ सह । विनाशेन मृत्युं तीर्त्वा सम्भूत्यामृतमश्नुते ॥",
    roman:
      "sambhūtiṃ ca vināśaṃ ca yas tad vedobhayaṃ saha | vināśena mṛtyuṃ tīrtvā sambhūtyāmṛtam aśnute ||",
    translation:
      "One who knows both manifest and unmanifest — crossing death through the perishable, " +
      "one attains immortality through the imperishable.",
    theme: "Integration / Immortality",
    emotion: "आनन्द (Ānanda / Bliss)",
    sentiment: "positive",
    domain_emotion: "moksha_kāṅkṣā",
  },
  {
    id: 15,
    sanskrit:
      "हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् । तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥",
    roman:
      "hiraṇmayena pātreṇa satyasyāpihitaṃ mukham | tat tvaṃ pūṣann apāvṛṇu satyadharmāya dṛṣṭaye ||",
    translation:
      "The face of Truth is covered by a golden vessel. Remove it, O Pūṣan (Sun), " +
      "so that I — whose nature is truth and righteousness — may behold it.",
    theme: "Prayer / Revelation of Truth",
    emotion: "लालसा (Lālasā / Longing)",
    sentiment: "positive",
    domain_emotion: "mumukṣutā",
  },
  {
    id: 16,
    sanskrit:
      "पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन्समूह । तेजो यत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि ॥",
    roman:
      "pūṣann ekarṣe yama sūrya prājāpatya vyūha raśmīn samūha | tejo yat te rūpaṃ kalyāṇatamaṃ tat te paśyāmi yo'sāv asau puruṣaḥ so'ham asmi ||",
    translation:
      "O Pūṣan, sole traveller, Sun — spread your rays. That most auspicious form of yours I behold. " +
      "That Puruṣa who is there — that am I (So'ham Asmi).",
    theme: "So'ham / I Am That",
    emotion: "आनन्द (Ānanda / Bliss)",
    sentiment: "positive",
    domain_emotion: "ānanda",
  },
  {
    id: 17,
    sanskrit:
      "वायुरनिलममृतमथेदं भस्मान्तँ शरीरम् । ॐ क्रतो स्मर कृतँ स्मर क्रतो स्मर कृतँ स्मर ॥",
    roman:
      "vāyur anilam amṛtam athedaṃ bhasmāntaṃ śarīram | oṃ krato smara kṛtaṃ smara krato smara kṛtaṃ smara ||",
    translation:
      "May this breath merge with the immortal air; now this body ends in ashes. " +
      "Om, O mind, remember! Remember all that has been done!",
    theme: "Death / Remembrance / Surrender",
    emotion: "करुणा (Karuṇā / Compassion)",
    sentiment: "neutral",
    domain_emotion: "vairāgya",
  },
  {
    id: 18,
    sanskrit:
      "अग्ने नय सुपथा राये अस्मान्विश्वानि देव वयुनानि विद्वान् । युयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नम उक्तिं विधेम ॥",
    roman:
      "agne naya supathā rāye asmānviśvāni deva vayunāni vidvān | yuyodhyasmajjuhurāṇameno bhūyiṣṭhāṃ te nama uktiṃ vidhema ||",
    translation:
      "O Agni, lead us by the good path to prosperity (liberation). O God, knowing all our deeds, " +
      "remove from us crooked sin. We offer you the most abundant obeisance.",
    theme: "Final Prayer / Liberation",
    emotion: "भक्ति (Bhakti / Devotion)",
    sentiment: "positive",
    domain_emotion: "bhakti",
  },
];

// ── CORPUS STATS ─────────────────────────────────────────────────────────────
const CORPUS_STATS = {
  total_mantras: 18,
  total_tokens: 108,
  ner_classes: 5,
  emotions: 8,
  pipeline_steps: 12,
  unicode_block: "U+0900–U+097F",
  encoding: "UTF-8 NFC",
  raw_tokens_approx: 1200,
};

module.exports = { SHANTI_PATHA, VERSES, CORPUS_STATS };
