// landing.js
// Handles scroll-triggered animations and numeric counters

// ------- Intersection Observer for fade/slide animations -------
const observerOptions = {
  threshold: 0.1,
};
const animateObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // stop observing once animated
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// ------- Counter animation -------
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const range = target - start;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  const increment = target > start ? 1 : -1;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current.toLocaleString();
    if (current === target) clearInterval(timer);
  }, stepTime);
}

const counterSection = document.getElementById('trust');
if (counterSection) {
  const countersObserved = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.number');
        nums.forEach(numEl => {
          const target = parseInt(numEl.getAttribute('data-target'), 10);
          animateCounter(numEl, target);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countersObserved.observe(counterSection);
}

// ------- Smooth scrolling for internal links -------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
