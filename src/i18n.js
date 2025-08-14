// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // 从后端加载翻译文件
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 初始化i18next与React
  .init({
    fallbackLng: 'en', // 当翻译缺失时的默认语言
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React已经处理转义
    },
    react: {
      useSuspense: false, // 避免SSR问题
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    supportedLngs: ['en', 'zh'],
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
