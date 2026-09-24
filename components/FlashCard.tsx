'use client'

import { useState, useCallback } from 'react'

type Props = {
  question: string
  answer: string
}

export default function FlashCard({ question, answer }: Props) {
  const [flipped, setFlipped] = useState(false)

  const flip = useCallback(() => setFlipped((f) => !f), [])

  return (
    <div
      className="card-scene mt-3 w-full max-w-sm"
      style={{ height: '55dvh' }}
      onClick={flip}
      onTouchEnd={(e) => {
        e.preventDefault()
        flip()
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? 'Card com resposta. Toque para ver a pergunta.'
          : 'Card com pergunta. Toque para ver a resposta.'
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') flip()
      }}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        {/* Front — question */}
        <div className="card-face front">
          <p className="text-center text-base font-medium leading-relaxed text-text-primary">
            {question}
          </p>
          <span className="mt-6 text-xs text-text-secondary">
            toque para revelar
          </span>
        </div>

        {/* Back — answer */}
        <div className="card-face back">
          <span className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs text-text-primary">
            Resposta
          </span>
          <p className="text-center text-base font-medium leading-relaxed text-text-primary">
            {answer}
          </p>
          <span className="mt-6 text-xs text-text-secondary">
            toque para voltar
          </span>
        </div>
      </div>
    </div>
  )
}
