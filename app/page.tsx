"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Le BDE", href: "#bde" },
  { label: "L’expérience", href: "#experience" },
  { label: "Agenda", href: "#agenda" },
  { label: "L’équipe", href: "#equipe" },
];

const experienceItems = [
  {
    number: "01",
    title: "Rassembler",
    label: "Faire campus commun",
    text: "Créer des rencontres qui rapprochent les promos et font de Madrid un vrai terrain de vie collective.",
    image: "/role-rassembler.jpg",
    imageAlt: "Étudiants Veteuropea réunis autour d’une grande table lors d’une soirée",
    imagePosition: "50% 68%",
  },
  {
    number: "02",
    title: "Accompagner",
    label: "Ne jamais rester seul",
    text: "Partager les bons repères, relayer les besoins et rendre l’arrivée comme le quotidien beaucoup plus simples.",
    image: "/role-accompagner.jpg",
    imageAlt: "Deux étudiantes Veteuropea présentant des conseils de gestion du temps en cours",
    imagePosition: "50% 67%",
  },
  {
    number: "03",
    title: "Faire vibrer",
    label: "Des moments qui comptent",
    text: "Imaginer des expériences fortes, généreuses et bien pensées — sur le campus comme ailleurs.",
    image: "/role-faire-vibrer.jpg",
    imageAlt: "Boule à facettes et décor lumineux pendant une soirée Veteuropea",
    imagePosition: "50% 60%",
  },
];

const calendarEvents = [
  {
    start: "2026-09-11",
    end: "2026-09-11",
    date: "11",
    startDay: "11",
    month: "SEP",
    monthLong: "SEPTEMBRE",
    weekday: "VENDREDI",
    title: "NOU Club",
    featureTitle: "NOU",
    featureAccent: "Club",
    detail: "Madrid",
    tag: "CLUB",
  },
  {
    start: "2026-09-19",
    end: "2026-09-19",
    date: "19",
    startDay: "19",
    month: "SEP",
    monthLong: "SEPTEMBRE",
    weekday: "SAMEDI",
    title: "Gin&Ron",
    featureTitle: "Gin&Ron",
    featureAccent: "Fêtes de Bayonne",
    detail: "Soirée Fêtes de Bayonne",
    tag: "SOIRÉE",
  },
  {
    start: "2026-09-25",
    end: "2026-09-27",
    date: "25—27",
    startDay: "25",
    endDay: "27",
    month: "SEP",
    monthLong: "SEPTEMBRE",
    weekday: "VEN. — DIM.",
    title: "WEI d’intégration",
    featureTitle: "WEI",
    featureAccent: "d’intégration",
    detail: "Lloret del Mar",
    tag: "WEEK-END",
  },
  {
    start: "2026-10-08",
    end: "2026-10-08",
    date: "08",
    startDay: "08",
    month: "OCT",
    monthLong: "OCTOBRE",
    weekday: "JEUDI",
    title: "Jowke White Party",
    featureTitle: "Jowke",
    featureAccent: "White Party",
    detail: "× Kinespana × Dentalife",
    tag: "WHITE PARTY",
  },
  {
    start: "2026-10-31",
    end: "2026-10-31",
    date: "31",
    startDay: "31",
    month: "OCT",
    monthLong: "OCTOBRE",
    weekday: "SAMEDI",
    title: "Soirée Halloween",
    featureTitle: "Soirée",
    featureAccent: "Halloween",
    detail: "La nuit la plus sombre de l’année",
    tag: "HALLOWEEN",
  },
  {
    start: "2026-11-27",
    end: "2026-11-27",
    date: "27",
    startDay: "27",
    month: "NOV",
    monthLong: "NOVEMBRE",
    weekday: "VENDREDI",
    title: "Rooftop + boîte",
    featureTitle: "Rooftop",
    featureAccent: "+ boîte",
    detail: "Madrid",
    tag: "NIGHT OUT",
  },
  {
    start: "2026-12-11",
    end: "2026-12-11",
    date: "11",
    startDay: "11",
    month: "DÉC",
    monthLong: "DÉCEMBRE",
    weekday: "VENDREDI",
    title: "NOU Club",
    featureTitle: "NOU",
    featureAccent: "Club",
    detail: "Madrid",
    tag: "CLUB",
  },
  {
    start: "2026-12-16",
    end: "2026-12-16",
    date: "16",
    startDay: "16",
    month: "DÉC",
    monthLong: "DÉCEMBRE",
    weekday: "MERCREDI",
    title: "Gin&Ron",
    featureTitle: "Gin&Ron",
    featureAccent: "Madrid",
    detail: "Madrid",
    tag: "SOIRÉE",
  },
  {
    start: "2026-12-18",
    end: "2026-12-18",
    date: "18",
    startDay: "18",
    month: "DÉC",
    monthLong: "DÉCEMBRE",
    weekday: "VENDREDI",
    title: "Évent Rooftop Madrid",
    featureTitle: "Évent Rooftop",
    featureAccent: "Madrid",
    detail: "× Dentalife",
    tag: "ROOFTOP",
  },
];

