const express = require('express');
const router = express.Router();
const Kos = require('../models/Kos'); 
const { hitungSAW } = require('../data'); // Mengambil logika dari data.js

router.post('/rekomendasi', async (req, res) => {
    try {
        const { maxHarga, maxJarak, wifi, ac, kmd } = req.body;

        // Query filter ke MongoDB
        let query = {
            harga: { $lte: parseInt(maxHarga) },
            jarak: { $lte: parseFloat(maxJarak) }
        };

        if (wifi) query.wifi = true;
        if (ac) query.ac = true;
        if (kmd) query.kamar_mandi_dalam = true;

        const filtered = await Kos.find(query);

        // Jalankan perhitungan SAW
        const hasil = hitungSAW(filtered);

        // Kirim 6 hasil terbaik ke UI
        res.json(hasil.slice(0, 6)); 

    } catch (err) {
        console.error("Error di kosRoutes:", err);
        res.status(500).json({ message: "Gagal menghitung rekomendasi" });
    }
});

module.exports = router;