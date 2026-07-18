/* ==========================================================
   SERVER PREVIEW LOKAL
   ----------------------------------------------------------
   File ini HANYA untuk melihat website di komputer sendiri.
   Website versi online (GitHub Pages) TIDAK memakai file ini —
   di sana semuanya statis (HTML/CSS/JS saja).

   Cara pakai:  npm start   →  buka http://localhost:3000
   ========================================================== */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sajikan semua file statis dari folder utama
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`\n✅ Preview website KBA berjalan di http://localhost:${PORT}\n`);
});
