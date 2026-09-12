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
  events: { time: string; title: string; note?: string }[];
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
    title: "Arrival & a gentle first night",
    summary: "Land, settle in, and ease into Japan with a cozy neighborhood dinner.",
    events: [
      { time: "15:00", title: "Arrive in Tokyo", note: "Allow 60–90 minutes for immigration and bags" },
      { time: "17:00", title: "Airport transfer", note: "Train or limousine bus to your hotel" },
      { time: "19:30", title: "Check in + local dinner", note: "Keep the first evening flexible" },
    ],
    stay: "Tokyo · Night 1",
  },
  {
    id: 2,
    date: "10",
    weekday: "THU",
    city: "Tokyo",
    japanese: "東京",
    title: "Old Tokyo, new Tokyo",
    summary: "Temple calm in Asakusa, then an electric evening above Shibuya.",
    events: [
      { time: "08:00", title: "Sensō-ji & Nakamise", note: "Go early for quieter temple grounds" },
      { time: "11:00", title: "Ueno + Ameyoko", note: "Street snacks and market browsing" },
      { time: "17:00", title: "Shibuya crossing", note: "Optional sunset slot at Shibuya Sky" },
    ],
    stay: "Tokyo · Night 2",
  },
  {
    id: 3,
    date: "11",
    weekday: "FRI",
    city: "Shibu Onsen",
    japanese: "渋温泉",
    title: "Ryokan life in Shibu Onsen",
    summary: "Travel through Nagano to a 1,300-year-old hot-spring town and settle into a ryokan.",
    events: [
      { time: "09:00", title: "Shinkansen to Nagano", note: "Tokyo Station → Nagano · about 1 hr 25 min" },
      { time: "11:00", title: "Nagano Dentetsu to Yudanaka", note: "Limited express · about 45 minutes" },
      { time: "12:00", title: "Bus or taxi to Shibu Onsen", note: "About 5 minutes from Yudanaka Station" },
      { time: "15:00", title: "Ryokan check-in + onsen walk", note: "Pick up the guest key for Shibu Onsen’s nine public baths" },
      { time: "18:00", title: "Kaiseki dinner at the ryokan" },
    ],
    stay: "Shibu Onsen · Ryokan night 1",
    transfer: "Tokyo → Shibu Onsen",
  },
  {
    id: 4,
    date: "12",
    weekday: "SAT",
    city: "Shibu Onsen",
    japanese: "渋温泉",
    title: "Snow monkeys & the nine baths",
    summary: "Meet Jigokudani’s macaques, then return for an unhurried onsen evening.",
    events: [
      { time: "08:30", title: "Bus to Snow Monkey Park", note: "Use the winter access from the Kanbayashi side" },
      { time: "09:00", title: "Forest walk to Jigokudani", note: "Roughly 30 minutes each way; wear shoes with grip" },
      { time: "10:00", title: "Snow Monkey Park" },
      { time: "14:00", title: "Return to Shibu Onsen", note: "Lunch, stone lanes, and a warm drink" },
      { time: "16:00", title: "Nine-bath onsen trail", note: "Available to overnight guests until 10:00 PM" },
    ],
    stay: "Shibu Onsen · Ryokan night 2",
  },
  {
    id: 5,
    date: "13",
    weekday: "SUN",
    city: "Kyoto",
    japanese: "京都",
    title: "From peaks to lantern-lit lanes",
    summary: "Cross the country to Kyoto and spend the evening wandering Gion.",
    events: [
      { time: "08:00", title: "Return to Nagano Station", note: "Yudanaka → Nagano by limited express" },
      { time: "09:30", title: "Train to Kyoto", note: "Limited express + Shinkansen via Nagoya · allow about 4 hr 30 min total" },
      { time: "13:00", title: "Check in + Nishiki Market" },
      { time: "17:00", title: "Gion & Yasaka Shrine", note: "Continue to Ponto-chō for dinner" },
    ],
    stay: "Kyoto · Night 1",
    transfer: "Shibu Onsen → Kyoto",
  },
  {
    id: 6,
    date: "14",
    weekday: "MON",
    city: "Kyoto",
    japanese: "京都",
    title: "Torii gates & hillside temples",
    summary: "Start beneath Fushimi Inari’s gates, then trace Kyoto’s eastern hills.",
    events: [
      { time: "07:00", title: "Fushimi Inari", note: "Walk beyond the main viewpoint for fewer crowds" },
      { time: "11:30", title: "Kiyomizu-dera" },
      { time: "14:00", title: "Ninenzaka to Nanzen-ji", note: "Tea break along the way" },
    ],
    stay: "Kyoto · Night 2",
  },
  {
    id: 7,
    date: "15",
    weekday: "TUE",
    city: "Kyoto",
    japanese: "京都",
    title: "Bamboo, gardens & golden light",
    summary: "A western Kyoto day, from Arashiyama’s grove to Kinkaku-ji.",
    events: [
      { time: "07:30", title: "Arashiyama bamboo grove" },
      { time: "09:00", title: "Tenryū-ji garden", note: "Optional riverside walk afterward" },
      { time: "14:00", title: "Kinkaku-ji", note: "Return for a relaxed final Kyoto dinner" },
    ],
    stay: "Kyoto · Night 3",
  },
  {
    id: 8,
    date: "16",
    weekday: "WED",
    city: "Osaka",
    japanese: "大阪",
    title: "Osaka turns up the volume",
    summary: "Castle views, market bites, and Dōtonbori glowing after dark.",
    events: [
      { time: "09:00", title: "Train to Osaka", note: "Kyoto → Osaka · about 30 minutes" },
      { time: "11:00", title: "Osaka Castle grounds" },
      { time: "16:00", title: "Kuromon + Dōtonbori", note: "Try takoyaki and okonomiyaki" },
    ],
    stay: "Osaka · Night 1",
    transfer: "Kyoto → Osaka",
  },
  {
    id: 9,
    date: "17",
    weekday: "THU",
    city: "Tokyo",
    japanese: "東京",
    title: "The loop closes in Tokyo",
    summary: "Glide back east, then spend a final evening in Shibuya and Daikanyama.",
    events: [
      { time: "09:00", title: "Shinkansen to Tokyo", note: "Shin-Osaka → Tokyo · about 2 hr 30 min" },
      { time: "13:00", title: "Check in + slow lunch" },
      { time: "16:00", title: "Daikanyama to Shibuya", note: "Coffee, shops, and a celebratory dinner" },
    ],
    stay: "Tokyo · Final night",
    transfer: "Osaka → Tokyo",
  },
  {
    id: 10,
    date: "18",
    weekday: "FRI",
    city: "Tokyo",
    japanese: "東京",
    title: "One last taste of Tokyo",
    summary: "A flexible farewell day for breakfast, souvenirs, and the journey home.",
    events: [
      { time: "08:00", title: "Tsukiji Outer Market", note: "Breakfast and final food gifts" },
      { time: "11:00", title: "Last-minute favorites", note: "Choose Ginza, Meiji Shrine, or a neighborhood wander" },
      { time: "TBD", title: "Airport transfer", note: "Add departure time when flights are booked" },
    ],
    stay: "Departure day",
  },
];

