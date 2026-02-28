'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

interface TrackedQuizLinkProps {
  href: string
  lang: string
  section: string
  className: string
  children: React.ReactNode
}

export default function TrackedQuizLink({
  href,
  lang,
  section,
  className,
  children,
}: TrackedQuizLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent('click_start_quiz', { lang, section })}
      className={className}
    >
      {children}
    </Link>
  )
}
