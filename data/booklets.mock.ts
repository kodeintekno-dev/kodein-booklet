import { Booklet, BookletsResponse } from "@/types/booklet";

export const MOCK_BOOKLETS_DATA: Record<string, Booklet[]> = {
  "X": [
    {
      no: "1",
      name: "Budi Santoso",
      kelas: "X",
      linkCanva: "https://canva.com/design/example1",
      url: {
        "Agustus 2025": "https://example.com/budi-aug-25",
        "September 2025": "https://example.com/budi-sep-25",
        "Oktober 2025": "https://example.com/budi-okt-25",
      }
    },
    {
      no: "2",
      name: "Siti Aminah",
      kelas: "X",
      linkCanva: "https://canva.com/design/example2",
      url: {
        "Agustus 2025": "https://example.com/siti-aug-25",
        "September 2025": "https://example.com/siti-sep-25",
      }
    }
  ],
  "XI": [
    {
      no: "3",
      name: "Andi Wijaya",
      kelas: "XI",
      linkCanva: "https://canva.com/design/example3",
      url: {
        "Agustus 2025": "https://example.com/andi-aug-25",
        "September 2025": "https://example.com/andi-sep-25",
        "Oktober 2025": "https://example.com/andi-okt-25",
        "November 2025": "https://example.com/andi-nov-25",
      }
    }
  ],
  "XII": [
    {
      no: "4",
      name: "Eko Prasetyo",
      kelas: "XII",
      linkCanva: "https://canva.com/design/example4",
      url: {
        "Januari 2026": "https://example.com/eko-jan-26",
      }
    }
  ]
};

export const MOCK_MONTHS = [
  "Agustus 2025",
  "September 2025",
  "Oktober 2025",
  "November 2025",
  "Desember 2025",
  "Januari 2026"
];

export const getMockBookletsData = async ({
  kelas,
}: {
  kelas?: string;
} = {}): Promise<BookletsResponse> => {
  // Simulate small delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let data = MOCK_BOOKLETS_DATA;
  if (kelas && kelas !== "All") {
    data = { [kelas]: MOCK_BOOKLETS_DATA[kelas] || [] };
  }

  return {
    success: true,
    data,
    months: MOCK_MONTHS,
  };
};