const route = [
  { city: "Tokyo", days: "Dec 9–10", tone: "coral" },
  { city: "Shibu Onsen", days: "Dec 11–12", tone: "gold" },
  { city: "Kyoto", days: "Dec 13–15", tone: "sage" },
  { city: "Osaka", days: "Dec 16", tone: "blue" },
  { city: "Tokyo", days: "Dec 17–18", tone: "coral" },
];

const trainLegs = [
  { from: "Tokyo", to: "Shibu Onsen", date: "DEC 11", time: "~2H 20M", note: "Via Nagano + Yudanaka" },
  { from: "Shibu Onsen", to: "Kyoto", date: "DEC 13", time: "~4H 30M", note: "Via Nagano + Nagoya" },
  { from: "Kyoto", to: "Osaka", date: "DEC 16", time: "~30M", note: "JR special rapid" },
  { from: "Shin-Osaka", to: "Tokyo", date: "DEC 17", time: "~2H 30M", note: "Tōkaidō Shinkansen" },
];

const initialBookings = [
  { id: "flight", label: "Flights + airport", detail: "Arrival confirmed · Dec 9 at 3:00 PM", done: true },
  { id: "tokyo1", label: "Tokyo hotel · stay 1", detail: "Dec 9–11 · 2 nights", done: false },
  { id: "nagano", label: "Shibu Onsen ryokan", detail: "Dec 11–13 · 2 nights · choose an inn with nine-bath access", done: false },
  { id: "kyoto", label: "Kyoto hotel", detail: "Dec 13–16 · 3 nights", done: false },
  { id: "osaka", label: "Osaka hotel", detail: "Dec 16–17 · 1 night", done: false },
  { id: "tokyo2", label: "Tokyo hotel · stay 2", detail: "Dec 17–18 · 1 night", done: false },
  { id: "trains", label: "Intercity trains", detail: "Reserve seats once travel times are set", done: false },
  { id: "special", label: "Special reservations", detail: "Shibuya Sky, restaurants, or teamLab", done: false },
];

