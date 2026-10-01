type Props = {
  themeTitle: string
  slidesUrl?: string
  onMenuOpen: () => void
}

export default function Header({ themeTitle, slidesUrl, onMenuOpen }: Props) {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-surface px-4">
      <span className="text-sm font-medium text-text-primary">{themeTitle}</span>
      <div className="flex items-center">
        {slidesUrl && (
          <a
            href={slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir slides da aula"
            title="Slides da aula"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary"
          >
            <SlidesIcon />
          </a>
        )}
        <button
          onClick={onMenuOpen}
          aria-label="Abrir menu de aulas"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary"
        >
          <HamburgerIcon />
        </button>
      </div>
    </header>
  )
}

function SlidesIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
