// iOS/Safari: prevent restoring scroll position mid-page after refresh
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

window.addEventListener('pageshow', () => {
  if (!location.hash) window.scrollTo(0, 0);
});

// 1) Reveal on scroll (safe fallback)
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) e.target.classList.add('on');
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('on'));
  }
})();

// 2) Benefits accordion
function setPanelHeight(panel, open) {
  if (!panel) return;
  panel.style.maxHeight = open ? (panel.scrollHeight + "px") : "0px";
}

document.querySelectorAll('[data-acc]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-acc');
    const wrap = document.getElementById(id);
    const panel = wrap ? wrap.querySelector('.panel') : null;
    if (!wrap || !panel) return;

    const isOpen = wrap.getAttribute('aria-expanded') === 'true';

    // close others
    document.querySelectorAll('.benefit').forEach(b => {
      if (b.id !== id) {
        b.setAttribute('aria-expanded', 'false');
        const bbtn = b.querySelector('button.head');
        if (bbtn) bbtn.setAttribute('aria-expanded', 'false');
        setPanelHeight(b.querySelector('.panel'), false);
      }
    });

    wrap.setAttribute('aria-expanded', String(!isOpen));
    btn.setAttribute('aria-expanded', String(!isOpen));
    setPanelHeight(panel, !isOpen);
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.benefit[aria-expanded="true"]').forEach(b => {
    setPanelHeight(b.querySelector('.panel'), true);
  });
});

// 3) Floating CTA
const fab = document.getElementById('fab');
const fabBtn = document.getElementById('fabBtn');
const fabMenu = document.getElementById('fabMenu');

if (fab && fabBtn && fabMenu) {
  fabBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = fab.classList.toggle('open');
    fabMenu.setAttribute('aria-hidden', String(!open));
  });

  document.addEventListener('click', (e) => {
    if (!fab.contains(e.target)) {
      fab.classList.remove('open');
      fabMenu.setAttribute('aria-hidden', 'true');
    }
  });

  function updateFabVisibility() {
    const trigger = Math.max(200, window.innerHeight * 0.55);
    const y = window.scrollY || document.documentElement.scrollTop || 0;

    if (y > trigger) {
      fab.classList.remove('fab-hidden');
    } else {
      fab.classList.add('fab-hidden');
      fab.classList.remove('open');
      fabMenu.setAttribute('aria-hidden', 'true');
    }
  }

  updateFabVisibility();
  window.addEventListener('scroll', updateFabVisibility, { passive: true });
}

// 4) Prefill quote topic (no double-scroll)
function openQuoteWithTopic(topic) {
  const select = document.getElementById('topic');
  if (select) {
    const options = Array.from(select.options).map(o => o.text);
    select.value = options.includes(topic) ? topic : "General";
  }

  const quote = document.getElementById('quote');
  if (quote) quote.scrollIntoView({ behavior: "smooth", block: "start" });

  if (fab && fabMenu) {
    fab.classList.remove('open');
    fabMenu.setAttribute('aria-hidden', 'true');
  }

  setTimeout(() => document.getElementById('name')?.focus(), 450);
}

document.querySelectorAll('[data-open-quote]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const topic = a.getAttribute('data-open-quote') || "General";
    openQuoteWithTopic(topic);
  });
});

function pushDataLayerEvent(eventName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName });
}

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    pushDataLayerEvent('whatsapp_contact');
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    pushDataLayerEvent('phone_call_click');
  });
});

const contactForm = document.getElementById("contact-form");
const phoneInput = document.getElementById("phone");
const nameInput = document.getElementById("firstName");
const messageInput = document.getElementById("message");

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    // Dynamic validation styling
    const parent = phoneInput.closest('.input-wrap');
    if (x[1] && x[1].length === 3 && x[2].length === 3 && x[3].length === 4) {
      parent?.classList.add('valid');
    } else {
      parent?.classList.remove('valid');
    }
  });
}

