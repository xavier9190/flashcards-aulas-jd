import fs from 'fs/promises'
import path from 'path'
import type { Theme } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

export async function getThemes(): Promise<Theme[]> {
  const files = (await fs.readdir(DATA_DIR))
    .filter((f) => f.endsWith('.json'))
    .sort() // ordem estável: logica-01, 02, 03, 04

  const parsed = await Promise.all(
    files.map(
      async (file) =>
        JSON.parse(
          await fs.readFile(path.join(DATA_DIR, file), 'utf-8'),
        ) as Theme,
    ),
  )

  // Arquivos com o mesmo theme.id viram um único tema (aulas na ordem dos arquivos)
  const byId = new Map<string, Theme>()
  for (const theme of parsed) {
    const existing = byId.get(theme.id)
    if (existing) existing.lessons.push(...theme.lessons)
    else byId.set(theme.id, { ...theme, lessons: [...theme.lessons] })
  }

  const themes = [...byId.values()]
  assertUniqueIds(themes)
  return themes
}

function assertUniqueIds(themes: Theme[]) {
  const seen = new Set<string>()
  const check = (id: string, where: string) => {
    if (seen.has(id)) throw new Error(`ID duplicado "${id}" em ${where}`)
    seen.add(id)
  }
  for (const t of themes)
    for (const l of t.lessons) {
      check(l.id, `aula "${l.title}"`)
      for (const c of l.flashcards) check(c.id, `card em "${l.title}"`)
    }
}
