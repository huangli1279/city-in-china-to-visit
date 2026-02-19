import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// English
import enCommon from './locales/en/common.json'
import enQuestions from './locales/en/questions.json'
import enCities from './locales/en/cities.json'

// Chinese Simplified
import zhCNCommon from './locales/zh-CN/common.json'
import zhCNQuestions from './locales/zh-CN/questions.json'
import zhCNCities from './locales/zh-CN/cities.json'

// Japanese
import jaCommon from './locales/ja/common.json'
import jaQuestions from './locales/ja/questions.json'
import jaCities from './locales/ja/cities.json'

// Korean
import koCommon from './locales/ko/common.json'
import koQuestions from './locales/ko/questions.json'
import koCities from './locales/ko/cities.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: {
      en: {
        common: enCommon,
        questions: enQuestions,
        cities: enCities,
      },
      'zh-CN': {
        common: zhCNCommon,
        questions: zhCNQuestions,
        cities: zhCNCities,
      },
      ja: {
        common: jaCommon,
        questions: jaQuestions,
        cities: jaCities,
      },
      ko: {
        common: koCommon,
        questions: koQuestions,
        cities: koCities,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-CN', 'ja', 'ko'],
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  })

export default i18n
