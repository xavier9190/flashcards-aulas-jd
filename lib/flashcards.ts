import fs from 'fs/promises'
import path from 'path'
import type { Theme } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

export async function getThemes(): Promise<Theme[]> {
  const files = await fs.readdir(DATA_DIR)
  const jsonFiles = files.filter((f) => f.endsWith('.json'))

  const themes = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(DATA_DIR, file), 'utf-8')
      return JSON.parse(raw) as Theme
    }),
  )

  return themes
}
