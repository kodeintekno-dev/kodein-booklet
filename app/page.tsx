import { getBookletsFromSheets } from "@/lib/booklets";
import BookletFilters from "@/components/BookletFilters";
import { Info, ExternalLink, AlertCircle, GraduationCap } from "lucide-react";
import { Booklet } from "@/types/booklet";

export const revalidate = 60;

export default async function BookletPage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string; bulan?: string }>;
}) {
  const query = await searchParams;
  const selectedClass = query.kelas || "All";
  const selectedMonth = query.bulan || "";

  const response = await getBookletsFromSheets({ kelas: selectedClass });
  
  if (!response.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center gap-6 bg-slate-50">
        <div className="p-4 bg-red-50 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-900">Gagal Memuat Data</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Sistem sedang mengalami kendala teknis. <br/>Mohon hubungi pihak sekolah atau coba kembali nanti.
          </p>
        </div>
      </div>
    );
  }

  const months = response.months || [];
  const activeMonth = selectedMonth || months[0] || "";

  const items = Object.values(response.data)
    .flat()
    .map((b: Booklet) => ({
      no: b.no,
      name: b.name,
      class: b.kelas,
      url: typeof b.url === "string" ? b.url : b.url[activeMonth] || "#",
    }))
    .filter((item) => item.url && item.url !== "#");

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans px-4 pt-10 pb-32 max-w-md mx-auto shadow-sm">
      <header className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg shadow-slate-200 mb-2 overflow-hidden border-4 border-white">
          <img 
            src="/logo-kodein.jpg" 
            alt="Logo Kodein" 
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Booklet Portofolio</h1>
          <p className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.3em]">Laporan Progres Siswa</p>
        </div>
      </header>

      <BookletFilters months={months} activeMonth={activeMonth} />

      <div className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Silakan Cari Nama Anak</h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] bg-white rounded-3xl border border-slate-200 p-8 gap-4 animate-in fade-in zoom-in-95">
            <Info className="w-10 h-10 text-slate-200" />
            <div className="text-center space-y-1">
              <span className="block text-sm font-bold text-slate-700">Data Tidak Ditemukan</span>
              <span className="text-xs text-slate-400">Silakan pilih kelas atau bulan yang berbeda</span>
            </div>
          </div>
        ) : (
          <div className="grid gap-3.5 animate-in slide-in-from-bottom-4 duration-500">
            {items.map((item) => (
              <a
                key={item.no}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 bg-white rounded-[1.5rem] border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 hover:border-primary/30 transition-all duration-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black text-primary uppercase tracking-widest opacity-70">
                      Kelas {item.class}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {item.name}
                    </h3>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full" />
                     <span className="text-[11px] font-bold text-slate-400 uppercase">Laporan Siap Dilihat</span>
                   </div>
                   <span className="text-[11px] font-black text-primary uppercase group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Buka Booklet
                   </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-slate-100 text-center z-20">
        <div className="max-w-md mx-auto">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
            © {new Date().getFullYear()} KODEIN - Laporan Portofolio
          </p>
          <p className="text-[9px] text-slate-300 italic">
            Akses Terakhir: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  );
}
