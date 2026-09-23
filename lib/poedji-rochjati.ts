export function calculatePoedjiRochjati({
  usia,
  tinggiBadan,
  riwayatCaesar,
  tekananDarah,
}: {
  usia: number;
  tinggiBadan: number;
  riwayatCaesar: boolean;
  tekananDarah: string;
}) {
  let skor = 2;

  if (usia < 20) skor += 4;

  if (usia >= 35) skor += 4;

  if (tinggiBadan < 145) skor += 4;

  if (riwayatCaesar) skor += 8;

  const [sistolik, diastolik] =
    tekananDarah.split("/").map(Number);

  if (
    sistolik >= 140 ||
    diastolik >= 90
  ) {
    skor += 4;
  }

  let kategori = "KRR";

  if (skor >= 12) {
    kategori = "KRST";
  } else if (skor >= 6) {
    kategori = "KRT";
  }

  return {
    skor,
    kategori,
  };
}