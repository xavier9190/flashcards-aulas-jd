import Link from 'next/link'
import SlidesIcon from './SlidesIcon'

type Props = {
  themeTitle: string
  slidesUrl?: string
  backHref?: string
  onMenuOpen: () => void
}

export default function Header({
  themeTitle,
  slidesUrl,
  backHref,
  onMenuOpen,
}: Props) {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-surface px-4">
      <div className="flex items-center gap-2">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Voltar para a lista de aulas"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary"
          >
            <HomeIcon />
          </Link>
        )}
        {backHref && (
          <span className="h-4 w-px bg-white/25" aria-hidden="true" />
        )}
        <span className="text-sm font-medium text-text-primary">
          {themeTitle}
        </span>
      </div>

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

function HomeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9.5L10 3l7 6.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 18v-5h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
