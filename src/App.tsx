import { useEffect, useMemo, useRef, useState } from 'react';
import { getInitialSiteContent, loadSiteContent } from './content/editableContent';

const navLinks = [
  ['Offering', '#services'],
  ['Classes', '#classes'],
  ['Experience', '#experience'],
  ['Gyms', '#gyms'],
  ['Trainers', '#trainers'],
  ['Results', '#stories'],
  ['Contact', '#contact'],
] as const;

const heroImage =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80';

const services = [
  {
    number: '01',
    title: 'Outdoor Group Classes',
    description:
      'Signature small-group sessions in Male and Hulhumale with structured programming, coach attention, and a sharper community feel.',
  },
  {
    number: '02',
    title: 'Personal Training',
    description:
      'Private coaching for clients who want measurable physique, strength, or performance outcomes with higher accountability and discretion.',
  },
  {
    number: '03',
    title: 'Lifestyle Coaching',
    description:
      'Nutrition, recovery, and weekly planning support designed to improve adherence and make progress sustainable beyond the first phase.',
  },
  {
    number: '04',
    title: 'Private and Corporate Groups',
    description:
      'Curated fitness activations for companies, residences, schools, and private communities seeking a premium coached offering on-site.',
  },
];

const formats = [
  {
    name: 'Beach Conditioning',
    location: 'Male waterfront and open-air locations',
    text: 'Open-air sessions with pace, atmosphere, and coach-led intensity that make training feel social, premium, and repeatable.',
    tone: 'format-card sunrise',
    image:
      'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Partner Gym Sessions',
    location: 'Associated gym spaces when equipment matters',
    text: 'A more technical format for strength progress, exercise execution, and efficient one-to-one or small-group coaching.',
    tone: 'format-card steel',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Private Outdoor Coaching',
    location: 'Flexible locations in Male and Hulhumale',
    text: 'Flexible premium coaching for clients who value privacy, schedule control, and a more personalised path to results.',
    tone: 'format-card night',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  },
];

const experiences = [
  {
    id: 'outdoor',
    label: 'Outdoor Classes',
    title: 'A flagship outdoor class experience built for energy, retention, and visible momentum.',
    description:
      'This format brings structure to high-traffic outdoor spaces through concise coaching cues, strong pacing, and a member experience that feels organised from the first minute.',
    bullets: ['Sunrise and evening schedules', 'Scalable coaching for mixed ability levels', 'High-accountability atmosphere with repeat attendance'],
    image:
      'https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1400&q=80',
    stat: 'Most requested',
  },
  {
    id: 'gym',
    label: 'Partner Gym',
    title: 'Equipment-led coaching for clients whose next phase requires more precision and progression.',
    description:
      'Trusted partner facilities allow the brand to deliver a more complete strength and physique service without compromising coaching quality or client convenience.',
    bullets: ['Technique-led strength sessions', 'Partner venue access when appropriate', 'Progress tracking with clearer technical oversight'],
    image:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=80',
    stat: 'Best for 1:1 strength',
  },
  {
    id: 'personal',
    label: 'Private Coaching',
    title: 'A higher-touch coaching model for clients who expect privacy, flexibility, and clarity.',
    description:
      'Private coaching is designed for busy professionals, return-to-fitness clients, and anyone who wants a more tailored service with a stronger advisory component.',
    bullets: ['Flexible location planning', 'Lifestyle and nutrition alignment', 'Tailored programming with coach-led accountability'],
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80',
    stat: 'Highest-touch coaching',
  },
] as const;

const stats = [
  { value: 2, suffix: '', label: 'Active service locations' },
  { value: 4, suffix: '', label: 'Core revenue-ready offerings' },
  { value: 3, suffix: '', label: 'Lead trainers on profile' },
  { value: 30, suffix: '+', label: 'Client journeys supported' },
];

type ApproachIconName = 'target' | 'strength' | 'onboard' | 'event' | 'sport' | 'routine' | 'program' | 'outdoor' | 'group' | 'mobility' | 'accountability' | 'performance';

