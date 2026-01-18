const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// 1. Hubungkan ke Database
connectDB();

// 2. Middleware JSON
app.use(express.json());

// 3. Folder frontend sebagai statis
// Pastikan path ini benar agar index.html terbaca di server hosting
app.use(express.static(path.join(__dirname, '../frontend')));

// 4. Routes API
app.use('/api', require('./Routes/kosRoutes'));

/**
 * 5. Route Fallback (PENTING untuk Deployment)
 * Agar jika user me-refresh halaman di URL selain '/', 
 * hosting tetap mengarahkan ke index.html
 */
app.get('/:splat*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/**
 * 6. Jalankan Server
 * process.env.PORT digunakan agar hosting bisa menentukan port sendiri.
 * Jika tidak ada (seperti saat jalan di laptop), maka pakai port 3000.
 */
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`🚀 Server berhasil jalan di port ${PORT}`);
    console.log(`🔗 Akses: http://localhost:${PORT}`);
});