const agendaFallbackDate = "2026-09-24";

function getMadridDateKey() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const teamRoles = ["Bureau", "Événementiel", "Communication", "Partenariats"];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [agendaToday, setAgendaToday] = useState(agendaFallbackDate);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateAgendaDate = () => setAgendaToday(getMadridDateKey());
    updateAgendaDate();
    const timer = window.setInterval(updateAgendaDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const movePanther = (event: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRef.current.style.setProperty("--panther-x", `${x * 18}px`);
    heroRef.current.style.setProperty("--panther-y", `${y * 18}px`);
  };

  const closeMenu = () => setMenuOpen(false);
  const upcomingEvents = calendarEvents.filter((event) => event.end >= agendaToday);
  const pastEvents = calendarEvents.filter((event) => event.end < agendaToday).slice().reverse();
  const featuredEvent = upcomingEvents[0];
  const featuredEventIsLive = featuredEvent
    ? featuredEvent.start <= agendaToday && featuredEvent.end >= agendaToday
    : false;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#accueil" aria-label="Veteuropea — Accueil">
          <span className="brand-mark">
            <img src="/veteuropea-panther-mark.jpg" alt="" />
          </span>
          <span className="brand-name">VETEUROPEA</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="header-cta"
          href="https://www.instagram.com/bde.veteuropea/"
          target="_blank"
          rel="noreferrer"
        >
          Nous suivre
          <ArrowUpRight />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <p>MENU</p>
          <nav aria-label="Navigation mobile">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="mobile-social"
            href="https://www.instagram.com/bde.veteuropea/"
            target="_blank"
            rel="noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            @bde.veteuropea <ArrowUpRight />
          </a>
        </div>
      </div>

      <main id="main-content">
        <section
          className="hero"
          id="accueil"
          ref={heroRef}
          onPointerMove={movePanther}
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow reveal reveal-1">
              <span /> Madrid · Universidad Europea
            </p>
            <h1 className="reveal reveal-2">
              La vie véto.
              <span>En plus grand.</span>
            </h1>
            <p className="hero-lede reveal reveal-3">
              Bienvenue chez Veteuropea, le BDE qui transforme les années d’études
              à Madrid en une expérience qu’on n’oublie pas.
            </p>
            <div className="hero-actions reveal reveal-4">
              <a className="button button-gold" href="#bde">
                Découvrir le BDE
                <ArrowUpRight />
              </a>
              <a className="text-link" href="#agenda">
                Voir les prochains événements
                <span>↓</span>
              </a>
            </div>
            <div className="hero-signature reveal reveal-4">
              <span>PAR LES ÉTUDIANTS</span>
              <i />
              <span>POUR LES ÉTUDIANTS</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Emblème panthère Veteuropea">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="panther-halo" />
            <div className="panther-frame">
              <img src="/veteuropea-panther.jpg" alt="Panthère, emblème de Veteuropea" />
            </div>
            <span className="floating-tag tag-events">EVENTOS</span>
            <span className="floating-tag tag-community">COMUNIDAD</span>
            <span className="floating-tag tag-madrid">MADRID</span>
            <span className="visual-index">01 / VETEUROPEA</span>
          </div>

          <a className="scroll-cue" href="#bde" aria-label="Faire défiler vers la présentation">
            <span>SCROLL TO DISCOVER</span>
            <i />
          </a>
        </section>

        <div className="brand-marquee" aria-label="Valeurs Veteuropea">
          <div className="marquee-track">
            {["EVENTOS", "COMUNIDAD", "MADRID", "VETERINARIA", "ENCUENTROS", "VETEUROPEA"].map(
              (word, index) => (
                <span key={`${word}-${index}`}>
                  {word} <i>✦</i>
                </span>
              ),
            )}
            {["EVENTOS", "COMUNIDAD", "MADRID", "VETERINARIA", "ENCUENTROS", "VETEUROPEA"].map(
              (word, index) => (
                <span key={`${word}-duplicate-${index}`} aria-hidden="true">
                  {word} <i>✦</i>
                </span>
              ),
            )}
          </div>
        </div>

        <section className="intro-section" id="bde">
          <div className="section-kicker">
            <span>01</span>
            <p>L’ADN VETEUROPEA</p>
          </div>
          <div className="intro-statement">
            <p className="intro-overline">UN BDE, MAIS SURTOUT UNE ÉNERGIE.</p>
            <h2>
              On ne fait pas que remplir un agenda.
              <span>On crée les souvenirs qui vont avec.</span>
            </h2>
            <div className="intro-details" data-reveal>
              <p>
                Veteuropea, c’est le point de rencontre des étudiants vétérinaires
                de l’Universidad Europea : une équipe accessible, des idées qui
                bougent et une seule envie — rendre chaque année plus intense,
                plus simple et plus collective.
              </p>
              <div className="intro-proof">
                <div>
                  <strong>01</strong>
                  <span>Communauté<br />à Madrid</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>Moments<br />à partager</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Énergie<br />étudiante</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="experience-heading" data-reveal>
            <div className="section-kicker section-kicker-dark">
              <span>02</span>
              <p>NOTRE RÔLE</p>
            </div>
            <div>
              <p className="section-overline">PLUS QU’UNE ASSOCIATION</p>
              <h2>
                Bien entouré.<br />
                <em>Bien intégré.</em><br />
                Bien lancé.
              </h2>
            </div>
          </div>

          <div className="experience-interface" data-reveal>
            <div className="experience-list" role="list" aria-label="Les missions du BDE">
              {experienceItems.map((item, index) => (
                <button
                  className={`experience-row ${activeExperience === index ? "is-active" : ""}`}
                  key={item.number}
                  type="button"
                  aria-pressed={activeExperience === index}
                  onClick={() => setActiveExperience(index)}
                  onFocus={() => setActiveExperience(index)}
                  onMouseEnter={() => setActiveExperience(index)}
                >
                  <span className="experience-number">{item.number}</span>
                  <span className="experience-row-title">
                    <strong>{item.title}</strong>
                    <small>{item.label}</small>
                  </span>
                  <span className="experience-plus">+</span>
                </button>
              ))}
            </div>

            <div className="experience-display" aria-live="polite">
              <div className="display-media-stack">
                {experienceItems.map((item, index) => (
                  <div
                    className={`display-media ${activeExperience === index ? "is-active" : ""}`}
                    key={item.image}
                    aria-hidden={activeExperience !== index}
                  >
                    <img
                      src={item.image}
                      alt={activeExperience === index ? item.imageAlt : ""}
                      style={{ objectPosition: item.imagePosition }}
                    />
                    <span>PHOTO · {item.number}</span>
                  </div>
                ))}
              </div>
              <div className="display-orbit" aria-hidden="true">
                <span>{experienceItems[activeExperience].number}</span>
              </div>
              <div className="display-copy">
                <p>MISSION {experienceItems[activeExperience].number}</p>
                <h3>{experienceItems[activeExperience].title}</h3>
                <span>{experienceItems[activeExperience].text}</span>
              </div>
              <p className="display-watermark" aria-hidden="true">V</p>
            </div>
          </div>
        </section>

        <section className="agenda-section" id="agenda">
          <div className="agenda-top" data-reveal>
            <div className="section-kicker">
              <span>03</span>
              <p>LES TEMPS FORTS</p>
            </div>
            <div className="agenda-title">
              <p className="section-overline">SAISON 2026/27</p>
              <h2>
                Les dates sont posées.
                <em>À nous de les vivre.</em>
              </h2>
            </div>
            <a
              className="round-link"
              href="https://www.instagram.com/bde.veteuropea/"
              target="_blank"
              rel="noreferrer"
              aria-label="Suivre les actualités sur Instagram"
            >
              <span>TOUTES LES<br />ACTUALITÉS</span>
              <ArrowUpRight />
            </a>
          </div>

          <div className="agenda-board" data-reveal>
            {featuredEvent ? (
              <div className="agenda-feature" aria-live="polite">
                <div className="feature-label">
                  <span className="live-dot" />
                  {featuredEventIsLive ? "EN CE MOMENT" : "PROCHAIN ÉVÉNEMENT"}
                </div>
                <time className="agenda-feature-date" dateTime={featuredEvent.start}>
                  <span>{featuredEvent.startDay}</span>
                  {featuredEvent.endDay && (
                    <>
                      <i>→</i>
                      <span>{featuredEvent.endDay}</span>
                    </>
                  )}
                  <small>{featuredEvent.monthLong}</small>
                </time>
                <div className="feature-copy">
                  <p>{featuredEvent.weekday} · {featuredEvent.detail.toUpperCase()}</p>
                  <h3>
                    {featuredEvent.featureTitle}
                    <br />
                    <em>{featuredEvent.featureAccent}</em>
                  </h3>
                </div>
                <span className="feature-v">V</span>
              </div>
            ) : (
              <div className="agenda-feature agenda-feature-empty" aria-live="polite">
                <div className="feature-label">SAISON 2026 · TERMINÉE</div>
                <div className="feature-copy">
                  <p>LE PROCHAIN RENDEZ-VOUS SE PRÉPARE</p>
                  <h3>La suite<br /><em>arrive bientôt.</em></h3>
                </div>
                <span className="feature-v">V</span>
              </div>
            )}
            <div className="agenda-list">
              <div className="agenda-list-heading">
                <span>À VENIR</span>
                <small>{upcomingEvents.length} DATES</small>
              </div>
              {upcomingEvents.slice(1).map((item) => (
                <article
                  className="agenda-row"
                  key={item.start}
                >
                  <time className="agenda-date" dateTime={item.start}>
                    <strong>{item.date}</strong>
                    <span>{item.month}</span>
                  </time>
                  <div className="agenda-event-copy">
                    <small>{item.weekday}</small>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <span className="agenda-tag">{item.tag}</span>
                  <span className="agenda-row-mark" aria-hidden="true">↗</span>
                </article>
              ))}
              {upcomingEvents.length <= 1 && (
                <div className="agenda-empty-row">
                  <span>Les prochaines dates seront annoncées ici.</span>
                </div>
              )}
            </div>
          </div>

          <div className="agenda-recurring" data-reveal>
            <div className="recurring-orbit" aria-hidden="true">
              <span>RUN</span>
            </div>
            <div className="recurring-copy">
              <p>LE RENDEZ-VOUS HEBDOMADAIRE</p>
              <h3>Running Club</h3>
            </div>
            <div className="recurring-when">
              <span>TOUS LES</span>
              <strong>MERCREDIS</strong>
            </div>
            <span className="recurring-city">MADRID · VETEUROPEA</span>
          </div>

          <div className="agenda-past" data-reveal>
            <div className="agenda-subheading">
              <div>
                <p>LES PREMIERS SOUVENIRS</p>
                <h3>Événements passés</h3>
              </div>
              <span>SAISON 2026/27 · {pastEvents.length} DATES</span>
            </div>
            <div className="past-grid">
              {pastEvents.map((item) => (
                <article className="past-card" key={item.start}>
                  <time dateTime={item.start}>
                    <strong>{item.date}</strong>
                    <span>{item.month}</span>
                  </time>
                  <div>
                    <small>{item.weekday}</small>
                    <h4>{item.title}</h4>
                    {item.detail && <p>{item.detail}</p>}
                  </div>
                  <span className="past-status">PASSÉ</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="team-section" id="equipe">
          <div className="team-emblem" data-reveal>
            <div className="team-logo-ring">
              <img src="/veteuropea-official.jpeg" alt="Logo officiel Veteuropea" />
            </div>
            <p>VUESTRO EQUIPO · MADRID</p>
          </div>

          <div className="team-copy" data-reveal>
            <div className="section-kicker section-kicker-dark">
              <span>04</span>
              <p>L’ÉQUIPE</p>
            </div>
            <p className="section-overline">DES ÉTUDIANTS AU SERVICE DES ÉTUDIANTS</p>
            <h2>
              Une équipe engagée.
              <em>Un collectif accessible.</em>
            </h2>
            <p className="team-lede">
              Derrière chaque projet, il y a des étudiants qui connaissent la
              réalité du campus et qui ont envie de faire bouger les choses,
              sérieusement — sans jamais se prendre trop au sérieux.
            </p>
            <div className="team-roles" aria-label="Pôles du BDE">
              {teamRoles.map((role, index) => (
                <span key={role}>
                  <i>0{index + 1}</i>
                  {role}
                </span>
              ))}
            </div>
            <a
              className="button button-outline"
              href="https://www.instagram.com/bde.veteuropea/"
              target="_blank"
              rel="noreferrer"
            >
              Contacter le BDE
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="final-cta" data-reveal>
          <p>VETEUROPEA · MADRID</p>
          <h2>
            Prêt à vivre<br />
            <em>l’expérience ?</em>
          </h2>
          <a
            href="https://www.instagram.com/bde.veteuropea/"
            target="_blank"
            rel="noreferrer"
          >
            <span>REJOINDRE LA COMMUNAUTÉ</span>
            <ArrowUpRight />
          </a>
          <span className="cta-word" aria-hidden="true">VET</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <img src="/veteuropea-panther-mark.jpg" alt="" />
          </span>
          <div>
            <strong>VETEUROPEA</strong>
            <span>BDE · UNIVERSIDAD EUROPEA · MADRID</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="#bde">Le BDE</a>
          <a href="#experience">L’expérience</a>
          <a href="#agenda">Agenda</a>
          <a href="#equipe">L’équipe</a>
        </div>
        <a
          className="footer-instagram"
          href="https://www.instagram.com/bde.veteuropea/"
          target="_blank"
          rel="noreferrer"
        >
          INSTAGRAM <ArrowUpRight />
        </a>
        <div className="footer-bottom">
          <span>© 2026 VETEUROPEA</span>
          <span>HECHO CON ENERGÍA EN MADRID</span>
          <a href="#accueil">RETOUR EN HAUT ↑</a>
        </div>
      </footer>
    </div>
  );
}
