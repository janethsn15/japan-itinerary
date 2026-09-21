"use client";

import { useEffect, useMemo, useState } from "react";

type City = "Tokyo" | "Shibu Onsen" | "Kyoto" | "Osaka";

type Day = {
  id: number;
  date: string;
  weekday: string;
  city: City;
  japanese: string;
  title: string;
  summary: string;
  events: { time: string; title: string; note?: string; url?: string; linkLabel?: string }[];
  stay: string;
  transfer?: string;
};

const days: Day[] = [
  {
    id: 1,
    date: "09",
    weekday: "WED",
    city: "Tokyo",
    japanese: "東京",
    title: "Haneda to Shinjuku after dark",
    summary: "Check in, shop Isetan, dress for the night, then follow Shinjuku's neon from Godzilla Head to Golden Gai.",
    events: [
      { time: "15:05", title: "Delta 7 arrives at Haneda", note: "From Los Angeles · allow 60–90 minutes for immigration and bags" },
      {
        time: "17:00",
        title: "Head straight to Shinjuku",
        note: "Airport bus to Shinjuku Station West Exit is about 35 minutes; allow extra time for traffic",
        url: "https://tokyo-haneda.com/en/access/bus/index.html",
        linkLabel: "HANEDA ACCESS",
      },
      { time: "18:00", title: "Check in at the Shinjuku hotel", note: "Drop bags and keep the first-night essentials handy" },
      {
        time: "18:30",
        title: "Isetan Shinjuku",
        note: "Shop the main building before its 8 PM close; the seventh-floor restaurants stay open later",
        url: "https://cp.mistore.jp/global/en/shinjuku.html",
        linkLabel: "ISETAN DETAILS",
      },
      { time: "20:00", title: "Back to the hotel to get ready", note: "Freshen up, change, and have a quick rest before the late night" },
      {
        time: "21:15",
        title: "Godzilla Head from Godzilla Road",
        note: "See the landmark above Shinjuku Toho Building; close-up terrace access is currently limited to hotel guests and lounge customers",
        url: "https://gracery.com/shinjuku/page/godzilla/en/",
        linkLabel: "GODZILLA GUIDE",
      },
      {
        time: "21:45",
        title: "Golden Gai bar hop",
        note: "Most tiny bars open around 8 PM; choose visitor-friendly signs and ask before taking photos",
        url: "https://www.gotokyo.org/en/spot/62/index.html",
        linkLabel: "GOLDEN GAI GUIDE",
      },
      {
        time: "23:30",
        title: "Kabukichō late-night circuit",
        note: "Choose Kabuki Hall for food and music, an arcade, karaoke, or a late bar; politely ignore street touts",
        url: "https://www.tokyu-kabukicho-tower.jp/entertainment_and_restaurant/",
        linkLabel: "KABUKICHO TOWER",
      },
      {
        time: "00:30",
        title: "Optional love-hotel stop or stay",
        note: "HOTEL ATLAS is an adults-only Kabukichō option with short-rest and overnight plans; reserve through its official site or Booking.com",
        url: "https://hotel-atlas.jp/reserve/",
        linkLabel: "HOTEL ATLAS",
      },
    ],
    stay: "Shinjuku · Night 1",
  },
  {
    id: 2,
    date: "10",
    weekday: "THU",
    city: "Kyoto",
    japanese: "京都",
    title: "Kyoto arrival & neighborhood night",
    summary: "Arrive at your Higashiyama hotel at 3 PM, eat through Nishiki Market, then learn the streets around your stay.",
    events: [
      { time: "08:30", title: "Check out in Shinjuku", note: "A comfortable start after the first-night bar crawl" },
      { time: "09:30", title: "Shinjuku to Shinagawa", note: "Use a local JR train and allow time to find the Shinkansen platforms" },
      { time: "10:30", title: "Shinkansen to Kyoto", note: "Choose a morning departure that leaves plenty of time for the 3 PM hotel arrival" },
      {
        time: "15:00",
        title: "Arrive at the Kyoto hotel",
        note: "542-2 Furukawachō, Higashiyama Ward, Kyoto, 605-0026, Japan · check in and drop bags",
        url: "https://www.google.com/maps/search/?api=1&query=542-2+Furukawacho%2C+Higashiyama+Ward%2C+Kyoto%2C+605-0026%2C+Japan",
        linkLabel: "OPEN IN MAPS",
      },
      {
        time: "15:30",
        title: "Nishiki Market food stop",
        note: "Try a late lunch and snacks; individual shops keep their own hours, so start here soon after check-in",
        url: "https://www.kyoto-nishiki.or.jp/",
        linkLabel: "NISHIKI MARKET",
      },
      { time: "17:30", title: "Explore the hotel neighborhood", note: "Find the closest station, convenience store, breakfast spot, and a relaxed dinner nearby" },
    ],
    stay: "Kyoto · Night 1",
    transfer: "Tokyo → Kyoto",
  },
  {
    id: 3,
    date: "11",
    weekday: "FRI",
    city: "Kyoto",
    japanese: "京都",
    title: "Kiyomizu-dera & a kimono afternoon",
    summary: "Wake up early for a walk through Higashiyama, drink from Otowa Waterfall, dress in a kimono, and finish with a geisha tea ceremony.",
    events: [
      { time: "06:15", title: "Wake up early", note: "Have a light breakfast and dress warmly for a winter morning on foot" },
      {
        time: "06:45",
        title: "Walk to Kiyomizu-dera",
        note: "Set out from the Higashiyama hotel before the streets get busy",
        url: "https://www.google.com/maps/dir/?api=1&origin=542-2+Furukawacho%2C+Higashiyama+Ward%2C+Kyoto%2C+605-0026%2C+Japan&destination=Kiyomizu-dera%2C+Kyoto%2C+Japan&travelmode=walking",
        linkLabel: "WALKING DIRECTIONS",
      },
      {
        time: "07:30",
        title: "Explore Kiyomizu-dera",
        note: "The temple opens at 6 AM, making this a peaceful time to see the main hall and morning views",
        url: "https://www.kiyomizudera.or.jp/en/location/",
        linkLabel: "OFFICIAL VISITOR GUIDE",
      },
      { time: "08:45", title: "Drink from Otowa Waterfall", note: "Visit the waterfall below the main hall and take a respectful turn at the spring" },
      { time: "09:30", title: "Explore the Higashiyama lanes", note: "Wander through Sannenzaka, Ninenzaka, and the streets around Yasaka Pagoda" },
      { time: "11:30", title: "Lunch in Higashiyama", note: "Choose an easy nearby stop and leave enough time for the kimono fitting" },
      {
        time: "13:00",
        title: "Kimono fitting at Fuga Kimono Rental",
        note: "Reserve in advance and confirm the shop's same-day return time",
        url: "https://www.google.com/maps/search/?api=1&query=Fuga+Kimono+Rental+Kyoto",
        linkLabel: "OPEN IN MAPS",
      },
      { time: "14:15", title: "Higashiyama stroll in kimono", note: "Take photos along the traditional streets, then allow plenty of time to reach the ceremony" },
      { time: "16:00", title: "Geisha tea ceremony", note: "Reservation and venue details to be added once confirmed" },
    ],
    stay: "Kyoto · Night 2",
  },
  {
    id: 4,
    date: "12",
    weekday: "SAT",
    city: "Kyoto",
    japanese: "京都",
    title: "Kyoto day two · to be determined",
    summary: "A second open Kyoto day for the places you decide matter most.",
    events: [
      { time: "TBD", title: "Choose the day's Kyoto plan", note: "Keep this day flexible until the City Guide is filled in" },
    ],
    stay: "Kyoto · Night 3",
  },
  {
    id: 5,
    date: "13",
    weekday: "SUN",
    city: "Osaka",
    japanese: "大阪",
    title: "Kyoto to Osaka",
    summary: "Make the short move to Osaka, settle in, and meet the city's energy around Namba after dark.",
    events: [
      { time: "09:30", title: "Check out in Kyoto", note: "Leave time for breakfast near the hotel" },
      { time: "10:30", title: "Train to Osaka", note: "Kyoto → Osaka · about 30 minutes by JR special rapid" },
      { time: "11:30", title: "Drop bags at the Osaka hotel" },
      { time: "13:00", title: "Easy first afternoon", note: "Use your future Osaka To Do, Eat, and Shop lists" },
      { time: "18:00", title: "Namba & Dōtonbori", note: "Dinner, neon, and a relaxed first Osaka night" },
    ],
    stay: "Osaka · Night 1",
    transfer: "Kyoto → Osaka",
  },
  {
    id: 6,
    date: "14",
    weekday: "MON",
    city: "Osaka",
    japanese: "大阪",
    title: "Osaka turns up the volume",
    summary: "Castle views, market bites, and Dōtonbori glowing after dark.",
    events: [
      { time: "09:00", title: "Osaka Castle grounds" },
      { time: "12:30", title: "Kuromon Market", note: "Lunch and market browsing" },
      { time: "16:00", title: "Choose an Osaka neighborhood", note: "Add the final plan from your City Guide list" },
      { time: "19:00", title: "Dōtonbori after dark", note: "Try takoyaki and okonomiyaki" },
    ],
    stay: "Osaka · Night 2",
  },
  {
    id: 7,
    date: "15",
    weekday: "TUE",
    city: "Shibu Onsen",
    japanese: "渋温泉",
    title: "From Osaka to onsen country",
    summary: "Cross the mountains to a 1,300-year-old hot-spring town and settle into a ryokan.",
    events: [
      { time: "08:30", title: "Train toward Nagano", note: "Shin-Osaka → Nagoya → Nagano · allow about 4 hours" },
      { time: "13:00", title: "Nagano Dentetsu to Yudanaka", note: "Limited express · about 45 minutes" },
      { time: "14:00", title: "Bus or taxi to Shibu Onsen", note: "About 5 minutes from Yudanaka Station" },
      { time: "15:00", title: "Ryokan check-in + onsen walk", note: "Pick up the guest key for Shibu Onsen’s nine public baths" },
      { time: "18:00", title: "Kaiseki dinner at the ryokan" },
    ],
    stay: "Shibu Onsen · Ryokan night 1",
    transfer: "Osaka → Shibu Onsen",
  },
  {
    id: 8,
    date: "16",
    weekday: "WED",
    city: "Shibu Onsen",
    japanese: "渋温泉",
    title: "Snow monkeys & back to the ryokan",
    summary: "Visit Jigokudani in the winter morning, then return to the ryokan for one more restorative onsen night.",
    events: [
      { time: "08:15", title: "Bus toward Snow Monkey Park", note: "Use the winter access from the Kanbayashi side" },
      { time: "09:00", title: "Forest walk to Jigokudani", note: "Allow 30–35 minutes each way and wear shoes with grip" },
      {
        time: "10:00",
        title: "Snow Monkey Park",
        note: "Winter hours are generally 9 AM–4 PM; weather and the monkeys' movements can affect visits",
        url: "https://en.jigokudani-yaenkoen.co.jp/",
        linkLabel: "OFFICIAL PARK SITE",
      },
      { time: "13:00", title: "Return to Shibu Onsen", note: "Walk back to the bus stop, then return to the ryokan" },
      { time: "14:30", title: "Ryokan rest + lunch", note: "Warm up and leave the afternoon unhurried" },
      { time: "16:30", title: "Nine-bath onsen trail", note: "Available to overnight guests until 10:00 PM" },
    ],
    stay: "Shibu Onsen · Ryokan night 2",
  },
  {
    id: 9,
    date: "17",
    weekday: "THU",
    city: "Tokyo",
    japanese: "東京",
    title: "Back to Tokyo, beautifully rested",
    summary: "Leave the mountains after breakfast and begin the final Tokyo stay.",
    events: [
      { time: "09:00", title: "Yudanaka to Nagano", note: "Ryokan shuttle or bus, then Nagano Dentetsu" },
      { time: "11:00", title: "Shinkansen to Tokyo", note: "Nagano → Tokyo · about 1 hr 25 min" },
      { time: "14:00", title: "Check in + slow lunch" },
      { time: "17:00", title: "Daikanyama to Shibuya", note: "Coffee, shops, and a celebratory dinner" },
    ],
    stay: "Tokyo · Night 1 of 2",
    transfer: "Shibu Onsen → Tokyo",
  },
  {
    id: 10,
    date: "18",
    weekday: "FRI",
    city: "Tokyo",
    japanese: "東京",
    title: "A full final day in Tokyo",
    summary: "Keep the day open for the Tokyo places you add to the City Guide.",
    events: [
      { time: "TBD", title: "Choose the day's Tokyo plan", note: "Build the route from your To Do, Eat, and Shop lists" },
    ],
    stay: "Tokyo · Night 2 of 2",
  },
  {
    id: 11,
    date: "19",
    weekday: "SAT",
    city: "Tokyo",
    japanese: "東京",
    title: "Tokyo to Los Angeles",
    summary: "Enjoy one last Tokyo morning, then fly home to LAX.",
    events: [
      { time: "08:00", title: "Breakfast + final packing", note: "Leave space for last-minute gifts" },
      { time: "TBD", title: "Airport transfer", note: "Add the airport and departure time when the return flight is confirmed" },
      { time: "TBD", title: "Fly to Los Angeles", note: "Tokyo → LAX" },
    ],
    stay: "Departure day",
  },
];

