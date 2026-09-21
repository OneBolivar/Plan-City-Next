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
    <html lang="es" className="h-full dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-[#0d0d12] text-slate-100 antialiased selection:bg-purple-500 selection:text-white`}
      >
        {/* Barra de navegación fija */}
        <Navbar />

        {/* Contenido dinámico de cada página */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Footer global adaptado al tema oscuro */}
        <footer className="border-t border-purple-500/10 bg-[#161622]/40 backdrop-blur-md py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlanCity. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}