import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientToaster from './components/ClientToaster';
import Sidebar from './components/Sidebar';
import Providers from "./providers";
import UserBox from "./components/UserBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "API Key Management",
  description: "Manage your API keys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Providers>
          <UserBox />
          <Sidebar />
          <main className="flex-1">
            <ClientToaster />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
