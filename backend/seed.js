const mongoose = require('mongoose');
const Kos = require('./models/Kos'); // Mengambil model Kos

// Koneksi ke Database
mongoose.connect('mongodb://localhost:27017/database_kos')
    .then(() => console.log("Terhubung ke MongoDB untuk Seeding..."))
    .catch(err => console.error("Koneksi Gagal:", err));

const dataAwal = [
    { 
        nama: "The Icon Simplicity", 
        harga: 1300000, 
        jarak: 0.9, 
        alamat: "Cluster Simplicity, The Icon BSD City", 
        wifi: true, ac: false, kamar_mandi_dalam: false, laundry: false, water_heater: false, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" 
    },
    { 
        nama: "Beeliv Ohayo", 
        harga: 3200000, 
        jarak: 4.6, 
        alamat: "Regentown BSD Blok A2/10, Pagedangan", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: true, water_heater: true, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400" 
    },
    { 
        nama: "Kost Studento L18", 
        harga: 1500000, 
        jarak: 4.2, 
        alamat: "Cluster Studento Blok L18, Foresta BSD", 
        wifi: true, ac: false, kamar_mandi_dalam: true, laundry: true, water_heater: false, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400" 
    },
    { 
        nama: "Rukita Emerald", 
        harga: 1718000, 
        jarak: 9.1, 
        alamat: "Vanya Park, Cluster Emerald, BSD City", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: true, water_heater: true, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d9568d?w=400" 
    },
    { 
        nama: "Kos Bapak Arsad", 
        harga: 500000, 
        jarak: 4.7, 
        alamat: "Belakang Intermoda, Cisauk", 
        wifi: false, ac: false, kamar_mandi_dalam: true, laundry: false, water_heater: false, dapur: false, meja_lemari: false, 
        cctv: false, security_24jam: false, 
        foto: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400" 
    },
    { 
        nama: "Rukita Marigold", 
        harga: 2518000, 
        jarak: 4.1, 
        alamat: "Navapark, Tower Marigold BSD", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: true, water_heater: true, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=400" 
    },
    { 
        nama: "Rukita Botanica", 
        harga: 2468000, 
        jarak: 4.0, 
        alamat: "Cluster Botanica, The Park BSD", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: true, water_heater: true, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" 
    },
    { 
        nama: "Las Maison Tipe A", 
        harga: 1225000, 
        jarak: 3.1, 
        alamat: "Jl. Mediterania, Gading Serpong", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: false, water_heater: true, dapur: false, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400" 
    },
    { 
        nama: "Green Residence Deluxe", 
        harga: 1700000, 
        jarak: 3.5, 
        alamat: "Cisauk Girang, Tangerang", 
        wifi: true, ac: true, kamar_mandi_dalam: true, laundry: true, water_heater: false, dapur: true, meja_lemari: true, 
        cctv: true, security_24jam: true, 
        foto: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400" 
    },
    { 
        nama: "Apik Cilenggang", 
        harga: 825000, 
        jarak: 2.4, 
        alamat: "Jl. Cilenggang Raya, Serpong", 
        wifi: true, ac: false, kamar_mandi_dalam: true, laundry: true, water_heater: false, dapur: false, meja_lemari: true, 
        cctv: true, security_24jam: false, 
        foto: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400" 
    }
];

async function jalankanSeed() {
    try {
        await Kos.deleteMany({}); // Bersihkan data lama
        await Kos.insertMany(dataAwal); // Masukkan 10 data baru
        console.log("✅ 10 Data Kos Berhasil Dimasukkan!");
        process.exit();
    } catch (err) {
        console.error("❌ Gagal Seeding:", err);
        process.exit(1);
    }
}

jalankanSeed();