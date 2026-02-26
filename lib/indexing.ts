export const INDEXABLE_CONTENT_LANGS = ['en'] as const

export type IndexableContentLang = (typeof INDEXABLE_CONTENT_LANGS)[number]

export const PRIMARY_INDEXABLE_CONTENT_LANG: IndexableContentLang = INDEXABLE_CONTENT_LANGS[0]

export function isIndexableContentLang(lang: string): lang is IndexableContentLang {
  return (INDEXABLE_CONTENT_LANGS as readonly string[]).includes(lang)
}
