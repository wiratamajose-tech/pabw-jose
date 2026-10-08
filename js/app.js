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

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);