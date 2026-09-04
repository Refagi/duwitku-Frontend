import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-background text-center">
      <p className="text-headline-lg text-on-surface">404</p>
      <p className="text-body-md text-on-surface-variant">Halaman tidak ditemukan</p>
      <Link to="/" className="btn-primary mt-2">Kembali ke Beranda</Link>
    </div>
  );
}