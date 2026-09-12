export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRupiahShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " M";
  }
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + " Jt";
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(1).replace(/\.0$/, "") + " Rb";
  }
  return amount.toString();
}

export function getProjectStatusBadge(status: string): { label: string; class: string } {
  switch (status) {
    case "lead":
      return { label: "Lead / Inkuiri", class: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" };
    case "negotiation":
      return { label: "Negosiasi", class: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300" };
    case "deal":
      return { label: "Deal Baru", class: "bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300" };
    case "development":
      return { label: "Pengembangan", class: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300" };
    case "review":
      return { label: "Review / UAT", class: "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300" };
    case "completed":
      return { label: "Selesai", class: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300" };
    case "cancelled":
      return { label: "Batal", class: "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300" };
    default:
      return { label: status, class: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" };
  }
}

export function getContentStatusBadge(status: string): { label: string; class: string } {
  switch (status) {
    case "idea":
      return { label: "Ide", class: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" };
    case "draft":
      return { label: "Draft", class: "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300" };
    case "review":
      return { label: "Review", class: "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300" };
    case "approved":
      return { label: "Disetujui", class: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300" };
    case "scheduled":
      return { label: "Dijadwalkan", class: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300" };
    case "published":
      return { label: "Tayang", class: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300" };
    default:
      return { label: status, class: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" };
  }
}
