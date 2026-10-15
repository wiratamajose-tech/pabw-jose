const ALAMAT = 'data/proyek.json';

export async function ambilProyek() {
  const respons = await fetch(ALAMAT);
  if (!respons.ok) {
    throw new Error('status ' + respons.status);
  }
  return await respons.json();
}