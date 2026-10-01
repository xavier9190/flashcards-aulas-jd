import { notFound } from 'next/navigation'
import { getThemes } from '@/lib/flashcards'
import StudyShell from '@/app/StudyShell'

export async function generateStaticParams() {
  const themes = await getThemes()
  return themes.flatMap((theme) =>
    theme.lessons.map((lesson) => ({ lessonId: lesson.id })),
  )
}

export default async function AulaPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const themes = await getThemes()
  const theme = themes.find((t) => t.lessons.some((l) => l.id === lessonId))
  if (!theme) notFound()

  return (
    <StudyShell
      key={lessonId}
      themes={themes}
      themeId={theme.id}
      lessonId={lessonId}
    />
  )
}