const targets = [
  { icon: 'target' as const, text: 'Body-composition change with stronger adherence' },
  { icon: 'strength' as const, text: 'Strength, movement quality, and posture improvement' },
  { icon: 'onboard' as const, text: 'Premium beginner onboarding into structured training' },
  { icon: 'event' as const, text: 'Event, travel, and occasion-ready physique preparation' },
  { icon: 'sport' as const, text: 'Sport and conditioning development for active clients' },
  { icon: 'routine' as const, text: 'Sustainable training systems for demanding schedules' },
];

const skills = [
  { icon: 'program' as const, text: 'Periodized strength and conditioning design' },
  { icon: 'outdoor' as const, text: 'Outdoor session architecture and flow management' },
  { icon: 'group' as const, text: 'Premium small-group coaching systems' },
  { icon: 'mobility' as const, text: 'Movement quality and mobility intervention' },
  { icon: 'accountability' as const, text: 'Lifestyle accountability and client retention support' },
  { icon: 'performance' as const, text: 'Personal training for performance and physique goals' },
];

const stories = [
  {
    metric: '18 kg',
    title: 'Body composition reset over seven months',
    text: 'A Hulhumale client moved from stop-start training to a coached system with visible fat-loss results, stronger movement quality, and far better adherence.',
    quote:
      'The difference was not motivation. It was finally having structure, accountability, and sessions that fit real life.',
    client: 'Private coaching client',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    metric: '4x / week',
    title: 'Training consistency rebuilt for a busy parent',
    text: 'Hybrid scheduling, flexible locations, and clear weekly planning helped a parent re-enter training without sacrificing family or work commitments.',
    quote:
      'This was the first fitness plan that felt professionally managed instead of impossible to maintain.',
    client: 'Hybrid coaching client',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80&sat=-40',
  },
  {
    metric: '30+',
    title: 'A more magnetic class community',
    text: 'The group offering created a stronger word-of-mouth engine, better member retention, and a more visible training culture around the brand.',
    quote:
      'People stayed because the sessions felt premium, energetic, and well-led every single week.',
    client: 'Group class member feedback',
    image:
      'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1000&q=80',
  },
];

const galleryImages = [
  {
    title: 'Open-air conditioning',
    image:
      'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Strength floor sessions',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Team training energy',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Private coaching moments',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80',
  },
] as const;

const highlights = [
  'A polished outdoor-first coaching brand in Male and Hulhumale',
  'Partner gym access when a client outcome needs equipment precision',
  'Service lines designed for beginners, professionals, and performance-driven clients',
];

