import Link from 'next/link'
import { getThemes } from '@/lib/flashcards'
import SlidesIcon from '@/components/SlidesIcon'

export default async function Home() {
  const themes = await getThemes()

  return (
    <div className="flex h-dvh flex-col bg-background text-text-primary">
      <header className="flex h-14 w-full shrink-0 items-center border-b border-surface px-4">
        <span className="text-sm font-medium text-text-primary">Flashcards</span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-6">
        {themes.map((theme) => (
          <section key={theme.id} className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
              {theme.title}
            </p>
            <ul className="flex flex-col gap-3">
              {theme.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center gap-3">
                  <Link
                    href={`/aula/${lesson.id}`}
                    className="flex min-h-[56px] flex-1 flex-col justify-center rounded border border-surface px-4 transition-colors active:border-white/50"
                  >
                    <span className="text-sm text-text-primary">
                      {lesson.title}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {lesson.flashcards.length === 1
                        ? '1 card'
                        : `${lesson.flashcards.length} cards`}
                    </span>
                  </Link>

                  {lesson.slidesUrl ? (
                    <a
                      href={lesson.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir slides: ${lesson.title}`}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-surface text-text-secondary"
                    >
                      <SlidesIcon />
                    </a>
                  ) : (
                    <div className="h-14 w-14 shrink-0" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