const beforeLeaving = [
  {
    id: "visit-japan-web",
    category: "Entry forms",
    title: "Complete Visit Japan Web",
    detail: "Fill in the immigration and customs declaration online, then take a screenshot of the QR code generated at the end.",
    url: "https://www.vjw.digital.go.jp/main/#/vjwplo001",
    linkLabel: "OPEN VISIT JAPAN WEB",
  },
  {
    id: "holafly-esim",
    category: "Connectivity",
    title: "Buy eSIM from Holafly",
  },
  {
    id: "download-apps",
    category: "Phone setup",
    title: "Download travel apps",
    apps: ["LINE", "Payke", "Tabelog", "Stamp Quest"],
  },
] as const;

const appsToDownload = [
  {
    name: "LINE",
    use: "Discounts",
    detail: "Use LINE to find and save discount offers during the trip.",
  },
  {
    name: "Payke",
    use: "Shopping help",
    detail: "Use Payke for discounts and product information while shopping.",
  },
  {
    name: "Tabelog",
    use: "Restaurant reservations",
    detail: "Use the English version to research restaurants and make reservations.",
    url: "https://tabelog.onelink.me/IfVY/dzolmf88?af_ad=itsgracechin_july",
  },
  {
    name: "Stamp Quest",
    use: "Stamp locations",
    detail: "Use Stamp Quest to locate collectible stamp spots during the trip.",
  },
] as const;

