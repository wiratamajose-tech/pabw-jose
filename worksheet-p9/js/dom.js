import { dataProyek } from './app.js';

const daftarProyekEl = document.querySelector("#daftar-proyek");
const wadahFilterEl = document.querySelector("#wadah-filter");
const pesanKosongEl = document.querySelector("#pesan-kosong");
const formKontakEl = document.querySelector("#form-kontak");

function renderProyek(proyekList) {

    daftarProyekEl.innerHTML = "";

    if (!proyekList || proyekList.length === 0) {
        if (pesanKosongEl) pesanKosongEl.style.display = "block";
        return;
    } else {
        if (pesanKosongEl) pesanKosongEl.style.display = "none";
    }

    proyekList.map(proyek => {
        const kartu = document.createElement("div");
        kartu.classList.add("kartu-proyek");

        const judul = document.createElement("h3");
        judul.textContent = proyek.nama;

        const deskripsi = document.createElement("p");
        deskripsi.textContent = proyek.deskripsi;

        const kategori = document.createElement("span");
        kategori.textContent = `Kategori: ${proyek.kategori}`;

        kartu.append(judul, deskripsi, kategori);
        daftarProyekEl.append(kartu);
    });
}

if (wadahFilterEl) {
    wadahFilterEl.addEventListener("click", (event) => {
        const tombol = event.target.closest("button"); 
        if (!tombol) return;

        const kategoriPilihan = tombol.dataset.kategori;

        if (kategoriPilihan === "semua") {
            renderProyek(dataProyek);
        } else {
            const hasilFilter = dataProyek.filter(p => p.kategori === kategoriPilihan);
            renderProyek(hasilFilter);
        }
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

renderProyek(dataProyek);