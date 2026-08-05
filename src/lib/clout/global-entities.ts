/**
 * GLOBAL POP CULTURE CELEB & ENTITY MATRIX (global-entities.ts)
 * Comprehensive taxonomy of US celebs and global international equivalents.
 */

import type { CloutRegionId } from "./regions";

export interface GlobalEntitySpec {
  id: string;
  name: string;
  region: CloutRegionId;
  subculture: string;
  archetype: string;
  defaultHook: string;
  defaultCaption: string;
}

export const GLOBAL_ENTITY_MATRIX: readonly GlobalEntitySpec[] = [
  // --- US / NORTH AMERICA ---
  {
    id: "DRAKE",
    name: "Drake",
    region: "US",
    subculture: "US Underground & Music",
    archetype: "Volume & Rollout Strategist",
    defaultHook: "Drake’s rollout feels less like an album and more like a weather system.",
    defaultCaption: "Drake is testing whether attention volume still converts into dominance."
  },
  {
    id: "TAYLOR_SWIFT",
    name: "Taylor Swift",
    region: "US",
    subculture: "US Mainstream Pop Culture",
    archetype: "Fandom Economic Engine",
    defaultHook: "Taylor Swift’s Eras tour is a multi-billion dollar economic stimulus package.",
    defaultCaption: "Swifties are proving that superfan loyalty is the strongest currency in music."
  },
  {
    id: "BEYONCE",
    name: "Beyoncé",
    region: "US",
    subculture: "US Mainstream Pop Culture",
    archetype: "Cultural Institution",
    defaultHook: "Beyoncé’s genre shifts are corporate-level rebranding masterclasses.",
    defaultCaption: "Country, house, or pop—Beyoncé reclaims genres by redefining their aesthetic."
  },
  {
    id: "TRAVIS_SCOTT",
    name: "Travis Scott",
    region: "US",
    subculture: "US Underground & Music",
    archetype: "Architectural Live Spectacle",
    defaultHook: "Travis Scott turned concert stage design into box office cinema.",
    defaultCaption: "Live shows are no longer tours—they are real-time movie premieres."
  },
  {
    id: "CARTI",
    name: "Playboi Carti",
    region: "US",
    subculture: "US Underground & Music",
    archetype: "Silent Mystery Marketer",
    defaultHook: "Carti proved that total silence creates 10x more noise than a promo tour.",
    defaultCaption: "The Opium aesthetic wins by giving the audience zero context."
  },
  {
    id: "KENDRICK_LAMAR",
    name: "Kendrick Lamar",
    region: "US",
    subculture: "US Hip-Hop & Geography",
    archetype: "Authentic Cultural Anchor",
    defaultHook: "Kendrick proved that local authentic culture will always beat global pop polish.",
    defaultCaption: "When a diss track becomes a national holiday, the strategy shifted."
  },
  {
    id: "KAI_CENAT",
    name: "Kai Cenat",
    region: "US",
    subculture: "US Streaming & Twitch",
    archetype: "24/7 Live Reality TV",
    defaultHook: "Kai Cenat built a bigger television studio in his bedroom than network TV.",
    defaultCaption: "Continuous live streaming has completely replaced traditional late-night TV."
  },
  {
    id: "MRBEAST",
    name: "MrBeast",
    region: "US",
    subculture: "US Creator Economy",
    archetype: "Hollywood Production Scale",
    defaultHook: "MrBeast spent $5M on a video, while a 16-year-old out-viewed him with an iPhone.",
    defaultCaption: "Production budget no longer guarantees retention—authenticity does."
  },
  {
    id: "JOE_ROGAN",
    name: "Joe Rogan",
    region: "US",
    subculture: "US Long-Form Podcast",
    archetype: "Cultural Conversation Setter",
    defaultHook: "A 3-hour Rogan clip moves public discourse faster than national news.",
    defaultCaption: "Unfiltered long-form audio remains the supreme trust medium."
  },
  {
    id: "KIM_KARDASHIAN",
    name: "Kim Kardashian",
    region: "US",
    subculture: "US Pop Culture & Shapewear",
    archetype: "Personal Brand Monetizer",
    defaultHook: "SKIMS turned influencer merch into a $4B fashion conglomerate.",
    defaultCaption: "Attention captured in 2007 is still compounding return on capital in 2026."
  },

  // --- UK / EUROPE ---
  {
    id: "CENTRAL_CEE",
    name: "Central Cee",
    region: "UK_EU",
    subculture: "UK & European Subcultures",
    archetype: "UK Luxury-Noir Pioneer",
    defaultHook: "Central Cee’s current visual lane makes rap look expensive again.",
    defaultCaption: "Toronto-to-London is the coldest rap bridge right now."
  },
  {
    id: "STORMZY",
    name: "Stormzy",
    region: "UK_EU",
    subculture: "UK Grime & Philanthropy",
    archetype: "UK Cultural Ambassador",
    defaultHook: "Stormzy took UK Grime from London street corners to Glastonbury headliners.",
    defaultCaption: "Building institutions matters more than chasing single-week stream spikes."
  },
  {
    id: "ROSALIA",
    name: "Rosalía",
    region: "UK_EU",
    subculture: "Spanish Avant-Garde Pop",
    archetype: "Flamenco-Futurism Disruptor",
    defaultHook: "Rosalía merged traditional Flamenco with industrial trap and avant-garde fashion.",
    defaultCaption: "Motomami proved that high-art experimentation can conquer global charts."
  },
  {
    id: "ADELE",
    name: "Adele",
    region: "UK_EU",
    subculture: "Global Ballad Powerhouse",
    archetype: "Event Release Vocalist",
    defaultHook: "Adele disappears for 4 years, drops one heartbreak ballad, and breaks Spotify.",
    defaultCaption: "Scarcity of release makes every album an international event."
  },

  // --- LATAM / SPANISH WORLD ---
  {
    id: "BAD_BUNNY",
    name: "Bad Bunny",
    region: "LATAM",
    subculture: "LatAm & Spanish Pop",
    archetype: "Global Reggaeton King",
    defaultHook: "Bad Bunny became the most streamed artist on Earth without singing in English.",
    defaultCaption: "Unfiltered Spanish language reggaeton is the dominant global pop force."
  },
  {
    id: "PESO_PLUMA",
    name: "Peso Pluma",
    region: "LATAM",
    subculture: "Corridos Tumbados",
    archetype: "Regional Mexican Disruptor",
    defaultHook: "Regional Mexican brass and acoustic guitars just out-streamed global trap.",
    defaultCaption: "Corridos Tumbados is the fastest growing global subculture sound right now."
  },
  {
    id: "KAROL_G",
    name: "Karol G",
    region: "LATAM",
    subculture: "Colombian Urban Pop",
    archetype: "Bichota Stadium Empire",
    defaultHook: "Karol G sold out stadium tours across Europe and Latin America in record time.",
    defaultCaption: "Empowerment anthems paired with Latin urban rhythms dominate global stadiums."
  },
  {
    id: "IBAI_LLANOS",
    name: "Ibai Llanos",
    region: "LATAM",
    subculture: "Spanish Twitch & Events",
    archetype: "Event Live Streamer",
    defaultHook: "Ibai’s Velada streamer boxing match broke the world record for Twitch viewers.",
    defaultCaption: "Spanish-language creator events consistently out-view traditional television."
  },

  // --- ASIA / K-POP / ANIME ---
  {
    id: "BTS",
    name: "BTS",
    region: "ASIA_KPOP",
    subculture: "K-Pop Global Phenomenon",
    archetype: "ARMY Superfan Ecosystem",
    defaultHook: "BTS superfans organize online campaigns faster than major political parties.",
    defaultCaption: "K-Pop fan mobilization is the gold standard for global digital community."
  },
  {
    id: "BLACKPINK",
    name: "BLACKPINK",
    region: "ASIA_KPOP",
    subculture: "K-Pop Fashion & Pop",
    archetype: "Global Luxury Ambassadors",
    defaultHook: "BLACKPINK members individually represent Chanel, Dior, YSL, and Celine.",
    defaultCaption: "K-Pop stars are the primary aesthetic anchors for European luxury houses."
  },
  {
    id: "NEWJEANS",
    name: "NewJeans",
    region: "ASIA_KPOP",
    subculture: "Y2K K-Pop Revival",
    archetype: "Nostalgia Aesthetic Wave",
    defaultHook: "NewJeans brought 2000s R&B nostalgia back to global charts in 15-second clips.",
    defaultCaption: "Y2K minimalism is outperforming hyper-produced K-Pop formulas."
  },
  {
    id: "IRONMOUSE",
    name: "Ironmouse & Hololive",
    region: "ASIA_KPOP",
    subculture: "VTuber Streaming Economy",
    archetype: "Virtual Avatar Powerhouse",
    defaultHook: "Virtual anime streamers are pulling higher monthly subscriptions than real actors.",
    defaultCaption: "The avatar streaming economy is a mainstream multi-million dollar force."
  },

  // --- AFRICA / AFROBEATS ---
  {
    id: "BURNA_BOY",
    name: "Burna Boy",
    region: "AFRICA",
    subculture: "Afrobeats Global Giant",
    archetype: "African Giant Stadium Act",
    defaultHook: "Burna Boy selling out Madison Square Garden proved Afrobeats is global main-stage pop.",
    defaultCaption: "West African polyrhythms are the sonic backdrop of current pop radio."
  },
  {
    id: "WIZKID",
    name: "Wizkid",
    region: "AFRICA",
    subculture: "Afrobeats Smooth R&B",
    archetype: "Global Cross-Over Pioneer",
    defaultHook: "Wizkid’s Essence became the unofficial summer anthem across US and UK charts.",
    defaultCaption: "Lagos-to-London cross-over sound redefined global summer playlists."
  },
  {
    id: "TYLA",
    name: "Tyla",
    region: "AFRICA",
    subculture: "Amapiano Pop Fusion",
    archetype: "Amapiano Global Breakout",
    defaultHook: "Tyla’s Water dance challenge turned South African Amapiano into a Grammy winner.",
    defaultCaption: "TikTok dance challenges paired with authentic Amapiano log-drum basslines win."
  },

  // --- GULF / MENA & INDIA ---
  {
    id: "SHAH_RUKH_KHAN",
    name: "Shah Rukh Khan",
    region: "IN",
    subculture: "Bollywood & South Asian Cinema",
    archetype: "Global Cinema Icon",
    defaultHook: "Shah Rukh Khan’s box office comebacks generate global theatrical record numbers.",
    defaultCaption: "South Asian global cinema holds the highest audience loyalty on Earth."
  },
  {
    id: "AP_DHILLON",
    name: "AP Dhillon & Diljit Dosanjh",
    region: "IN",
    subculture: "Punjabi Trap Crossover",
    archetype: "Punjabi Global Wave",
    defaultHook: "Diljit Dosanjh headlining Coachella brought Punjabi music to US stadium stages.",
    defaultCaption: "Punjabi trap and folk vocals are bridging North America, the UK, and South Asia."
  },
  {
    id: "YOASOBI",
    name: "YOASOBI",
    region: "JP",
    subculture: "J-Pop & Anime Soundtracks",
    archetype: "Anime-Internet Chart Engine",
    defaultHook: "YOASOBI turns anime openings into global TikTok audio beds overnight.",
    defaultCaption: "Japanese chart culture is the quiet backbone of worldwide short-form audio.",
  },
  {
    id: "HIKAKIN",
    name: "Hikakin",
    region: "JP",
    subculture: "Japanese YouTube",
    archetype: "JP Platform Institution",
    defaultHook: "Japanese YouTube stars still run closed ecosystems Western brands cannot copy-paste.",
    defaultCaption: "Local platform kings define virality rules before global apps catch up.",
  },
  {
    id: "KSI_AU",
    name: "KSI / Sidemen-adjacent AU export",
    region: "OCEANIA",
    subculture: "AU/UK Creator Crossover",
    archetype: "Anglosphere Creator Export",
    defaultHook: "Anglosphere creator networks move AU audiences through UK formats in hours.",
    defaultCaption: "Oceania is not a lag market — it is an early format lab for English internet.",
  },
  {
    id: "THE_KID_LAROI",
    name: "The Kid LAROI",
    region: "OCEANIA",
    subculture: "Australian Pop/Rap Export",
    archetype: "AU Global Breakout",
    defaultHook: "Australian voices keep landing US #1s without abandoning local cadence.",
    defaultCaption: "AU export pop is a permanent lane, not a one-hit anomaly.",
  },

  // --- GLOBAL SPORTS & ICONS ---
  {
    id: "MESSI",
    name: "Lionel Messi",
    region: "GLOBAL_SPORTS",
    subculture: "Global Football & MLS",
    archetype: "GOAT Athletic Icon",
    defaultHook: "Messi moving to Inter Miami multiplied MLS streaming subscriptions by 10x overnight.",
    defaultCaption: "Single-athlete star power can move an entire sports league's global enterprise value."
  },
  {
    id: "CRISTIANO_RONALDO",
    name: "Cristiano Ronaldo",
    region: "GLOBAL_SPORTS",
    subculture: "Global Football & Saudi Pro League",
    archetype: "600M Social Footprint",
    defaultHook: "Ronaldo launching a YouTube channel broke the world record for 1M subs in 90 minutes.",
    defaultCaption: "Ronaldo's personal distribution footprint beats traditional television networks."
  }
] as const;

export function findGlobalEntity(query: string): GlobalEntitySpec | undefined {
  const norm = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, "_");
  return GLOBAL_ENTITY_MATRIX.find((e) => e.id === norm || e.id.includes(norm) || norm.includes(e.id));
}
