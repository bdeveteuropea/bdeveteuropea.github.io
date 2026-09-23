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
  },
  {
    number: "02",
    title: "Accompagner",
    label: "Ne jamais rester seul",
    text: "Partager les bons repères, relayer les besoins et rendre l’arrivée comme le quotidien beaucoup plus simples.",
  },
  {
    number: "03",
    title: "Faire vibrer",
    label: "Des moments qui comptent",
    text: "Imaginer des expériences fortes, généreuses et bien pensées — sur le campus comme ailleurs.",
  },
];

const agendaItems = [
  { index: "01", title: "Week-ends & voyages", tag: "S’ÉVADER" },
  { index: "02", title: "Soirées & rencontres", tag: "SE RETROUVER" },
  { index: "03", title: "Campus & entraide", tag: "SE SOUTENIR" },
];

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

          <div className="hero-visual reveal reveal-3" aria-label="Emblème panthère Veteuropea">
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
              <p className="section-overline">L’AGENDA SE PRÉPARE</p>
              <h2>
                La suite arrive.
                <em>Reste connecté.</em>
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
            <div className="agenda-feature">
              <div className="feature-label">
                <span className="live-dot" /> PROCHAINEMENT
              </div>
              <div className="feature-copy">
                <p>MADRID · 2026/27</p>
                <h3>Une nouvelle saison<br />à vivre ensemble.</h3>
              </div>
              <span className="feature-v">V</span>
            </div>
            <div className="agenda-list">
              {agendaItems.map((item) => (
                <a
                  className="agenda-row"
                  key={item.index}
                  href="https://www.instagram.com/bde.veteuropea/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="agenda-index">{item.index}</span>
                  <strong>{item.title}</strong>
                  <small>{item.tag}</small>
                  <ArrowUpRight />
                </a>
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
