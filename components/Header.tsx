type Props = {
  themeTitle: string
  onMenuOpen: () => void
}

export default function Header({ themeTitle, onMenuOpen }: Props) {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-surface px-4">
      <span className="text-sm font-medium text-text-primary">{themeTitle}</span>
      <button
        onClick={onMenuOpen}
        aria-label="Abrir menu de aulas"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary"
      >
        <HamburgerIcon />
      </button>
    </header>
  )
}

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect y="3" width="20" height="1.5" rx="1" fill="currentColor" />
      <rect y="9.25" width="20" height="1.5" rx="1" fill="currentColor" />
      <rect y="15.5" width="20" height="1.5" rx="1" fill="currentColor" />
    </svg>
  )
}
