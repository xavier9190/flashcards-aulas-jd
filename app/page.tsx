import { getThemes } from '@/lib/flashcards'
import StudyShell from './StudyShell'

export default async function Home() {
  const themes = await getThemes()
  return <StudyShell themes={themes} />
}
