const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: ambil semua produk dari folder images/products
app.get('/api/products', (req, res) => {
  const productsDir = path.join(__dirname, 'public/images/products');
  const files = fs.readdirSync(productsDir);

  const products = files
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((file, index) => {
      const name = file
        .replace(/\.[^/.]+$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();

      let category = 'Lainnya';
      const lower = file.toLowerCase();
      if (lower.includes('pintu')) category = 'Pintu';
      else if (lower.includes('jendela')) category = 'Jendela';
      else if (lower.includes('rak')) category = 'Furnitur';

      return {
        id: index + 1,
        name,
        file,
        image: `/images/products/${file}`,
        category,
      };
    });

  res.json({ success: true, data: products });
});

// API: kontak / pesan masuk
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message, product } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Nama, nomor HP, dan pesan wajib diisi.' });
  }

  // Simpan pesan ke file JSON sederhana (bisa diganti DB nanti)
  const logPath = path.join(__dirname, 'data', 'messages.json');
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
  }

  let messages = [];
  if (fs.existsSync(logPath)) {
    messages = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  }

  messages.push({
    id: Date.now(),
    name,
    phone,
    email: email || '-',
    message,
    product: product || '-',
    createdAt: new Date().toISOString(),
  });

  fs.writeFileSync(logPath, JSON.stringify(messages, null, 2));

  res.json({ success: true, message: 'Pesan Anda telah kami terima. Kami akan segera menghubungi Anda!' });
});

// API: ambil semua pesan (admin)
app.get('/api/messages', (req, res) => {
  const logPath = path.join(__dirname, 'data', 'messages.json');
  if (!fs.existsSync(logPath)) return res.json({ success: true, data: [] });
  const messages = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  res.json({ success: true, data: messages.reverse() });
});

// Semua route lain serve index.html (SPA-like)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✅ Server Karya Bersama Aluminium berjalan di http://localhost:${PORT}\n`);
});
