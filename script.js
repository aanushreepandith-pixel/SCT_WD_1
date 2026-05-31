// ── 1. NAVBAR: Toggle 'scrolled' class on scroll ──────────────────────────
const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
});

// ── 2. HAMBURGER MENU: Toggle mobile menu open/close ──────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
    closeMobile();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobile();
});

// ── 3. SMOOTH SCROLL: Smooth anchor navigation ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobile();
      }
    }
  });
});

// ── 4. COUNTER ANIMATION: Animate numbers in hero stats ───────────────────
const counters = document.querySelectorAll('[data-count]');
let hasAnimated = false;

function countUp(el) {
  const target = parseInt(el.getAttribute('data-count'));
  let count = 0;
  const timer = setInterval(() => {
    count += target / 200;
    if (count >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(count);
    }
  }, 10);
}

const statsSection = document.querySelector('.hero-stats');
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !hasAnimated) {
    counters.forEach(countUp);
    hasAnimated = true;
  }
}, { threshold: 0.5 }).observe(statsSection);

// ── 5. SCROLL-TO-TOP BUTTON ───────────────────────────────────────────────
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 6. CARD REVEAL: Animate feature cards on scroll ──────────────────────
const cards = document.querySelectorAll('.card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  cardObserver.observe(card);
});

// ── 7. PARALLAX: Subtle parallax on hero background ──────────────────────
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
});