import { render } from './dom.js';

const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
    daftarProyek: [],
    kategoriAktif: "semua",
    favorit: []
};

export function simpan(state) {
    const isi = {
        versi: VERSI,
        kategoriAktif: state.kategoriAktif,
        favorit: state.favorit
    };
    localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
    try {
        return JSON.parse(localStorage.getItem(KUNCI));
    } catch {
        return null;
    }
}

export function pulihkan(isi) {
    if (!isi) return;
    if (isi.kategoriAktif) state.kategoriAktif = isi.kategoriAktif;
    if (isi.favorit) state.favorit = isi.favorit;
}

export function aturUlang() {
    localStorage.removeItem(KUNCI);
    state.kategoriAktif = 'semua';
    state.favorit = [];
    render(state);
}

export function isiProyek(daftar) {
    state.daftarProyek = daftar;
    render(state);
}

export function pilihKategori(kategori) {
    state.kategoriAktif = kategori;
    simpan(state);
    render(state);
}

export function tambahFavorit(id) {
    if (state.favorit.includes(id)) return;
    state.favorit = [...state.favorit, id];
    simpan(state);
    render(state);
}