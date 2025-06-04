import { TarotCardData } from './types';

// Placeholder for a card back image (simple SVG)
export const CARD_BACK_IMAGE_DATA: string = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMzAwIDUwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzQ4MjY4QiIvPjxwYXRoIGQ9Ik0xNTAgMjQwIEMxNzAgMjEwLDIxMCAyMTAsMjMwIDI0MCBTMTkwIDI3MCwxNTAgMjQwWiBNMTUwIDI2MCBDMTMwIDI5MCw5MCAyOTAsNzAgMjYwIFMxMTggMjMwLDE1MCAyNjBaIiBmaWxsPSIjRkZGRDdCIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSAxNTAgMjUwKSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjI1MCIgcj0iNzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkQ3QiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHRleHQgeD0iNTAlIiB5PSI5MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI0ZGRkQ3QiI+TXlzdGljIFZpc2lvbjwvdGV4dD48L3N2Zz4=";

// Helper to create simple placeholder SVGs for card fronts
// Helper to create simple placeholder SVGs for card fronts

export const TAROT_DECK: TarotCardData[] = [
  {
    id: "fool",
    name: "The Fool",
    imageKeywords: "cliff,young_man,white_sun,dog",
    imageData: "/tarot-cards/fool.png",
    keywordsUpright: ["Beginnings", "Innocence", "Spontaneity", "Free Spirit"],
    keywordsReversed: ["Naivety", "Folly", "Recklessness", "Risk-Taking"],
    fullMeaningUpright: "Embark on a new journey with faith and optimism. Embrace the unknown, as innocence and purity will guide you.",
    fullMeaningReversed: "Be cautious of acting impulsively. You may be holding back due to fear or taking unnecessary risks."
  },
  {
    id: "magician",
    name: "The Magician",
    imageKeywords: "robed_figure,table,elements,infinity_symbol",
    imageData: "/tarot-cards/magician.png",
    keywordsUpright: ["Manifestation", "Resourcefulness", "Power", "Inspired Action"],
    keywordsReversed: ["Manipulation", "Poor Planning", "Untapped Talents", "Deceit"],
    fullMeaningUpright: "You have all the tools and resources to manifest your desires. It's time to take inspired action.",
    fullMeaningReversed: "Beware of illusions or deceptive tactics. Ensure you are using your power ethically."
  },
  {
    id: "highpriestess",
    name: "The High Priestess",
    imageKeywords: "seated_woman,pillars,scroll,crescent_moon",
    imageData: "/tarot-cards/highpriestess.png",
    keywordsUpright: ["Intuition", "Higher Powers", "Mystery", "Subconscious Mind"],
    keywordsReversed: ["Secrets Revealed", "Hidden Agendas", "Ignoring Intuition"],
    fullMeaningUpright: "Trust your intuition and look beyond the obvious. Spiritual insights are available to you.",
    fullMeaningReversed: "You may be ignoring your intuition, or something important is being kept from you."
  },
  {
    id: "empress",
    name: "The Empress",
    imageKeywords: "crowned_woman_seated,lush_nature,wheat_field",
    imageData: "/tarot-cards/empress.png",
    keywordsUpright: ["Femininity", "Beauty", "Nature", "Nurturing", "Abundance"],
    keywordsReversed: ["Creative Block", "Dependence", "Smothering", "Neglect"],
    fullMeaningUpright: "Connect with your nurturing side and embrace abundance. Time for creativity and fertility.",
    fullMeaningReversed: "You might feel a lack of creativity or a sense of being overly dependent. Nurture yourself."
  },
  {
    id: "emperor",
    name: "The Emperor",
    imageKeywords: "crowned_man_throne,rams_heads,scepter_orb",
    imageData: "/tarot-cards/emperor.png",
    keywordsUpright: ["Authority", "Structure", "Control", "Father Figure"],
    keywordsReversed: ["Domination", "Excessive Control", "Rigidity", "Lack of Discipline"],
    fullMeaningUpright: "Establish order and structure. Take on a leadership role with confidence and authority.",
    fullMeaningReversed: "Be wary of becoming too controlling or rigid. Lack of self-discipline may hinder progress."
  },
  {
    id: "hierophant",
    name: "The Hierophant",
    imageKeywords: "papal_figure,two_acolytes,crossed_keys",
    imageData: "/tarot-cards/hierophant.png",
    keywordsUpright: ["Tradition", "Conformity", "Morality", "Ethics", "Institutions"],
    keywordsReversed: ["Rebellion", "Unconventionality", "Challenging Norms"],
    fullMeaningUpright: "Seek guidance from established traditions and institutions. Conventional learning.",
    fullMeaningReversed: "You may be questioning traditions or feeling confined. Explore unconventional paths."
  },
  {
    id: "lovers",
    name: "The Lovers",
    imageKeywords: "adam_eve_angel_raphael,tree_knowledge",
    imageData: "/tarot-cards/lovers.png",
    keywordsUpright: ["Love", "Harmony", "Partnerships", "Choices", "Alignment"],
    keywordsReversed: ["Disharmony", "Imbalance", "Misalignment", "Conflict"],
    fullMeaningUpright: "Significant choices regarding relationships and values. Seek harmony and alignment.",
    fullMeaningReversed: "Facing conflict in relationships or a difficult choice. Re-evaluate your values."
  },
  {
    id: "chariot",
    name: "The Chariot",
    imageKeywords: "warrior_chariot,two_sphinxes_black_white",
    imageData: "/tarot-cards/chariot.png",
    keywordsUpright: ["Control", "Willpower", "Victory", "Assertion", "Determination"],
    keywordsReversed: ["Lack of Control", "Opposition", "No Direction", "Aggression"],
    fullMeaningUpright: "Harness willpower and determination to achieve victory. Stay focused on your goals.",
    fullMeaningReversed: "Feeling a lack of direction or control. Avoid aggression and re-evaluate your approach."
  },
  {
    id: "strength",
    name: "Strength",
    imageKeywords: "woman_lion_gentle,infinity_symbol_head",
    imageData: "/tarot-cards/strength.png",
    keywordsUpright: ["Strength", "Courage", "Patience", "Control", "Compassion"],
    keywordsReversed: ["Weakness", "Self-Doubt", "Lack of Discipline", "Raw Emotion"],
    fullMeaningUpright: "True strength comes from within, combining courage with compassion and patience.",
    fullMeaningReversed: "Experiencing self-doubt or raw impulses. Cultivate inner strength and self-discipline."
  },
  {
    id: "hermit",
    name: "The Hermit",
    imageKeywords: "old_man_lantern_staff,mountain_peak",
    imageData: "/tarot-cards/hermit.png",
    keywordsUpright: ["Soul-Searching", "Introspection", "Guidance", "Wisdom", "Solitude"],
    keywordsReversed: ["Isolation", "Loneliness", "Withdrawal", "Lost"],
    fullMeaningUpright: "Time for introspection and seeking inner wisdom. Solitude may bring profound insights.",
    fullMeaningReversed: "Be mindful of becoming overly isolated or lonely. You might be resisting guidance."
  },
  {
    id: "wheeloffortune",
    name: "Wheel of Fortune",
    imageKeywords: "sphinx_wheel_top,four_winged_creatures_corners",
    imageData: "/tarot-cards/wheeloffortune.png",
    keywordsUpright: ["Good Luck", "Karma", "Life Cycles", "Destiny", "Turning Point"],
    keywordsReversed: ["Bad Luck", "Resistance to Change", "Breaking Cycles"],
    fullMeaningUpright: "Expect changes and shifts in fortune, often for the better. Embrace the flow of life.",
    fullMeaningReversed: "Experiencing a downturn or resisting inevitable changes. Opportunity to break negative cycles."
  },
  {
    id: "justice",
    name: "Justice",
    imageKeywords: "seated_woman_scales_sword,crown_pillars",
    imageData: "/tarot-cards/justice.png",
    keywordsUpright: ["Justice", "Fairness", "Truth", "Cause and Effect", "Law"],
    keywordsReversed: ["Unfairness", "Lack of Accountability", "Dishonesty", "Bias"],
    fullMeaningUpright: "Seek truth and fairness. Decisions made now will have long-term consequences. Act with integrity.",
    fullMeaningReversed: "Facing an unfair situation or avoiding accountability. Be wary of dishonesty."
  },
  {
    id: "hangedman",
    name: "The Hanged Man",
    imageKeywords: "man_hanging_upside_down_foot,T_cross_tree",
    imageData: "/tarot-cards/hangedman.png",
    keywordsUpright: ["Suspension", "Letting Go", "New Perspective", "Sacrifice"],
    keywordsReversed: ["Stalling", "Resistance", "Useless Sacrifice", "Martyrdom"],
    fullMeaningUpright: "Pause and see things from a new perspective. Letting go or a sacrifice can lead to breakthroughs.",
    fullMeaningReversed: "Resisting change or making sacrifices that aren't beneficial. Avoid stalling."
  },
  {
    id: "death",
    name: "Death",
    imageKeywords: "skeleton_white_horse,scythe_flag_white_rose",
    imageData: "/tarot-cards/death.png",
    keywordsUpright: ["Endings", "Beginnings", "Change", "Transformation", "Transition"],
    keywordsReversed: ["Resistance to Change", "Fear of Endings", "Stagnation"],
    fullMeaningUpright: "Embrace profound change and transformation. End of one phase, beginning of another.",
    fullMeaningReversed: "Resisting necessary endings or fearing change, leading to stagnation. Release old patterns."
  },
  {
    id: "temperance",
    name: "Temperance",
    imageKeywords: "angel_pouring_water_cups,one_foot_water_one_land",
    imageData: "/tarot-cards/temperance.png",
    keywordsUpright: ["Balance", "Moderation", "Patience", "Purpose", "Harmony"],
    keywordsReversed: ["Imbalance", "Excess", "Extremes", "Lack of Patience"],
    fullMeaningUpright: "Find balance and moderation. Patience and a calm approach blend elements harmoniously.",
    fullMeaningReversed: "Experiencing imbalance or going to extremes. Lack of patience could lead to frustration."
  },
  {
    id: "devil",
    name: "The Devil",
    imageKeywords: "baphomet_figure_torch,inverted_pentagram",
    imageData: "/tarot-cards/devil.png",
    keywordsUpright: ["Bondage", "Addiction", "Materialism", "Temptation", "Shadow Self"],
    keywordsReversed: ["Breaking Free", "Detachment", "Reclaiming Power", "Awareness"],
    fullMeaningUpright: "Be aware of addictions, negative attachments, or limiting beliefs. Confront your shadow self.",
    fullMeaningReversed: "Becoming aware of and can break free from restrictive patterns. Reclaim your power."
  },
  {
    id: "tower",
    name: "The Tower",
    imageKeywords: "tower_struck_lightning,people_falling_flames",
    imageData: "/tarot-cards/tower.png",
    keywordsUpright: ["Sudden Upheaval", "Destruction", "Revelation", "Awakening"],
    keywordsReversed: ["Fear of Change", "Avoiding Disaster", "Resisting Upheaval"],
    fullMeaningUpright: "Expect sudden, dramatic change. This crisis often leads to a powerful awakening.",
    fullMeaningReversed: "Resisting an inevitable change or trying to avoid a necessary crisis. Face the change."
  },
  {
    id: "star",
    name: "The Star",
    imageKeywords: "naked_woman_kneeling_water,pouring_water_two_jugs",
    imageData: "/tarot-cards/star.png",
    keywordsUpright: ["Hope", "Faith", "Purpose", "Renewal", "Spirituality", "Inspiration"],
    keywordsReversed: ["Lack of Faith", "Despair", "Discouragement", "Hopelessness"],
    fullMeaningUpright: "Have faith and hope. This card brings renewal, inspiration, and serenity. Spiritual connection.",
    fullMeaningReversed: "Feeling discouraged or lacking faith. Reconnect with your inner light and inspiration."
  },
  {
    id: "moon",
    name: "The Moon",
    imageKeywords: "crayfish_water_two_towers,two_dogs_wolves_howling",
    imageData: "/tarot-cards/moon.png",
    keywordsUpright: ["Illusion", "Fear", "Anxiety", "Subconscious", "Intuition"],
    keywordsReversed: ["Release of Fear", "Clarity", "Understanding", "Truth Revealed"],
    fullMeaningUpright: "Navigate through illusion by trusting your intuition. Fears and anxieties may surface.",
    fullMeaningReversed: "Beginning to see through illusions and release old fears. Clarity is emerging."
  },
  {
    id: "sun",
    name: "The Sun",
    imageKeywords: "naked_child_white_horse,large_radiant_sun",
    imageData: "/tarot-cards/sun.png",
    keywordsUpright: ["Joy", "Success", "Vitality", "Optimism", "Enlightenment"],
    keywordsReversed: ["Blocked Joy", "Pessimism", "Lack of Success", "Delayed Happiness"],
    fullMeaningUpright: "Embrace joy, success, and vitality. Time of great optimism, clarity, and enlightenment.",
    fullMeaningReversed: "Temporary setbacks or lack of clarity dimming your joy. Focus on finding the light."
  },
  {
    id: "judgement",
    name: "Judgement",
    imageKeywords: "angel_gabriel_trumpet,people_rising_coffins",
    imageData: "/tarot-cards/judgement.png",
    keywordsUpright: ["Judgement", "Rebirth", "Inner Calling", "Absolution", "Awakening"],
    keywordsReversed: ["Self-Doubt", "Ignoring the Call", "Indecision", "Unfair Judgment"],
    fullMeaningUpright: "Time of reckoning and awakening. Reflect on past actions and make important decisions.",
    fullMeaningReversed: "Plagued by self-doubt or ignoring an inner calling. Avoid harsh self-judgment."
  },
  {
    id: "world",
    name: "The World",
    imageKeywords: "naked_woman_dancing_laurel_wreath,four_winged_creatures",
    imageData: "/tarot-cards/world.png",
    keywordsUpright: ["Completion", "Integration", "Accomplishment", "Travel", "Fulfillment"],
    keywordsReversed: ["Lack of Completion", "Incompleteness", "Shortcuts", "Feeling Stuck"],
    fullMeaningUpright: "Celebrate successful completion and achievement. Fulfillment, integration, wholeness.",
    fullMeaningReversed: "Feeling a lack of closure or that something is incomplete. Avoid taking shortcuts."
  }
];
