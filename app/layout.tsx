import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flashcards | Estágio',
  description: 'Estude com flashcards organizados por tema e aula.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {children}
      </body>
    </html>
  )
}
