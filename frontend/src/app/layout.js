import { unbounded } from "@/fonts";
import "./globals.css";
import Header from "@/components/common/Header";
import { AuthProvider } from "@/context/AuthContext";
import { GalleryProvider } from "@/context/GalleryContext";

export const metadata = {
  title: "PhotoPulse",
  description: "An Image Stock Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.className} antialiased bg-gradient-to-br from-black via-[#08050c] to-[#2e024b] min-h-screen`}
      >
        <AuthProvider>
          <GalleryProvider>
            <Header />
            {children}
          </GalleryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
