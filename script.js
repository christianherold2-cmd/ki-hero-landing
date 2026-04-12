/* ═══════════════════════════════════════════════
   KI-Hero Landing Page — Script
   
   ★ PREISE HIER ÄNDERN ★
   Ändere die Werte unten, um die Preise auf der
   gesamten Seite automatisch anzupassen.
   ═══════════════════════════════════════════════ */

const PREISE = {
  einrichtung: 499,     // Einmalige Einrichtungsgebühr in €
  monatlich: 99,        // Monatliche Software-Gebühr in €
  proMinute: 0.15,      // Preis pro Telefonie-Minute in €
  avgMinutenProAnruf: 2.5,  // Durchschnittliche Minuten pro Anruf
  mitarbeiterKosten: 2000,  // Kosten eines Mitarbeiters für Vergleich
};

/* ═══════════ PREISE IN HTML EINSETZEN ═══════════ */
function updatePrices() {
  const el = (id) => document.getElementById(id);
  if (el('price-setup'))       el('price-setup').textContent = PREISE.einrichtung;
  if (el('price-monthly'))     el('price-monthly').textContent = PREISE.monatlich;
  if (el('price-per-minute'))  el('price-per-minute').textContent = PREISE.proMinute.toFixed(2).replace('.', ',');
}

/* ═══════════ KOSTENRECHNER ═══════════ */
function initCalculator() {
  const slider   = document.getElementById('callsPerDay');
  const display  = document.getElementById('callsDisplay');
  const soft     = document.getElementById('calcSoftware');
  const tele     = document.getElementById('calcTelephony');
  const total    = document.getElementById('calcTotal');
  const savings  = document.getElementById('calcSavings');
  if (!slider) return;

  function calc() {
    const calls = parseInt(slider.value, 10);
    display.textContent = calls;

    const monthlyMinutes = calls * PREISE.avgMinutenProAnruf * 30;
    const teleCost = monthlyMinutes * PREISE.proMinute;
    const totalCost = PREISE.monatlich + teleCost;
    const saved = PREISE.mitarbeiterKosten - totalCost;

    soft.textContent    = PREISE.monatlich + ' €';
    tele.textContent    = Math.round(teleCost).toLocaleString('de-DE') + ' €';
    total.textContent   = Math.round(totalCost).toLocaleString('de-DE') + ' €';
    savings.textContent = (saved > 0 ? '+' : '') + Math.round(saved).toLocaleString('de-DE') + ' €';
    savings.style.color = saved > 0 ? '#22c55e' : '#ef4444';
  }

  slider.addEventListener('input', calc);
  calc();
}

/* ═══════════ SCROLL ANIMATIONS ═══════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-aos], .price-card, .calculator, .step').forEach((el) => {
    observer.observe(el);
  });
}

/* ═══════════ COUNTER ANIMATION ═══════════ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current;
        }, 30);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => observer.observe(c));
}

/* ═══════════ NAVBAR ═══════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

/* ═══════════ SMOOTH SCROLL ═══════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════════ INIT ═══════════ */
document.addEventListener('DOMContentLoaded', () => {
  updatePrices();
  initCalculator();
  initScrollAnimations();
  initCounters();
  initNavbar();
  initSmoothScroll();
});
