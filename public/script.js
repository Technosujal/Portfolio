document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal Implementation ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden-up');
  hiddenElements.forEach((el) => observer.observe(el));

  // Optional: Add simple rotation effect to social cards on mousemove for 3D feel
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Contact Form Handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const originalText = btn.innerHTML;

      btn.innerHTML = 'Message Sent <i class="fa-solid fa-check"></i>';
      btn.style.background = '#39ff14';
      btn.style.color = '#000';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;

  if (themeToggle && icon) {
    // Check saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.setAttribute('data-theme', 'dark');
      icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
      if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

});
