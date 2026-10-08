const namaLengkap = "Joselyn Putra Wiratama";
const peran = "Mahasiswa Informatika yang belajar front-end";
const keahlian = ["HTML", "CSS", "JavaScript"];
const jumlahProyek = 3;

const profil = {
  nama: namaLengkap,
  peran: peran,
  keahlian: keahlian,
  jumlahProyek: jumlahProyek
};

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));