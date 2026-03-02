export interface AuthorProfile {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  profileUrl: string
}

export const AUTHORS: Record<string, AuthorProfile> = {
  'editorial-team': {
    id: 'editorial-team',
    name: 'City Vibe Matcher Editorial Team',
    role: 'Writers and destination framework editors',
    bio: 'Builds and updates first-trip China planning guides with a decision-first editorial standard.',
    expertise: ['Trip planning frameworks', 'City comparison', 'First-time traveler onboarding'],
    profileUrl: '/en/editorial-policy/',
  },
  'research-desk': {
    id: 'research-desk',
    name: 'City Vibe Matcher Research Desk',
    role: 'Review and source validation',
    bio: 'Validates source quality, consistency, and update integrity for policy-sensitive travel guidance.',
    expertise: ['Source validation', 'Policy monitoring', 'Content QA'],
    profileUrl: '/en/editorial-policy/',
  },
}
