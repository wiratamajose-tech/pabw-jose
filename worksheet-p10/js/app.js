import { ambilProyek } from './api.js';
import { render, aturMemuat, pasangFilter, tampilkanGalat } from './dom.js';

const profil = {
  nama: "Joselyn Putra Wiratama",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"]
};

console.table(profil.keahlian);

async function muat() {
  try {
    aturMemuat(true);
    const daftar = await ambilProyek();
    console.table(daftar);
    pasangFilter(daftar);
    render(daftar);
  } catch (err) {
    tampilkanGalat(err.message);
  } finally {
    aturMemuat(false);
  }
}

muat();