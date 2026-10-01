'use client'

import { useState, useCallback } from 'react'
import type { Theme, Lesson } from '@/types'
import Header from '@/components/Header'
import ProgressCounter from '@/components/ProgressCounter'
import FlashCard from '@/components/FlashCard'
import ExplanationBlock from '@/components/ExplanationBlock'
import SideMenu from '@/components/SideMenu'

type Props = {
  themes: Theme[]
}

export default function StudyShell({ themes }: Props) {
  const [activeThemeId, setActiveThemeId] = useState(themes[0]?.id ?? '')
  const [activeLessonId, setActiveLessonId] = useState(
    themes[0]?.lessons[0]?.id ?? '',
  )
  const [cardIndex, setCardIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const activeTheme = themes.find((t) => t.id === activeThemeId) ?? themes[0]
  const activeLesson =
    activeTheme?.lessons.find((l) => l.id === activeLessonId) ??
    activeTheme?.lessons[0]

  const flashcards = activeLesson?.flashcards ?? []
  const currentCard = flashcards[cardIndex]

  const selectLesson = useCallback((themeId: string, lesson: Lesson) => {
    setActiveThemeId(themeId)
    setActiveLessonId(lesson.id)
    setCardIndex(0)
    setMenuOpen(false)
  }, [])

  const goNext = useCallback(() => {
    setCardIndex((i) => Math.min(i + 1, flashcards.length - 1))
  }, [flashcards.length])

  const goPrev = useCallback(() => {
    setCardIndex((i) => Math.max(i - 1, 0))
  }, [])

  if (!currentCard) return null

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background text-text-primary">
      <Header
        title={activeLesson?.title ?? ''}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <main className="flex flex-1 flex-col items-center px-4 pb-4 pt-2">
        {/* Slider — top, above card */}
        <ProgressCounter
          current={cardIndex + 1}
          total={flashcards.length}
          onSeek={setCardIndex}
        />

        <FlashCard
          key={currentCard.id}
          question={currentCard.question}
          answer={currentCard.answer}
        />

        {/* Chevron nav — below card */}
        <nav
          className="mt-3 flex w-full max-w-sm items-center justify-center gap-6"
          aria-label="Navegação entre cards"
        >
          <button
            onClick={goPrev}
            disabled={cardIndex === 0}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary transition-opacity disabled:opacity-30"
            aria-label="Card anterior"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm tabular-nums text-text-secondary">
            {cardIndex + 1} de {flashcards.length}
          </span>
          <button
            onClick={goNext}
            disabled={cardIndex === flashcards.length - 1}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary transition-opacity disabled:opacity-30"
            aria-label="Próximo card"
          >
            <ChevronRight />
          </button>
        </nav>

        <ExplanationBlock text={currentCard.explanation} />
      </main>

      <SideMenu
        themes={themes}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectLesson={selectLesson}
        activeLessonId={activeLessonId}
      />
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <polyline
        points="13 4 7 10 13 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <polyline
        points="7 4 13 10 7 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
