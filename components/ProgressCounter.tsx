type Props = {
  current: number
  total: number
  onSeek: (cardIndex: number) => void
}

export default function ProgressCounter({ current, total, onSeek }: Props) {
  // Percentage for the filled-track background (computed inline — most
  // reliable cross-browser approach for range inputs)
  const pct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 0

  return (
    <div className="mt-2 flex w-full max-w-sm items-center gap-3">
      <input
        type="range"
        min={1}
        max={total}
        value={current}
        onChange={(e) => onSeek(Number(e.target.value) - 1)}
        className="progress-slider flex-1"
        aria-label={`Card ${current} de ${total}`}
        style={{
          background: `linear-gradient(to right, var(--color-text-primary) ${pct}%, var(--color-surface) ${pct}%)`,
        }}
      />
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-text-secondary">
        {current} / {total}
      </span>
    </div>
  )
}