function CountUp({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frameId = 0;
    const duration = 1400;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

function ApproachIcon({ type }: { type: ApproachIconName }) {
  switch (type) {
    case 'target':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case 'strength':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="9" width="4" height="6" rx="1" fill="currentColor" />
          <rect x="18" y="9" width="4" height="6" rx="1" fill="currentColor" />
          <rect x="6" y="10" width="12" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'onboard':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3" fill="currentColor" />
          <path d="M6 19c1.8-3 3.8-4.6 6-4.6s4.2 1.6 6 4.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'event':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 3v4M17 3v4M3 10h18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'sport':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 9h15M4.5 15h15M12 4a12 12 0 0 0 0 16M12 4a12 12 0 0 1 0 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'routine':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7v6l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'program':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 13h8M8 17h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'outdoor':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="17" cy="7" r="3" fill="currentColor" />
          <path d="M4 19h16M6 19l4-7 4 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'group':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8" cy="9" r="2.5" fill="currentColor" />
          <circle cx="16" cy="9" r="2.5" fill="currentColor" />
          <path d="M4.5 18c1-2.2 2.2-3.4 3.5-3.4 1.3 0 2.5 1.2 3.5 3.4M12.5 18c1-2.2 2.2-3.4 3.5-3.4 1.3 0 2.5 1.2 3.5 3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'mobility':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 15c2.2 0 2.2-6 4.5-6S12.8 15 15 15s2.2-6 4.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'accountability':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8.5 12 4l6 4.5v6.5c0 3.2-2.6 5.4-6 6.8-3.4-1.4-6-3.6-6-6.8z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 12.2 11.3 14.5 15 10.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'performance':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 17h16M6 17l2.8-4 2.4 2.4L15.6 9 18 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  const initialContent = useMemo(() => getInitialSiteContent(), []);
  const [classes, setClasses] = useState(initialContent.classes);
  const [partnerGyms, setPartnerGyms] = useState(initialContent.partnerGyms);
  const [trainers, setTrainers] = useState(initialContent.trainers);

  const [activeExperience, setActiveExperience] = useState<(typeof experiences)[number]['id']>(
    experiences[0].id,
  );
  const [activeStory, setActiveStory] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ title: string; image: string } | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const currentExperience = experiences.find((item) => item.id === activeExperience) ?? experiences[0];
  const currentStory = stories[activeStory];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      setActiveStory((s) => (s + 1) % stories.length);
    } else {
      setActiveStory((s) => (s + stories.length - 1) % stories.length);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    const revealNodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % stories.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const loaded = await loadSiteContent();
      if (!active) {
        return;
      }

      setClasses(loaded.classes);
      setPartnerGyms(loaded.partnerGyms);
      setTrainers(loaded.trainers);
    };

    void run();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page-shell">
      <header
        className="hero"
        data-reveal
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.58) 34%, rgba(0, 0, 0, 0.26) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.34)), url(${heroImage})`,
        }}
      >
        <div className="hero-overlay" />
        <nav className="topbar">
          <a className="brand" href="#top">
            <span className="brand-mark">S</span>
            <span className="brand-text">Stride Collective</span>
          </a>
          <div className="nav-links">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </div>
          <a className="primary-link" href="#contact">
            Request a consultation
          </a>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy" id="top">
            <p className="eyebrow hero-eyebrow">Premium Outdoor Training Collective</p>
            <h1>
              MOVE.
              <br />
              TRAIN.
              <br />
              OWN YOUR
              <span> ROUTINE.</span>
            </h1>
            <p className="intro">
              A modern coaching brand delivering premium group training, private coaching, and
              partner-gym sessions across Male and Hulhumale.
            </p>
            <p className="supporting-copy">
              Stride is built for clients and partners who want visible quality without the delay
              or overhead of building a dedicated facility. We bring the standard, the coaching
              system, and the service experience directly to the right environment.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="#services">
                Review offering
              </a>
              <a className="button button-ghost" href="#portfolio">
                Explore portfolio
              </a>
            </div>
          </section>

          <aside className="hero-card">
            <div className="hero-card-head">
              <span className="card-label">What clients come for</span>
              <span className="status-pill">Open for bookings</span>
            </div>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-note">
              {currentExperience.stat}. Sunrise classes, evening coaching, and one-to-one advisory
              support delivered with a more premium operating standard.
            </div>
          </aside>
        </div>

        <div className="stats-strip" ref={statsRef}>
          {stats.map((item) => (
            <div className="stat-item" key={item.label}>
              <strong>
                <CountUp start={statsVisible} suffix={item.suffix} target={item.value} />
              </strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </header>

      <main>
        <section className="section" data-reveal id="services">
          <div className="section-heading">
            <p className="eyebrow">Core Services</p>
            <h2>Positioned as a premium coaching offer, not a generic fitness menu.</h2>
          </div>
          <div className="card-grid four-up">
            {services.map((service) => (
              <article className="info-card" key={service.title}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section format-section" data-reveal id="formats">
          <div className="section-heading">
            <p className="eyebrow">Session Formats</p>
            <h2>Different environments, one unmistakable service standard.</h2>
          </div>
          <div className="format-grid">
            {formats.map((format) => (
              <article
                className={format.tone}
                key={format.name}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.72)), url(${format.image})`,
                }}
              >
                <p className="format-location">{format.location}</p>
                <h3>{format.name}</h3>
                <p>{format.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience-section" data-reveal id="experience">
          <div className="section-heading">
            <p className="eyebrow">Interactive Experience</p>
            <h2>Explore the operating model clients and partners are actually buying into.</h2>
          </div>
          <div className="experience-shell">
            <div className="experience-tabs" role="tablist" aria-label="Training experience modes">
              {experiences.map((experience) => (
                <button
                  key={experience.id}
                  className={experience.id === currentExperience.id ? 'experience-tab active' : 'experience-tab'}
                  onClick={() => setActiveExperience(experience.id)}
                  type="button"
                >
                  <span>{experience.label}</span>
                  <strong>{experience.stat}</strong>
                </button>
              ))}
            </div>

            <div className="experience-stage">
              <div
                className="experience-visual"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.46)), url(${currentExperience.image})` }}
              />
              <div className="experience-copy">
                <p className="eyebrow">{currentExperience.label}</p>
                <h3>{currentExperience.title}</h3>
                <p>{currentExperience.description}</p>
                <ul className="experience-points">
                  {currentExperience.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section approach-section" data-reveal id="approach">
          <div className="section-heading">
            <p className="eyebrow">Approach</p>
            <h2>Who we serve and the coaching system we deliver.</h2>
          </div>

          <div className="approach-grid">
            <article className="approach-card">
              <p className="approach-kicker">Targets</p>
              <h3>Outcomes clients come to us for.</h3>
              <ul className="approach-list">
                {targets.map((item) => (
                  <li key={item.text}>
                    <span className="approach-item-icon" aria-hidden="true">
                      <ApproachIcon type={item.icon} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="approach-card approach-card-accent">
              <p className="approach-kicker">Skills</p>
              <h3>Capabilities behind every session.</h3>
              <ul className="approach-list">
                {skills.map((item) => (
                  <li key={item.text}>
                    <span className="approach-item-icon" aria-hidden="true">
                      <ApproachIcon type={item.icon} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section classes-section" data-reveal id="classes">
          <div className="section-heading">
            <p className="eyebrow">Class Schedule</p>
            <h2>Every session is coached, programmed, and built for a purpose.</h2>
          </div>
          <div className="classes-grid">
            {classes.map((cls) => (
              <article className="class-card" key={cls.name}>
                <div
                  className="class-card-image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.64)), url(${cls.image})` }}
                >
                  <span className={`class-intensity intensity-${cls.intensity.toLowerCase().replace(/[^a-z]/g, '-')}`}>{cls.intensity}</span>
                </div>
                <div className="class-card-body">
                  <div className="class-meta">
                    <span className="class-type">{cls.type}</span>
                    {cls.slots && <span className="class-slots">{cls.slots} spots</span>}
                  </div>
                  <h3>{cls.name}</h3>
                  <p>{cls.description}</p>
                  <div className="class-schedule-row">
                    <span className="class-schedule-icon">&#128337;</span>
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="class-schedule-row">
                    <span className="class-schedule-icon">&#128205;</span>
                    <span>{cls.location}</span>
                  </div>
                  <a className="class-book-btn" href="#contact">Book this class</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section partner-section" data-reveal id="gyms">
          <div className="section-heading">
            <p className="eyebrow">Partner Gyms</p>
            <h2>Equipment access when client outcomes demand it.</h2>
          </div>
          <div className="partner-grid">
            {partnerGyms.map((gym) => (
              <article className="partner-card" key={gym.name}>
                <div
                  className="partner-image"
                  style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.3) 100%), url(${gym.image})` }}
                >
                  <div className="partner-image-copy">
                    <p className="eyebrow">{gym.location}</p>
                    <h3>{gym.name}</h3>
                  </div>
                </div>
                <div className="partner-body">
                  <p>{gym.description}</p>
                  <div className="tag-row">
                    {gym.features.map((f) => <span key={f}>{f}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" data-reveal id="trainers">
          <div className="section-heading">
            <p className="eyebrow">Trainer Profiles</p>
            <h2>A trainer roster with distinct strengths and one shared client standard.</h2>
          </div>
          <div className="card-grid three-up">
            {trainers.map((trainer) => (
              <article className="trainer-card" key={trainer.name}>
                <div className="trainer-avatar-wrap">
                  <img alt={trainer.name} className="trainer-avatar" src={trainer.photo} />
                  <span className="trainer-badge">{trainer.badge}</span>
                </div>
                <h3 className="trainer-name">{trainer.name.split(' ')[0].toUpperCase()}</h3>
                <p className="trainer-role">{trainer.role}</p>
                <div className="tag-row trainer-tags">
                  {trainer.focus.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="trainer-bio">
                  {trainer.bio.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <a className="trainer-book-btn" href="#contact">
                  Book with {trainer.name.split(' ')[0]}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section story-panel" data-reveal id="stories">
          <div className="section-heading">
            <p className="eyebrow">Success Stories</p>
            <h2>Client outcomes presented as a live, rotating proof point.</h2>
          </div>
          <div className="story-shell">
            <article className="story-stage">
              <div
                className="story-stage-visual"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.56)), url(${currentStory.image})`,
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
              <div className="story-stage-copy">
                <p className="eyebrow">{currentStory.client}</p>
                <p className="story-metric">{currentStory.metric}</p>
                <h3>{currentStory.title}</h3>
                <p>{currentStory.text}</p>
                <blockquote className="story-quote">“{currentStory.quote}”</blockquote>
                <div className="story-controls">
                  <button
                    className="story-control"
                    onClick={() => setActiveStory((activeStory + stories.length - 1) % stories.length)}
                    type="button"
                  >
                    Previous
                  </button>
                  <button
                    className="story-control story-control-primary"
                    onClick={() => setActiveStory((activeStory + 1) % stories.length)}
                    type="button"
                  >
                    Next story
                  </button>
                </div>
              </div>
            </article>

            <div className="story-rail" role="tablist" aria-label="Success stories">
              {stories.map((story, index) => (
                <button
                  key={story.title}
                  className={index === activeStory ? 'story-rail-card active' : 'story-rail-card'}
                  onClick={() => setActiveStory(index)}
                  type="button"
                >
                  <span>{story.metric}</span>
                  <strong>{story.title}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery-section" data-reveal id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Visual Portfolio</p>
            <h2>Brand imagery that helps the collective read as active, premium, and credible.</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((item) => (
              <article
                className="gallery-card"
                key={item.title}
                onClick={() => setLightboxImage(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(item)}
              >
                <img alt={item.title} src={item.image} />
                <div className="gallery-caption">
                  {item.title}
                  <span className="gallery-expand-icon">&#x2922;</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {lightboxImage && (
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <img alt={lightboxImage.title} src={lightboxImage.image.replace('w=1000', 'w=1800')} />
              <div className="lightbox-caption">{lightboxImage.title}</div>
              <button className="lightbox-close" onClick={() => setLightboxImage(null)} type="button">✕</button>
            </div>
          </div>
        )}

        <section className="section portfolio-callout" data-reveal id="portfolio">
          <div>
            <p className="eyebrow">Business Portfolio</p>
            <h2>A business-ready profile for client acquisition, partnerships, and venue conversations.</h2>
          </div>
          <p>
            This page is structured as a front-facing portfolio: it clarifies the brand position,
            service model, trainer expertise, visual identity, and proof of delivery in a format
            suitable for new clients, hotel partners, corporate buyers, and venue operators.
          </p>
        </section>
      </main>

      <footer className="footer footer-expanded" data-reveal id="contact">
        <div className="footer-intro">
          <p className="eyebrow">Contact</p>
          <h2>Ready to discuss classes, personal coaching, or a branded fitness partnership?</h2>
          <p className="text-dim">Male and Hulhumale, Maldives</p>
          <p className="text-dim">Outdoor classes, private coaching, partner-gym sessions, and branded activations.</p>
          <a className="whatsapp-cta" href="https://wa.me/9607XXXXXXX" target="_blank" rel="noreferrer">
            <span className="whatsapp-icon">&#x1F4AC;</span>
            Chat on WhatsApp
          </a>
          <a className="contact-email" href="mailto:hello@stridecollective.mv">hello@stridecollective.mv</a>
        </div>
        <div className="contact-form-wrap">
          {formSent ? (
            <div className="form-success">
              <p>Message received. We will be in touch shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                  type="text"
                  value={formState.name}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  required
                  type="email"
                  value={formState.email}
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleFormChange}
                  placeholder="Tell us about your goals or enquiry"
                  required
                  rows={4}
                  value={formState.message}
                />
              </div>
              <button className="button button-solid form-submit" type="submit">Send enquiry</button>
            </form>
          )}
        </div>
      </footer>

      <a
        className="float-cta"
        href="https://wa.me/9607XXXXXXX"
        target="_blank"
        rel="noreferrer"
        aria-label="Book a session via WhatsApp"
      >
        Book a session
      </a>
    </div>
  );
}

export default App;
