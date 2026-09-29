import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mathata FR · Study timetable',
  description: 'A calm, practical study timetable for university life in Botswana.',
  generator: 'v0.app',
  applicationName: 'Mathata FR',
  manifest: './manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Mathata', statusBarStyle: 'black-translucent' },
  icons: { icon: './icon.svg', apple: './apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f10' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
