import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlanCity - Descubre Eventos Locales",
  description: "Plataforma web para explorar y gestionar eventos de tu ciudad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        {/* 1. Barra de navegación fija */}
        <Navbar />

        {/* 2. Contenido dinámico de cada página */}
        <div className="flex-1">
          {children}
        </div>

        {/* 3. Footer global */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlanCity. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}