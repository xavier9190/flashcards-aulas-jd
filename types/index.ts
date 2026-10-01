export type Flashcard = {
  id: string
  question: string
  answer: string
  explanation: string
}

export type Lesson = {
  id: string
  title: string
  slidesUrl?: string
  flashcards: Flashcard[]
}

export type Theme = {
  id: string
  title: string
  lessons: Lesson[]
}