const travelTips = [
  {
    icon: "🛂",
    title: "Carry your passport",
    detail: "You may need it for tax-free shopping and tourist discounts.",
  },
  {
    icon: "🎟️",
    title: "Ask for tourist coupons",
    detail: "Check the mall’s Information Counter for special discounts.",
  },
  {
    icon: "📱",
    title: "Use apps for coupons",
    detail: "Search travel and shopping apps for discounts before visiting.",
  },
  {
    icon: "🚆",
    title: "Avoid train rush hours",
    detail: "Weekdays: 7:00–9:30 AM & 5:00–8:00 PM\nWeekends: 11:00 AM–12:30 PM & 5:00–9:00 PM",
  },
  {
    icon: "🏨",
    title: "Stay near Shinagawa Station",
    detail: "Convenient airport access and easy connections to Tokyo and Osaka.",
  },
  {
    icon: "🗻",
    title: "Tokyo → Kyoto train",
    detail: "Sit on the right side for a chance to see Mt. Fuji. Seats D/E in regular cars; Seat D in Green Car.",
  },
] as const;

const trainLegs = [
  { from: "Tokyo", to: "Kyoto", date: "DEC 10", time: "~2H 10M", note: "Tōkaidō Shinkansen" },
  { from: "Kyoto", to: "Osaka", date: "DEC 13", time: "~30M", note: "JR special rapid" },
  { from: "Osaka", to: "Shibu Onsen", date: "DEC 15", time: "~5H", note: "Via Nagoya + Nagano" },
  { from: "Shibu Onsen", to: "Tokyo", date: "DEC 17", time: "~2H 20M", note: "Via Yudanaka + Nagano" },
];