const cityOptions: ("All" | City)[] = ["All", "Tokyo", "Shibu Onsen", "Kyoto", "Osaka"];

export default function Home() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [booked, setBooked] = useState<string[]>(["flight"]);
  const [filter, setFilter] = useState<"All" | City>("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedDays = window.localStorage.getItem("nihon-completed-days");
    const savedBookings = window.localStorage.getItem("nihon-bookings");
    if (savedDays) setCompleted(JSON.parse(savedDays));
    if (savedBookings) setBooked(JSON.parse(savedBookings));
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
        <div className="trip-date" aria-label="Trip dates December 9 through 18, 2026">
          <span>DEC 09</span>
          <span className="date-line" />
          <span>DEC 18 · 2026</span>
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
          <a href="#itinerary" onClick={closeMenu}><span>01</span> Itinerary</a>
          <a href="#trains" onClick={closeMenu}><span>02</span> Train plan</a>
          <a href="#bookings" onClick={closeMenu}><span>03</span> Booking board</a>
          <a href="#notes" onClick={closeMenu}><span>04</span> Trip notes</a>
        </nav>
        <div className="menu-stamp"><span>10</span><small>DAYS IN<br />JAPAN</small></div>
      </aside>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">YOUR JAPAN TRIP · 冬 2026</p>
          <h1>
            Ten days.<br />
            <em>One beautiful loop.</em>
          </h1>
          <p className="intro">
            Tokyo lights, Shibu Onsen steam, quiet temples, and Osaka nights—
            all in one easy-to-follow place.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#itinerary">VIEW ITINERARY <span>↓</span></a>
            <span className="arrival-note"><b>ARRIVAL</b> DEC 9 · 3:00 PM · TOKYO</span>
          </div>
        </div>

        <aside className="route-card" aria-label="Trip route">
          <div className="route-card-heading">
            <span>THE ROUTE</span>
            <span>10 DAYS</span>
          </div>
          <div className="route-list">
            {route.map((stop, index) => (
              <div className="route-stop" key={`${stop.city}-${stop.days}`}>
                <div className="route-track">
                  <span className={`route-dot ${stop.tone}`} />
                  {index < route.length - 1 && <span className="route-stem" />}
                </div>
                <div>
                  <p className="route-city">{stop.city}</p>
                  <p className="route-days">{stop.days}</p>
                </div>
                <span className="route-number">0{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="route-caption">東京 → 渋温泉 → 京都 → 大阪 → 東京</p>
        </aside>
      </section>

      <section className="trip-dashboard" aria-label="Trip progress">
        <div className="progress-block">
          <div className="progress-copy">
            <span>TRIP PROGRESS</span>
            <b>{completed.length} OF 10 DAYS COMPLETE</b>
          </div>
          <div className="progress-track" aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <strong>{progress}%</strong>
        </div>
        <div className="quick-fact"><span>次</span><div><small>NEXT UP</small><b>Tokyo arrival · 3 PM</b></div></div>
        <div className="quick-fact"><span>宿</span><div><small>NIGHTS</small><b>9 nights · 5 stays</b></div></div>
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
                        <div><b>{event.title}</b>{event.note && <small>{event.note}</small>}</div>
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
        <div className="notes-number">10</div>
        <div>
          <p className="eyebrow">GOOD TO KNOW</p>
          <h2>Leave a little room<br />for the unexpected.</h2>
        </div>
        <div className="notes-grid">
          <div><span>01</span><b>Pack for winter</b><p>Warm layers, a compact umbrella, and shoes with grip for Shibu Onsen.</p></div>
          <div><span>02</span><b>Travel light</b><p>Forward larger bags from Tokyo to Kyoto and take a small bag to Shibu Onsen.</p></div>
          <div><span>03</span><b>Stay connected</b><p>Arrange an eSIM or pocket Wi-Fi before landing.</p></div>
          <div><span>04</span><b>Keep it flexible</b><p>Weather and energy can change—each day has room to wander.</p></div>
        </div>
      </section>

      <footer>
        <div className="footer-mark"><span /> NIHON NOTES</div>
        <p>DECEMBER 09—18 · TOKYO, SHIBU ONSEN, KYOTO & OSAKA</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