if (nameInput) {
  nameInput.addEventListener('input', () => {
    const parent = nameInput.closest('.input-wrap');
    if (nameInput.value.trim().length > 1) {
      parent?.classList.add('valid');
    } else {
      parent?.classList.remove('valid');
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');

    let errorEl = e.target.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.style.color = '#b00020';
      errorEl.style.marginTop = '8px';
      errorEl.style.fontSize = '13px';
      submitBtn.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = '';

    try {
      const formData = new FormData(e.target);
      const phoneField = e.target.querySelector('[name="fi-sender-phone"]');
      if (phoneField) {
        const raw = phoneField.value || '';
        const digits = raw.replace(/\D/g, '');
        if (digits) {
          let normalized = digits;
          if (digits.length === 10) {
            normalized = `+1${digits}`;
          } else if (digits.length === 11 && digits.startsWith('1')) {
            normalized = `+${digits}`;
          } else if (!digits.startsWith('+')) {
            normalized = `+${digits}`;
          }
          formData.set('fi-sender-phone', normalized);
        }
      }

      const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
      const fileInput = e.target.querySelector('input[type="file"][name="file"]');
      if (fileInput && fileInput.files && fileInput.files.length) {
        const compressedFiles = [];
        let totalBytes = 0;

        for (const file of Array.from(fileInput.files)) {
          if (!file.type.startsWith('image/')) continue;
          const compressed = await compressImage(file, 1280, 0.7);
          totalBytes += compressed.size;
          compressedFiles.push(compressed);
        }

        if (totalBytes > MAX_TOTAL_BYTES) {
          throw new Error('Total photo size exceeds 4 MB. Please choose smaller images.');
        }

        formData.delete('file');
        compressedFiles.forEach((file) => formData.append('file', file));
      }

      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const details = await response.text();
        console.error('Send failed:', response.status, details);
        throw new Error('Failed to send');
      }

      pushDataLayerEvent('generate_lead_form');

      // Celebration!
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b7a57a', '#d4af37', '#ffffff']
        });
      }

      // Success Animation
      contactForm.classList.add('success-mode');
      contactForm.innerHTML = `
            <div class="success-message reveal on" style="padding:40px 20px; text-align:center;">
              <div class="success-icon" style="font-size:48px; margin-bottom:16px;">✨</div>
              <h3 style="font-family:'Playfair Display', serif; font-size:28px; margin-bottom:12px;">Thank you, ${name}!</h3>
              <p style="color:var(--muted); font-size:16px; line-height:1.6; max-width:320px; margin:0 auto;">
                We've received your request and will reach out shortly. 
                <br><br>
                For an even faster quote, feel free to text a photo to:
                <br>
                <a href="sms:+15043279193" style="font-weight:800; color:var(--ink); text-decoration:none;">(504) 327-9193</a>
              </p>
            </div>
          `;
    } catch (err) {
      console.error('Send error:', err);
      errorEl.textContent = err?.message || 'Error. Please try again or call us.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.classList.remove('loading');
    }
  });
}

async function compressImage(file, maxSize, quality) {
  const img = await loadImage(file);
  const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
  const width = Math.round(img.width * ratio);
  const height = Math.round(img.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality);
  });

  const name = file.name.replace(/\.\w+$/, '') + '.jpg';
  return new File([blob], name, { type: 'image/jpeg' });
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

// 5) Photo upload previews
const photoInput = document.getElementById('attachment');
const photoThumbs = document.getElementById('photoThumbs');
let thumbUrls = [];

function clearThumbs() {
  thumbUrls.forEach((url) => URL.revokeObjectURL(url));
  thumbUrls = [];
  if (photoThumbs) photoThumbs.innerHTML = '';
}

if (photoInput && photoThumbs) {
  photoInput.addEventListener('change', () => {
    clearThumbs();
    const files = Array.from(photoInput.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const url = URL.createObjectURL(file);
      thumbUrls.push(url);
      const wrap = document.createElement('div');
      wrap.className = 'thumb';
      const img = document.createElement('img');
      img.src = url;
      img.alt = file.name || 'Uploaded photo';
      wrap.appendChild(img);
      photoThumbs.appendChild(wrap);
    });
  });
}

// 6) Lightbox (iOS-stable: no page jump + clean click logic)
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbFoot = document.getElementById('lbFoot');

let __lbScrollY = 0;

function openLightbox(src, title, foot) {
  if (!lb || !lbImg || !lbTitle || !lbFoot) return;

  // save scroll position (iOS safe)
  __lbScrollY = window.scrollY || document.documentElement.scrollTop || 0;

  // lock page without jump
  document.body.classList.add('lb-open');
  document.body.style.top = `-${__lbScrollY}px`;

  // open UI
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');

  // content
  lbImg.src = src;
  lbTitle.textContent = title || "Preview";
  lbFoot.textContent = foot || "Tap outside to close.";
}

function closeLightbox() {
  if (!lb || !lbImg) return;

  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');

  lbImg.src = "";

  // restore scroll safely
  const top = document.body.style.top;
  document.body.style.top = "";
  document.body.classList.remove('lb-open');

  const y = top ? Math.abs(parseInt(top, 10)) : __lbScrollY;
  window.scrollTo(0, y);
}

function clickedInside(el, selector) {
  return !!(el && el.closest && el.closest(selector));
}

// WORK gallery (before/after) — tap image => zoom
document.querySelectorAll('.shot[data-lb-src]').forEach(el => {
  el.addEventListener('click', () => {
    openLightbox(el.dataset.lbSrc, el.dataset.lbTitle, el.dataset.lbFoot);
  });
});

// PRICE guide — robust click logic
document.querySelectorAll('.price-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // 1) If user clicks the "Get a quote" link area, let the quote listener handle it
    if (e.target.closest('[data-open-quote]')) return;

    // 2) Otherwise, zoom image (even if image is broken or user taps card background)
    openLightbox(
      card.dataset.lbSrc,
      card.dataset.lbTitle,
      card.dataset.lbFoot || "Tap outside to close."
    );
  });
});

// Close: background click or X button (data-lb-close="1")
if (lb) {
  lb.addEventListener('click', (e) => {
    if (clickedInside(e.target, '[data-lb-close="1"]')) closeLightbox();
  });
}

// Close: Escape
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && lb && lb.classList.contains('open')) closeLightbox();
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
