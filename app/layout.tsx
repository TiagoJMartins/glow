import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import './globals.css'
import './react-grid-layout.scss'

import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Onedash - Your personal site builder',
  description: 'Your personal site builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-system-bg-primary">
        {children}
        <Toaster />
      </body>
      <Analytics />
    </html>
  )
}
