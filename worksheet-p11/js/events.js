import { pilihKategori, tambahFavorit, aturUlang } from './state.js';

export function pasangPendengar() {
    const barisFilter = document.querySelector("#wadah-filter") || document.querySelector("#filter");
    if (barisFilter) {
        barisFilter.addEventListener("click", (event) => {
            const tombol = event.target.closest("button");
            if (!tombol) return;
            const kategori = tombol.dataset.kategori;
            pilihKategori(kategori);
        });
    }

    const wadah = document.querySelector("#daftar-proyek") || document.querySelector("#daftar");
    if (wadah) {
        wadah.addEventListener("click", (event) => {
            const tombol = event.target.closest(".favorit");
            if (!tombol) return;
            tambahFavorit(Number(tombol.dataset.id));
        });
    }

    const tombolAturUlang = document.querySelector("#atur-ulang");
    if (tombolAturUlang) {
        tombolAturUlang.addEventListener("click", () => {
            aturUlang();
        });
    }
}