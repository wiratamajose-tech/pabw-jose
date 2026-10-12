import { daftarProyek } from './app.js';

const daftarProyekEl = document.querySelector("#daftar-proyek") || document.querySelector("#daftar");
const barisFilter = document.querySelector("#wadah-filter") || document.querySelector("#filter");
const pesanKosongEl = document.querySelector("#pesan-kosong");
const formKontakEl = document.querySelector("#form-kontak");

function tandaiTombolAktif(tombolAktif) {
    const tombolList = document.querySelectorAll("#wadah-filter button, #filter button");
    tombolList.forEach((tombol) => {
        tombol.classList.toggle("aktif", tombol === tombolAktif);
    });
}

function renderProyek(proyekList) {
    if (!daftarProyekEl) return;

    daftarProyekEl.textContent = "";

    if (!proyekList || proyekList.length === 0) {
        if (pesanKosongEl) pesanKosongEl.style.display = "block";
        return;
    } else {
        if (pesanKosongEl) pesanKosongEl.style.display = "none";
    }

    proyekList.forEach(proyek => {
        const kartu = document.createElement("li");
        kartu.classList.add("kartu");

        const judul = document.createElement("h3");
        judul.textContent = proyek.judul;

        const tahun = document.createElement("p");
        tahun.textContent = `Tahun: ${proyek.tahun}`;

        const status = document.createElement("span");
        status.textContent = proyek.selesai ? "Selesai" : "Dalam Proses";

        kartu.append(judul, tahun, status);
        daftarProyekEl.append(kartu);
    });
}

if (barisFilter) {
    barisFilter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");
        if (!tombol) return;

        const statusPilihan = tombol.dataset.kategori;
        
        const terpilih = daftarProyek.filter((proyek) => {
            if (statusPilihan === "semua") return true;
            if (statusPilihan === "selesai") return proyek.selesai === true;
            if (statusPilihan === "proses") return proyek.selesai === false;
            return true;
        });

        tandaiTombolAktif(tombol);
        renderProyek(terpilih);
    });
}

if (formKontakEl) {
    formKontakEl.addEventListener("submit", (event) => {
        event.preventDefault();

        let adaGalat = false;
        const inputs = formKontakEl.querySelectorAll("input, textarea");

        inputs.forEach(input => {
            const pesanGalatEl = input.nextElementSibling; 

            if (input.value.trim() === "") {
                adaGalat = true;
                if (pesanGalatEl && pesanGalatEl.classList.contains("pesan-galat")) {
                    pesanGalatEl.textContent = `${input.name || "Kolom ini"} tidak boleh kosong!`;
                    pesanGalatEl.style.display = "block";
                }
            } else {
                if (pesanGalatEl && pesanGalatEl.classList.contains("pesan-galat")) {
                    pesanGalatEl.textContent = "";
                    pesanGalatEl.style.display = "none";
                }
            }
        });

        if (!adaGalat) {
            alert("Form berhasil dikirim!");
            formKontakEl.reset();
        }
    });
}

renderProyek(daftarProyek);