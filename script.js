// theme toggle
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const knob = toggle.querySelector('.knob');

function setTheme(t){
  root.setAttribute('data-theme', t);
  knob.textContent = t === 'light' ? '☀' : '☾';
  localStorage.setItem('theme', t);
}

const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(saved);

toggle.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// contact form (placeholder — connect a real handler like Formspree to make this live)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Connect a form handler (e.g. Formspree) to make this live.');
  });
}

// mobile side nav
const hamburger = document.getElementById('hamburger');
const sideNav = document.getElementById('sideNav');
const sideNavOverlay = document.getElementById('sideNavOverlay');

function closeSideNav(){
  hamburger.classList.remove('open');
  sideNav.classList.remove('open');
  sideNavOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function toggleSideNav(){
  const isOpen = sideNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  sideNavOverlay.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

if (hamburger) {
  hamburger.addEventListener('click', toggleSideNav);
  sideNavOverlay.addEventListener('click', closeSideNav);
  sideNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSideNav);
  });
}