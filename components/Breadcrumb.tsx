import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol
        className="inline-flex items-center gap-0.5 rounded-full border px-3.5 py-2"
        style={{
          borderColor: 'rgba(138, 100, 71, 0.18)',
          background: 'linear-gradient(120deg, rgba(255,252,246,0.82), rgba(250,244,232,0.76))',
          boxShadow: '0 2px 12px -6px rgba(74, 42, 29, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {items.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-0.5">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-1 flex items-center"
                  style={{ color: 'rgba(184, 140, 53, 0.55)' }}
                >
                  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
                    <path
                      d="M1 1L5.5 5.5L1 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              {isLast ? (
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: 'var(--cinnabar-600)' }}
                  aria-current="page"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: 'var(--cinnabar-600)', opacity: 0.7 }}
                  />
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href ?? '/'}
                  className="group flex items-center gap-1.5 rounded-full px-1 py-0.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(180,60,47,0.5)] focus-visible:ring-offset-1"
                  style={{ color: 'var(--ink-600)' }}
                >
                  {isFirst && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="flex-shrink-0 transition-colors duration-150"
                      style={{ color: 'inherit' }}
                    >
                      <path
                        d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1H15v-6H9v6H4a1 1 0 01-1-1V9.5z"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <span
                    className="transition-colors duration-150 group-hover:text-[color:var(--cinnabar-600)]"
                    style={{ color: 'inherit' }}
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
