export interface Booklet {
  no: string;
  name: string;
  kelas: string;
  linkCanva: string;
  url: Record<string, string>;
}

export interface BookletsResponse {
  success: boolean;
  data: Record<string, Booklet[]>;
  months: string[];
}
