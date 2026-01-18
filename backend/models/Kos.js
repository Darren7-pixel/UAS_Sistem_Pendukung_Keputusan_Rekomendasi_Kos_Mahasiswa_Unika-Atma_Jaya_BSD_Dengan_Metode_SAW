const mongoose = require('mongoose');

const KosSchema = new mongoose.Schema({
    nama: String,
    alamat: String,
    harga: Number,
    jarak: Number,
    wifi: Boolean,
    ac: Boolean,
    kamar_mandi_dalam: Boolean,
    foto: String,
    laundry: Boolean,
    cctv: Boolean,
    security_24jam: Boolean
});

module.exports = mongoose.model('Kos', KosSchema);