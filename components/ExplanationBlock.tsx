const MAX_CHARS = 180

type Props = {
  text: string
}

export default function ExplanationBlock({ text }: Props) {
  const display =
    text.length > MAX_CHARS ? text.slice(0, MAX_CHARS).trimEnd() + '…' : text

  return (
    <div className="mt-4 w-full max-w-sm rounded border border-surface p-4">
      <p className="text-xs font-medium uppercase tracking-widest text-text-secondary">
        Explicação
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">{display}</p>
    </div>
  )
}
