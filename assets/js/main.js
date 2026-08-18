// ============ Mobile nav ============
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
}

// ============ Scroll reveal ============
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ============ Animated counters ============
function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll('[data-counter]');
if ('IntersectionObserver' in window && counters.length) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => cio.observe(c));
}

// ============ Back-to-top ============
const topBtn = document.querySelector('.float-btn.top');
if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 500);
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ Product filter (products page) ============
const filterButtons = document.querySelectorAll('.cat-tabs button');
const productItems = document.querySelectorAll('[data-cat]');
if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productItems.forEach((item) => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// ============ Product search ============
const searchInput = document.querySelector('#productSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    productItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? '' : 'none';
    });
    filterButtons.forEach((b) => b.classList.remove('active'));
    document.querySelector('.cat-tabs button[data-filter="all"]')?.classList.add('active');
  });
}

// ============ Forms (contact / quote) — front-end only ============
document.querySelectorAll('form[data-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successBox = form.parentElement.querySelector('.form-success');
    if (successBox) {
      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
  });
});

// ============ Current year in footer ============
document.querySelectorAll('.cur-year').forEach((el) => (el.textContent = new Date().getFullYear()));

// ============ Demo watermark tiling ============
const diagonal = document.querySelector('.demo-diagonal');
if (diagonal) {
  function buildWatermark() {
    diagonal.innerHTML = '';
    const w = window.innerWidth;
    const h = window.innerHeight;
    const stepX = 260;
    const stepY = 140;
    const cols = Math.ceil(w / stepX) + 3;
    const rows = Math.ceil(h / stepY) + 3;
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const el = document.createElement('span');
        el.textContent = 'DEMO \u2022 MADE BY SHEHROZ';
        el.style.left = (c * stepX - 60) + 'px';
        el.style.top = (r * stepY) + 'px';
        diagonal.appendChild(el);
      }
    }
  }
  buildWatermark();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildWatermark, 200);
  });
}
