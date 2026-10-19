export const profil = {
    nama: "Joselyn Putra Wiratama",
    peran: "Mahasiswa Informatika yang belajar front-end",
    keahlian: ["HTML", "CSS", "JavaScript"]
};

export function buatPerkenalan({ nama, peran }) {
    return `Halo, saya ${nama}, ${peran}.`;
}

export const formatKeahlian = (daftar) => daftar.join(" • ");

export function saring(daftar, kategori) {
    if (!daftar) return [];
    if (kategori === "semua" || !kategori) return daftar;
    if (kategori === "selesai") return daftar.filter((proyek) => proyek.selesai === true);
    if (kategori === "proses") return daftar.filter((proyek) => proyek.selesai === false);
    return daftar.filter((proyek) => proyek.kategori === kategori);
}