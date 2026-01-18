// Mengambil elemen slider dan tampilan nilainya
const rHarga = document.getElementById('maxHarga');
const rJarak = document.getElementById('maxJarak');
const vHarga = document.getElementById('valHarga');
const vJarak = document.getElementById('valJarak');

// Update teks nilai saat slider digeser secara real-time
rHarga.oninput = function() { 
    vHarga.innerHTML = "Rp " + parseInt(this.value).toLocaleString('id-ID'); 
};

rJarak.oninput = function() { 
    vJarak.innerHTML = this.value + " km"; 
};

// Logika saat tombol "CARI KOS" diklik
document.getElementById('formSPK').addEventListener('submit', async (e) => {
    e.preventDefault();
    const container = document.getElementById('hasilRekomendasi');
    
    // 1. Tampilkan indikator loading saat proses hitung SAW di backend
    container.innerHTML = `
        <div class="col-12 text-center my-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2 fw-bold">Sedang Menghitung Rekomendasi (Metode SAW)...</p>
        </div>`;
    
    // 2. Siapkan data filter dari input user
    const payload = {
        maxHarga: rHarga.value,
        maxJarak: rJarak.value,
        wifi: document.getElementById('wifi').checked,
        ac: document.getElementById('ac').checked,
        kmd: document.getElementById('kmd').checked
    };

    try {
        // 3. Mengirim permintaan ke endpoint API Backend
        const res = await fetch('/api/rekomendasi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Gagal mengambil data dari server");

        const data = await res.json();
        container.innerHTML = ''; // Hapus spinner loading

        // 4. Jika tidak ada data yang memenuhi kriteria filter
        if (data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning shadow-sm">
                        <i class="fas fa-info-circle me-2"></i>
                        Tidak ada kos yang memenuhi kriteria. Coba naikkan batas harga atau jarak.
                    </div>
                </div>`;
            return;
        }

        // 5. Render data hasil perangkingan SAW ke dalam Card
        data.forEach((kos, i) => {
            container.innerHTML += `
                <div class="col-md-6 mb-4">
                    <div class="card kos-card h-100 shadow-sm border-0 position-relative overflow-hidden">
                        <span class="ranking-badge bg-warning text-dark fw-bold p-2 position-absolute" 
                              style="z-index: 10; border-bottom-right-radius: 10px; font-size: 0.9rem;">
                              <i class="fas fa-trophy me-1"></i> Peringkat #${i + 1}
                        </span>
                        
                        <img src="${kos.foto || 'https://via.placeholder.com/400x220'}" 
                             class="card-img-top" style="height:220px; object-fit:cover;" 
                             alt="${kos.nama}">
                        
                        <div class="card-body p-4">
                            <h4 class="fw-bold mb-1">${kos.nama}</h4>
                            <p class="text-muted small mb-3">
                                <i class="fas fa-map-marker-alt me-1 text-danger"></i> ${kos.alamat}
                            </p>
                            
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="text-primary fw-bold mb-0">Rp ${kos.harga.toLocaleString('id-ID')}</h5>
                                <span class="badge bg-light text-dark border">
                                    <i class="fas fa-walking me-1"></i> ${kos.jarak} km
                                </span>
                            </div>

                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span class="badge bg-success text-white py-2 px-3 shadow-sm">
                                    <i class="fas fa-star me-1"></i> Skor Akhir: ${Number(kos.skor).toFixed(4)}
                                </span>
                            </div>

                            <p class="small text-secondary fst-italic mb-4" style="border-left: 3px solid #0d6efd; padding-left: 10px;">
                                "${kos.alasan}"
                            </p>
                            
                            <button class="btn btn-primary w-100 fw-bold py-2 shadow-sm rounded-pill">
                                <i class="fab fa-whatsapp me-2"></i> HUBUNGI PEMILIK
                            </button>
                        </div>
                    </div>
                </div>`;
        });

    } catch (err) {
        console.error("Error Frontend:", err);
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger shadow-sm">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Gagal terhubung ke server. Pastikan terminal sudah menjalankan "node server.js" di folder backend.
                </div>
            </div>`;
    }
});