// backend/data.js
const hitungSAW = (data) => {
    if (data.length === 0) return [];

    // Bobot kriteria: Harga(0.4), Jarak(0.3), Fasilitas(0.2), Keamanan(0.1)
    const bobot = { harga: 0.4, jarak: 0.3, fasilitas: 0.2, keamanan: 0.1 };

    const minHarga = Math.min(...data.map(k => k.harga));
    const minJarak = Math.min(...data.map(k => k.jarak));

    return data.map(kos => {
        // Normalisasi Cost (Harga & Jarak)
        const nHarga = minHarga / kos.harga;
        const nJarak = minJarak / kos.jarak;

        // Normalisasi Benefit (Fasilitas)
        let fCount = 0;
        if (kos.wifi) fCount++;
        if (kos.ac) fCount++;
        if (kos.kamar_mandi_dalam) fCount++;
        const nFasilitas = fCount / 3;

        // Keamanan
        const nKeamanan = (kos.cctv && kos.security_24jam) ? 1 : 0.5;

        // Skor Akhir
        const skorFinal = (nHarga * bobot.harga) + (nJarak * bobot.jarak) + (nFasilitas * bobot.fasilitas) + (nKeamanan * bobot.keamanan);

        return {
            ...kos._doc,
            skor: skorFinal.toFixed(3),
            alasan: skorFinal > 0.75 ? "Sangat Direkomendasikan" : "Cukup Direkomendasikan"
        };
    }).sort((a, b) => b.skor - a.skor);
};

module.exports = { hitungSAW };