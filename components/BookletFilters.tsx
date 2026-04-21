"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter, CalendarDays } from "lucide-react";

interface BookletFiltersProps {
  months: string[];
  activeMonth: string;
}

export default function BookletFilters({ months, activeMonth }: BookletFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedClass = searchParams.get("kelas") || "All";
  const selectedMonth = searchParams.get("bulan") || activeMonth;

  const handleClassChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("kelas", value);
    params.delete("bulan");
    router.push(`?${params.toString()}`);
  };

  const handleMonthChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("bulan", value);
    router.push(`?${params.toString()}`);
  };

  const displayMonths = [...months].reverse();

  return (
    <div className="space-y-6">
      {/* Simplified Filters for Parents */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            <ListFilter className="w-3.5 h-3.5" /> Pilih Kelas
          </label>
          <Select value={selectedClass} onValueChange={handleClassChange}>
            <SelectTrigger className="w-full h-14 bg-white rounded-2xl border-slate-200 shadow-sm font-bold text-slate-700">
              <SelectValue placeholder="Semua Kelas" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
              <SelectItem value="All" className="font-bold">Semua Kelas</SelectItem>
              <SelectItem value="X" className="font-bold">Kelas X</SelectItem>
              <SelectItem value="XI" className="font-bold">Kelas XI</SelectItem>
              <SelectItem value="XII" className="font-bold">Kelas XII</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {months.length > 0 && (
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <CalendarDays className="w-3.5 h-3.5" /> Laporan Bulan
            </label>
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-full h-14 bg-white rounded-2xl border-slate-200 shadow-sm font-bold text-slate-700">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                {displayMonths.map((m) => (
                  <SelectItem key={m} value={m} className="font-bold">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