const initialBookings = [
  { id: "flight", label: "Flight to Tokyo", detail: "Delta 7 · LAX Dec 8 at 10:05 AM → HND Dec 9 at 3:05 PM", done: true },
  { id: "tokyo1", label: "Shinjuku hotel · stay 1", detail: "Dec 9–10 · 1 night · east side keeps nightlife walkable", done: false },
  { id: "kyoto", label: "Kyoto hotel", detail: "Dec 10–13 · 3 nights · 542-2 Furukawachō, Higashiyama Ward, Kyoto 605-0026", done: false },
  { id: "osaka", label: "Osaka hotel", detail: "Dec 13–15 · 2 nights", done: false },
  { id: "nagano", label: "Shibu Onsen ryokan", detail: "Dec 15–17 · 2 nights · choose an inn with nine-bath access", done: false },
  { id: "tokyo2", label: "Tokyo hotel · stay 2", detail: "Dec 17–19 · 2 nights", done: false },
  { id: "return-flight", label: "Flight home", detail: "Dec 19 · Tokyo → LAX · add airport and time", done: false },
  { id: "trains", label: "Intercity trains", detail: "Reserve seats once travel times are set", done: false },
  { id: "special", label: "Special reservations", detail: "HOTEL ATLAS opens reservations about 1 month ahead; add Shibuya Sky later", done: false },
];

const cityGuides = [
  { city: "Tokyo", japanese: "東京", dates: "DEC 9 · 17–19", tone: "coral" },
  { city: "Kyoto", japanese: "京都", dates: "DEC 10–13", tone: "sage" },
  { city: "Osaka", japanese: "大阪", dates: "DEC 13–15", tone: "blue" },
  { city: "Shibu Onsen", japanese: "渋温泉", dates: "DEC 15–17", tone: "gold" },
] as const;

