const wadah = document.querySelector("#daftar-proyek") || document.querySelector("#daftar");
const barisFilter = document.querySelector("#wadah-filter") || document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong") || document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const form = document.querySelector("#form-kontak") || document.querySelector("#formKomentar");

let dataProyekLokal = [];

function buatKartu(proyek) {
    const li = document.createElement("li");
    li.className = "kartu";

    const judul = document.createElement("h3");
    judul.textContent = proyek.judul;

    const tahun = document.createElement("p");
    tahun.textContent = `Tahun: ${proyek.tahun}`;

    const status = document.createElement("span");
    status.textContent = proyek.kategori || (proyek.selesai ? "Selesai" : "Dalam Proses");

    li.append(judul, tahun, status);
    return li;
}

export function aturMemuat(sedangMemuat) {
    if (muatEl) {
        muatEl.hidden = !sedangMemuat;
    }
}

export function tampilkanGalat(pesan) {
    console.error(pesan);
}

export function render(daftar) {
    if (!wadah) return;

    wadah.textContent = "";

    if (!daftar || daftar.length === 0) {
        if (kosong) kosong.hidden = false;
        return;
    }

    if (kosong) kosong.hidden = true;

    daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
}

export function pasangFilter(daftar) {
    dataProyekLokal = daftar;

    if (barisFilter) {
        barisFilter.addEventListener("click", (event) => {
            const tombol = event.target.closest("button");
            if (!tombol) return;

            const statusPilihan = tombol.dataset.kategori;

            const terpilih = dataProyekLokal.filter((proyek) => {
                if (statusPilihan === "semua" || !statusPilihan) return true;
                if (statusPilihan === "selesai") return proyek.selesai === true;
                if (statusPilihan === "proses") return proyek.selesai === false;
                return true;
            });

            tandaiTombolAktif(tombol);
            render(terpilih);
        });
    }
}

function tandaiTombolAktif(tombolAktif) {
    const tombolList = document.querySelectorAll("#wadah-filter button, #filter button");
    tombolList.forEach((tombol) => {
        tombol.classList.toggle("aktif", tombol === tombolAktif);
    });
}

if (form) {
    const inputs = form.querySelectorAll("input, textarea");
    const tombolKirim = form.querySelector("button[type='submit']");

    function periksaForm() {
        let seluruhKolomLayak = true;

        inputs.forEach((input) => {
            const pesanGalat = input.nextElementSibling;
            const nilai = input.value.trim();

            if (nilai === "") {
                seluruhKolomLayak = false;
                input.setAttribute("aria-invalid", "true");
                if (pesanGalat && pesanGalat.classList.contains("pesan-galat")) {
                    pesanGalat.textContent = `${input.name || "Kolom ini"} tidak boleh kosong!`;
                    pesanGalat.style.display = "block";
                }
            } else {
                input.setAttribute("aria-invalid", "false");
                if (pesanGalat && pesanGalat.classList.contains("pesan-galat")) {
                    pesanGalat.textContent = "";
                    pesanGalat.style.display = "none";
                }
            }
        });

        if (tombolKirim) {
            tombolKirim.disabled = !seluruhKolomLayak;
        }

        return seluruhKolomLayak;
    }

    inputs.forEach((input) => {
        input.addEventListener("input", periksaForm);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const sah = periksaForm();

        if (!sah) {
            const kolomBermasalah = form.querySelector("[aria-invalid='true']");
            if (kolomBermasalah) {
                kolomBermasalah.focus();
            }
            return;
        }

        alert("Form berhasil dikirim!");
        form.reset();
        periksaForm();
    });
}