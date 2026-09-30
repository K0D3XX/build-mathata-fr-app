import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mathata · Desktop study planner',
  description: 'Download Mathata, a playful desktop planner for turning study goals into small, doable wins.',
  generator: 'v0.app',
  applicationName: 'Mathata FR',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Mathata', statusBarStyle: 'black-translucent' },
  icons: { icon: '/icon.svg', apple: '/icons/icon-192.png' },
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
