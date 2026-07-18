/* ==========================================================
   PENGATURAN — UBAH DI SINI
   ========================================================== */

// Nomor WhatsApp (format: 62 + nomor tanpa angka 0 di depan)
// Contoh: 0812-3456-7890  →  '628125081032'
const NOMOR_WA = '628125081032';

/* ==========================================================
   DAFTAR PRODUK
   Cara menambah produk baru:
   1. Simpan foto ke folder: images/products/
   2. Tambahkan satu baris di daftar bawah ini
   Kategori tersedia: 'Pintu', 'Jendela', 'Furnitur', 'Lainnya'
   ========================================================== */

const PRODUK = [
  { name: 'Pintu Hitam',           file: 'pintu-hitam.jpg',       category: 'Pintu'    },
  { name: 'Pintu Kaca',            file: 'pintu-kaca.jpg',        category: 'Pintu'    },
  { name: 'Pintu Marmer',          file: 'pintu-marmer.jpg',      category: 'Pintu'    },
  { name: 'Pintu Outdoor',         file: 'pintu-outdoor.jpg',     category: 'Pintu'    },
  { name: 'Pintu Outdoor 2',       file: 'pintu-outdoor-2.jpg',   category: 'Pintu'    },
  { name: 'Pintu Kamar Mandi',     file: 'pintu-wc.jpg',          category: 'Pintu'    },
  { name: 'Pintu & Jendela',       file: 'pintu-jendela.jpg',     category: 'Pintu'    },
  { name: 'Set Pintu dan Jendela', file: 'pintu-dan-jendela.jpg', category: 'Pintu'    },
  { name: 'Jendela Besar',         file: 'jendela-besar.jpg',     category: 'Jendela'  },
  { name: 'Jendela Kotak',         file: 'jendela-ktoak.jpg',     category: 'Jendela'  },
  { name: 'Jendela Indoor',        file: 'jendela-indoor.jpg',    category: 'Jendela'  },
  { name: 'Jendela Multi Panel',   file: 'jendela-banyak.jpg',    category: 'Jendela'  },
  { name: 'Jendela Sliding',       file: 'Jendela-jadi-.jpg',     category: 'Jendela'  },
  { name: 'Rak Bawah Dapur',       file: 'rak-bawah-dapur.jpg',   category: 'Furnitur' },
];

// Susun data produk lengkap dengan path gambar
const allProducts = PRODUK.map((p, i) => ({
  id: i + 1,
  name: p.name,
  category: p.category,
  image: `images/products/${p.file}`,
}));

/* ===== NAVBAR: scroll effect & active link ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ===== MOBILE MENU ===== */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ===== PRODUK: render galeri ===== */
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

let filteredProducts = [];

function renderProducts(filter) {
  filteredProducts = filter === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === filter);

  productsGrid.innerHTML = '';

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p style="text-align:center;color:#94A3B8;padding:40px;grid-column:1/-1">Tidak ada produk di kategori ini.</p>';
    return;
  }

  filteredProducts.forEach((product, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${idx * 60}ms`;

    const waMsg = encodeURIComponent(
      `Halo KBA, saya tertarik dengan produk: ${product.name}. Mohon info harga dan ketersediaannya. Terima kasih!`
    );

    card.innerHTML = `
      <div class="product-card-img-wrap">
        <img
          class="product-card-img"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />
        <span class="product-category-badge">${product.category}</span>
      </div>
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p>Klik gambar untuk melihat detail produk</p>
      </div>
      <div class="product-card-footer">
        <a href="https://wa.me/${NOMOR_WA}?text=${waMsg}" target="_blank" class="product-order-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Tanya Harga
        </a>
        <span class="product-view-btn" data-index="${idx}">Lihat Detail →</span>
      </div>
    `;

    card.querySelector('.product-card-img-wrap').addEventListener('click', () => openLightbox(idx));
    card.querySelector('.product-view-btn').addEventListener('click', () => openLightbox(idx));
    productsGrid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentLightboxIndex = 0;

function openLightbox(idx) {
  currentLightboxIndex = idx;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const product = filteredProducts[currentLightboxIndex];
  lightboxImg.src = product.image;
  lightboxImg.alt = product.name;
  lightboxCaption.textContent = `${product.name} — ${product.category}`;
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lightboxPrev').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredProducts.length) % filteredProducts.length;
  updateLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredProducts.length;
  updateLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
});

/* ===== FORM KONTAK → KIRIM VIA WHATSAPP ===== */
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama   = contactForm.name.value.trim();
  const hp     = contactForm.phone.value.trim();
  const email  = contactForm.email.value.trim();
  const produk = contactForm.product.value;
  const pesan  = contactForm.message.value.trim();

  // Susun pesan WhatsApp yang rapi
  let teks = `*Pesan dari Website KBA*\n\n`;
  teks += `*Nama:* ${nama}\n`;
  teks += `*No. HP:* ${hp}\n`;
  if (email)  teks += `*Email:* ${email}\n`;
  if (produk) teks += `*Produk:* ${produk}\n`;
  teks += `\n*Pesan:*\n${pesan}`;

  // Buka WhatsApp di tab baru
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank');

  formAlert.className = 'form-alert success';
  formAlert.textContent = 'WhatsApp sedang dibuka. Silakan tekan tombol kirim di aplikasi WhatsApp Anda.';
  contactForm.reset();
});

/* ===== SMOOTH SCROLL untuk anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ===== TERAPKAN NOMOR WA KE SEMUA TOMBOL WHATSAPP DI HTML ===== */
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  if (!link.closest('.product-card')) {
    link.href = `https://wa.me/${NOMOR_WA}`;
  }
});

/* ===== INIT ===== */
renderProducts('all');
