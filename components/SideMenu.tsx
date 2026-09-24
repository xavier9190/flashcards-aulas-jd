'use client'

import { useRef, useCallback, useEffect } from 'react'
import type { Theme, Lesson } from '@/types'

type Props = {
  themes: Theme[]
  open: boolean
  onClose: () => void
  onSelectLesson: (themeId: string, lesson: Lesson) => void
  activeLessonId: string
}

export default function SideMenu({
  themes,
  open,
  onClose,
  onSelectLesson,
  activeLessonId,
}: Props) {
  const touchStartX = useRef<number | null>(null)

  // Swipe-right to close
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
      if (delta > 80) onClose()
      touchStartX.current = null
    },
    [onClose],
  )

  // Trap body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Dimmed backdrop — closes menu on tap */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer — slides in from the right */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de aulas"
        className={`fixed right-0 top-0 z-50 flex h-full w-[80%] max-w-sm flex-col bg-background transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b border-surface px-4">
          <span className="text-sm font-medium text-text-secondary">Aulas</span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Lesson list */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {themes.map((theme) => (
            <section key={theme.id} className="mb-6 mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-text-secondary">
                {theme.title}
              </p>
              <ul>
                {theme.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(theme.id, lesson)}
                        className={`flex min-h-[56px] w-full items-center rounded px-3 text-left text-sm transition-colors ${
                          isActive
                            ? 'border border-accent text-text-primary'
                            : 'text-text-secondary'
                        }`}
                      >
                        {lesson.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
