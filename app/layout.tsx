import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const imgSrc = 'https://raw.githubusercontent.com/al3sha9/cpp-1/main/bg.jpg'

export const metadata: Metadata = {
  title: "SubScoop! by typs.dev",
  description: "A platform to download youtube video subtitles!",

  keywords: ['youtube', 'captions', 'transcribe for youtube', 'download subtitle file from youtube', 'sub free youtube', 'transcript for youtube videos', 'you tube', 'irs transcript', 'down subtitles youtube', 'youtube subtitles', 'transcripts', 'downloader', 'youtube transcripts', 'youtubechanneltranscripts', 'youtube', 'channel', 'transcripts', 'video', 'content', 'transcription', 'closed captions', 'video content', 'subtitles', 'accessibility'],
  robots: 'index, follow',
  openGraph: {
    images: [
      {
        url: imgSrc,
      },
    ],
    title: 'SubScoop! by typs.dev',
    description: 'A platform to download youtube video subtitles!',
    type: 'website',
    url: 'https://yt.typs.dev/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
