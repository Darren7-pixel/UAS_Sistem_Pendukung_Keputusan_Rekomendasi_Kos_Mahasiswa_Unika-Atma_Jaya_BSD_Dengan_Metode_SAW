const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        /**
         * PENTING: process.env.MONGO_URI digunakan agar saat di-deploy, 
         * aplikasi bisa membaca database Cloud (MongoDB Atlas).
         * Jika dijalankan di laptop, dia otomatis pakai database lokal.
         */
        const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/database_kos';

        await mongoose.connect(dbURI);
        
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Keluar dari proses dengan kegagalan
        process.exit(1);
    }
};

module.exports = connectDB;