import Link from 'next/link'
import { contentHref, listingHref, type IndexablePageId } from '@/lib/indexing'

interface LegalFooterLabels {
  about: string
  contact: string
  guides?: string
  privacy: string
  terms?: string
}

interface LegalFooterNavProps {
  lang: string
  labels: LegalFooterLabels
  className?: string
  linkClassName?: string
}

const LEGAL_PAGES: Array<{ page: IndexablePageId; key: 'about' | 'contact' | 'privacy' | 'terms' }> = [
  { page: 'about', key: 'about' },
  { page: 'contact', key: 'contact' },
  { page: 'privacy-policy', key: 'privacy' },
  { page: 'terms', key: 'terms' },
]

export default function LegalFooterNav({ lang, labels, className, linkClassName }: LegalFooterNavProps) {
  const guidesHref = labels.guides ? listingHref(lang, 'guides') : null
  const items: Array<{ href: string; label: string }> = [
    { href: contentHref(lang, 'about'), label: labels.about },
    { href: contentHref(lang, 'contact'), label: labels.contact },
  ]
  if (guidesHref && labels.guides) {
    items.push({ href: guidesHref, label: labels.guides })
  }
  for (const item of LEGAL_PAGES.slice(2)) {
    const label = item.key === 'terms' ? labels.terms ?? 'Terms' : labels[item.key]
    items.push({ href: contentHref(lang, item.page), label })
  }

  return (
    <nav aria-label="Legal" className={className}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={linkClassName}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
