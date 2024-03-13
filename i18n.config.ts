export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    names: ['Indonesia', 'English'],
    flags: ['fi fi-gb', 'fi fi-id'],
    rtl: [false, false],
} as const

export type Locale = (typeof i18n)['locales'][number]