const guideSections = [
  { title: "To do", japanese: "見る", hint: "Sights, experiences, and neighborhoods" },
  { title: "To eat", japanese: "食べる", hint: "Restaurants, cafés, bars, and market bites" },
  { title: "To shop", japanese: "買う", hint: "Stores, markets, vintage, and souvenirs" },
] as const;

const kyotoFoodGroups = [
  {
    category: "Ramen",
    places: [
      { name: "Kyoto Wamen Yukichi Honpo", address: "506-1 Higashigawacho, Nakagyo Ward, Kyoto, 604-8046, Japan" },
      { name: "Honke Daiichi Asahi Honten", address: "845 Higashishiokojicho, Shimogyo Ward, Kyoto, 600-8216, Japan" },
      { name: "Tentenyu — Ichijoji Main Shop", address: "49 Ichijoji Nishisuginomiyacho, Sakyo Ward, Kyoto, 606-8112, Japan" },
      { name: "Hakata-Nagahama-Ramen Miyoshi", address: "辻田ビル 1階 115 Ishiyacho, Nakagyo Ward, Kyoto, 604-8002, Japan" },
    ],
  },
  {
    category: "Sushi",
    places: [
      { name: "Sushi Ishimatsu", address: "36 Shishigatani Honenin Nishimachi, Sakyo Ward, Kyoto, 606-8427, Japan" },
    ],
  },
  {
    category: "Tempura, beef & comfort food",
    places: [
      { name: "Tendon Makino Kyoto Teramachi", address: "481-3 Nakasujicho, Nakagyo Ward, Kyoto, 604-8047, Japan" },
      { name: "Gion Tempura Koromo", address: "570-8 Gionmachi Minamigawa, Higashiyama Ward, Kyoto, 605-0074, Japan" },
      { name: "Kichi Kichi Omurice", address: "185-4 Zaimokucho, Nakagyo Ward, Kyoto, 604-8017, Japan" },
      { name: "GYUKATSU Kyoto Katsugyu Sanjo-Kawaramachi", address: "河原町三条KSビル B1F 28 Ishibashicho, Nakagyo Ward, Kyoto, 604-8036, Japan" },
      { name: "Hikiniku to Come (Kyoto)", address: "363 Kiyomotocho, Higashiyama Ward, Kyoto, 605-0084, Japan" },
      { name: "Kyoto Kaiseki Yakiniku (BBQ) HIRO Gion Yamana-an", address: "16 Benzaitencho, Higashiyama Ward, Kyoto, 605-0086, Japan" },
    ],
  },
  {
    category: "Beer & gyoza",
    places: [
      { name: "Beer Komachi", address: "444 Hachikencho, Higashiyama Ward, Kyoto, 605-0027, Japan" },
      { name: "Chao Chao Gyoza — Sanjo Kiyamachi", address: "117 Ishiyacho, Nakagyo Ward, Kyoto, 604-8002, Japan" },
    ],
  },
  {
    category: "Coffee & tea houses",
    places: [
      { name: "Rokujuan", address: "101 Nishirokkakucho, Nakagyo Ward, Kyoto, 604-8217, Japan" },
      { name: "GOKAGO", address: "2 Chome-258 Kiyomizu, Higashiyama Ward, Kyoto, 605-0862, Japan" },
    ],
  },
] as const;

function googleMapsDirections(name: string, address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}`)}`;
}

const cityOptions: ("All" | City)[] = ["All", "Tokyo", "Shibu Onsen", "Kyoto", "Osaka"];

