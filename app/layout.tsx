import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stroll Landing Page',
  description: 'Find your way, free your mind with Stroll',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>{children}</body>
    </html>
  )
}