export default function Home() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [booked, setBooked] = useState<string[]>(["flight"]);
  const [beforeLeavingDone, setBeforeLeavingDone] = useState<string[]>([]);
  const [filter, setFilter] = useState<"All" | City>("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedDays = window.localStorage.getItem("nihon-completed-days");
    const savedBookings = window.localStorage.getItem("nihon-bookings");
    const savedBeforeLeaving = window.localStorage.getItem("nihon-before-leaving");
    if (savedDays) setCompleted(JSON.parse(savedDays));
    if (savedBookings) setBooked(JSON.parse(savedBookings));
    if (savedBeforeLeaving) setBeforeLeavingDone(JSON.parse(savedBeforeLeaving));
  }, []);

  const visibleDays = useMemo(
    () => (filter === "All" ? days : days.filter((day) => day.city === filter)),
    [filter],
  );

  const progress = Math.round((completed.length / days.length) * 100);
  const bookingProgress = Math.round((booked.length / initialBookings.length) * 100);

  function toggleDay(id: number) {
    const next = completed.includes(id)
      ? completed.filter((dayId) => dayId !== id)
      : [...completed, id];
    setCompleted(next);
    window.localStorage.setItem("nihon-completed-days", JSON.stringify(next));
  }

  function toggleBooking(id: string) {
    const next = booked.includes(id)
      ? booked.filter((bookingId) => bookingId !== id)
      : [...booked, id];
    setBooked(next);
    window.localStorage.setItem("nihon-bookings", JSON.stringify(next));
  }

  function toggleBeforeLeaving(id: string) {
    const next = beforeLeavingDone.includes(id)
      ? beforeLeavingDone.filter((itemId) => itemId !== id)
      : [...beforeLeavingDone, id];
    setBeforeLeavingDone(next);
    window.localStorage.setItem("nihon-before-leaving", JSON.stringify(next));
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Japan itinerary home">
          <span className="brand-mark" aria-hidden="true" />
          <span>NIHON NOTES</span>
        </a>
        <div className="trip-date" aria-label="Trip dates December 9 through 19, 2026">
          <span>DEC 09</span>
          <span className="date-line" />
          <span>DEC 19 · 2026</span>
        </div>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="trip-menu" onClick={() => setMenuOpen(true)}>
          MENU <span aria-hidden="true">☰</span>
        </button>
      </header>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} onClick={closeMenu} aria-hidden={!menuOpen} />
      <aside className={`menu-drawer ${menuOpen ? "is-open" : ""}`} id="trip-menu" aria-label="Trip menu">
        <button className="menu-close" onClick={closeMenu} aria-label="Close trip menu">×</button>
        <p className="eyebrow">TRIP INDEX</p>
        <nav>
          <a href="#travel-tips" onClick={closeMenu}><span>01</span> Travel tips</a>
          <a href="#itinerary" onClick={closeMenu}><span>02</span> Itinerary</a>
          <a href="#city-guide" onClick={closeMenu}><span>03</span> City guide</a>
          <a href="#trains" onClick={closeMenu}><span>04</span> Train plan</a>
          <a href="#bookings" onClick={closeMenu}><span>05</span> Booking board</a>
          <a href="#notes" onClick={closeMenu}><span>06</span> Trip notes</a>
        </nav>
        <div className="menu-stamp"><span>11</span><small>DAYS IN<br />JAPAN</small></div>
      </aside>

      <section className="welcome-hero" id="top" aria-label="Welcome to Nihon Notes Japan 2026">
        <img src="./og-v4.png" alt="Nihon Notes Japan 2026 with cranes, cherry blossoms, Mount Fuji, and traditional Japanese architecture" />
        <a className="welcome-enter" href="#travel-tips">EXPLORE THE TRIP <span>↓</span></a>
      </section>

      <section className="hero" id="travel-tips">
        <div className="hero-copy">
          <div className="hero-tip-heading">
            <div>
              <p className="eyebrow">KNOW BEFORE YOU GO · 旅のヒント</p>
              <h1 className="tips-title">Travel <em>tips.</em></h1>
            </div>
            <p>Small details that can make your days in Japan smoother, easier, and more rewarding.</p>
          </div>
          <ul className="hero-tip-grid">
            {travelTips.map((tip, index) => (
              <li key={tip.title}>
                <span className="tip-number">0{index + 1}</span>
                <span className="tip-icon" aria-hidden="true">{tip.icon}</span>
                <div>
                  <b>{tip.title}</b>
                  <p>{tip.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="primary-action" href="#itinerary">VIEW ITINERARY <span>↓</span></a>
            <span className="arrival-note"><b>ARRIVAL</b> DEC 9 · 3:05 PM · HANEDA</span>
          </div>
        </div>

        <aside className="prep-card" aria-label="Things to do before leaving">
          <div className="prep-card-heading">
            <span>BEFORE YOU GO</span>
            <span>{beforeLeaving.length} TASK{beforeLeaving.length === 1 ? "" : "S"}</span>
          </div>
          <div className="prep-intro">
            <p>旅の準備</p>
            <h2>Things to do<br /><em>before leaving.</em></h2>
          </div>
          <div className="prep-progress" aria-label={`${beforeLeavingDone.length} of ${beforeLeaving.length} tasks complete`}>
            <div><span style={{ width: `${(beforeLeavingDone.length / beforeLeaving.length) * 100}%` }} /></div>
            <b>{beforeLeavingDone.length}/{beforeLeaving.length} READY</b>
          </div>
          <div className="prep-list">
            {beforeLeaving.map((item, index) => {
              const isDone = beforeLeavingDone.includes(item.id);
              return (
                <article className={`prep-task ${isDone ? "is-done" : ""}`} key={item.id}>
                  <button className="prep-task-toggle" onClick={() => toggleBeforeLeaving(item.id)}>
                    <span className="prep-check">{isDone ? "✓" : (index + 1).toString().padStart(2, "0")}</span>
                    <span>
                      <small>{item.category}</small>
                      <b>{item.title}</b>
                    </span>
                    <em>{isDone ? "READY" : "TO DO"}</em>
                  </button>
                  {("detail" in item || "apps" in item || "url" in item) && (
                    <div className="prep-task-detail">
                      {"detail" in item && <p>{item.detail}</p>}
                      {"apps" in item && (
                        <ul>
                          {item.apps.map((app) => <li key={app}>{app}</li>)}
                        </ul>
                      )}
                      {"url" in item && (
                        <a href={item.url} target="_blank" rel="noreferrer">{item.linkLabel} ↗</a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div className="prep-apps">
            <div className="prep-apps-heading">
              <h3>Apps to download</h3>
              <span>{appsToDownload.length} APPS</span>
            </div>
            <div className="prep-app-list">
              {appsToDownload.map((app) => (
                <details key={app.name}>
                  <summary>
                    <span>
                      <b>{app.name}</b>
                      <small>{app.use}</small>
                    </span>
                    <span className="app-expand" aria-hidden="true">+</span>
                  </summary>
                  <div className="prep-app-detail">
                    <p>{app.detail}</p>
                    {"url" in app && (
                      <a href={app.url} target="_blank" rel="noreferrer">OPEN ENGLISH RESERVATION LINK ↗</a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <p className="prep-caption">Check each item when it&apos;s ready. Your progress stays saved on this device.</p>
        </aside>
      </section>

      <section className="trip-dashboard" aria-label="Trip progress">
        <div className="progress-block">
          <div className="progress-copy">
            <span>TRIP PROGRESS</span>
            <b>{completed.length} OF {days.length} DAYS COMPLETE</b>
          </div>
          <div className="progress-track" aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <strong>{progress}%</strong>
        </div>
        <div className="quick-fact"><span>次</span><div><small>NEXT UP</small><b>Haneda → Shinjuku · 3:05 PM</b></div></div>
        <div className="quick-fact"><span>宿</span><div><small>NIGHTS</small><b>10 nights · 5 stays</b></div></div>
      </section>

      <section className="itinerary-section" id="itinerary">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DAY BY DAY · 旅程</p>
            <h2>Your winter story</h2>
          </div>
          <p>Tap a day when it&apos;s done. Open any card for the plan.</p>
        </div>

        <div className="city-filters" aria-label="Filter itinerary by city">
          {cityOptions.map((city) => (
            <button key={city} className={filter === city ? "active" : ""} onClick={() => setFilter(city)}>
              {city}
            </button>
          ))}
        </div>

        <div className="day-list">
          {visibleDays.map((day) => {
            const isDone = completed.includes(day.id);
            return (
              <article className={`day-card city-${day.city.toLowerCase().replaceAll(" ", "-")} ${isDone ? "is-complete" : ""}`} key={day.id}>
                <button className="day-check" onClick={() => toggleDay(day.id)} aria-label={`${isDone ? "Mark incomplete" : "Mark complete"}: day ${day.id}, ${day.title}`}>
                  <span>{isDone ? "✓" : day.id.toString().padStart(2, "0")}</span>
                </button>
                <div className="day-date"><b>{day.date}</b><span>{day.weekday}<br />DEC</span></div>
                <details className="day-details" open={day.id === 1}>
                  <summary>
                    <span className="city-tag">{day.city.toUpperCase()} · {day.japanese}</span>
                    <h3>{day.title}</h3>
                    <p>{day.summary}</p>
                    <span className="expand-label"><i /> VIEW DAY</span>
                  </summary>
                  <div className="day-schedule">
                    {day.events.map((event) => (
                      <div className="schedule-row" key={`${day.id}-${event.time}-${event.title}`}>
                        <time>{event.time}</time>
                        <div>
                          <b>{event.title}</b>
                          {event.note && <small>{event.note}</small>}
                          {event.url && (
                            <a className="event-link" href={event.url} target="_blank" rel="noreferrer">
                              {event.linkLabel ?? "DETAILS"} ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
                <div className="day-meta">
                  {day.transfer && <span className="transfer-label">↗ TRAIN DAY</span>}
                  <b>{day.stay}</b>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="city-guide-section" id="city-guide">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CITY BY CITY · 街のリスト</p>
            <h2>Places for later</h2>
          </div>
          <p>Kyoto&apos;s food list is ready. The remaining To Do, Eat, and Shop sections are waiting for your next upload.</p>
        </div>

        <div className="city-guide-list">
          {cityGuides.map((guide, cityIndex) => (
            <article className={`guide-city guide-${guide.tone}`} key={guide.city}>
              <header>
                <span>0{cityIndex + 1}</span>
                <div>
                  <p>{guide.dates}</p>
                  <h3>{guide.city} <em>{guide.japanese}</em></h3>
                </div>
              </header>
              <div className="guide-columns">
                {guideSections.map((section) => {
                  const placeGroups = guide.city === "Kyoto" && section.title === "To eat" ? kyotoFoodGroups : null;

                  return (
                    <div className={`guide-bucket ${placeGroups ? "has-places" : ""}`} key={`${guide.city}-${section.title}`}>
                      <span>{section.japanese}</span>
                      <h4>{section.title}</h4>
                      <p>{section.hint}</p>
                      {placeGroups ? (
                        <div className="guide-place-groups">
                          {placeGroups.map((group) => (
                            <section className="guide-place-group" key={group.category}>
                              <h5>{group.category}</h5>
                              <ul>
                                {group.places.map((place) => (
                                  <li key={place.name}>
                                    <a href={googleMapsDirections(place.name, place.address)} target="_blank" rel="noreferrer">
                                      <b>{place.name}</b><span aria-hidden="true">↗</span>
                                    </a>
                                    <small>{place.address}</small>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          ))}
                        </div>
                      ) : (
                        <div className="guide-placeholder">READY FOR YOUR LIST <b>+</b></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trains-section" id="trains">
        <div className="section-heading light">
          <div>
            <p className="eyebrow">MOVE WITH EASE · 鉄道</p>
            <h2>The rail plan</h2>
          </div>
          <p>Four simple travel legs connect the whole loop.</p>
        </div>
        <div className="train-grid">
          {trainLegs.map((leg, index) => (
            <article className="train-card" key={`${leg.from}-${leg.to}`}>
              <div className="train-card-top"><span>{leg.date}</span><span>0{index + 1}</span></div>
              <div className="train-cities">
                <b>{leg.from}</b><span>→</span><b>{leg.to}</b>
              </div>
              <div className="train-card-bottom"><span>{leg.note}</span><strong>{leg.time}</strong></div>
            </article>
          ))}
        </div>
        <p className="rail-note"><span>RAIL NOTE</span> A nationwide JR Pass may not be the best value for this route. Compare individual tickets with a regional pass once exact trains are chosen.</p>
      </section>

      <section className="bookings-section" id="bookings">
        <div className="bookings-intro">
          <p className="eyebrow">BEFORE YOU GO · 予約</p>
          <h2>The booking board</h2>
          <p>One calm list for the decisions that make the trip real. Your checks stay saved on this device.</p>
          <div className="booking-score">
            <div><span style={{ width: `${bookingProgress}%` }} /></div>
            <b>{booked.length}/{initialBookings.length} READY</b>
          </div>
        </div>
        <div className="booking-list">
          {initialBookings.map((booking) => {
            const isBooked = booked.includes(booking.id);
            return (
              <button className={isBooked ? "booked" : ""} key={booking.id} onClick={() => toggleBooking(booking.id)}>
                <span className="booking-check">{isBooked ? "✓" : "+"}</span>
                <span><b>{booking.label}</b><small>{booking.detail}</small></span>
                <em>{isBooked ? "READY" : "TO BOOK"}</em>
              </button>
            );
          })}
        </div>
      </section>

      <section className="notes-section" id="notes">
        <div className="notes-number">11</div>
        <div>
          <p className="eyebrow">GOOD TO KNOW</p>
          <h2>Leave a little room<br />for the unexpected.</h2>
        </div>
        <div className="notes-grid">
          <div><span>01</span><b>Pack for winter</b><p>Warm layers, a compact umbrella, and shoes with grip for Shibu Onsen.</p></div>
          <div><span>02</span><b>Travel light</b><p>Forward larger bags from Tokyo to Kyoto and take a small bag to Shibu Onsen.</p></div>
          <div><span>03</span><b>Stay connected</b><p>Arrange an eSIM or pocket Wi-Fi before landing.</p></div>
          <div><span>04</span><b>Nightlife smarts</b><p>Confirm cover charges before entering, skip street touts, and do not drink or smoke in Golden Gai&apos;s lanes.</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-mark"><span /> NIHON NOTES</div>
        <p>DECEMBER 09—19 · TOKYO, SHIBU ONSEN, KYOTO & OSAKA</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
