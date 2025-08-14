import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  const isLanguage = useCallback((lng: string) => {
    return i18n.language === lng;
  }, [i18n]);

  const getSupportedLanguages = useCallback(() => {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' }
    ];
  }, []);

  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) => {
    const currentLang = i18n.language;
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  }, [i18n.language]);

  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    const currentLang = i18n.language;
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    
    return new Intl.NumberFormat(locale, options).format(number);
  }, [i18n.language]);

  const formatCurrency = useCallback((amount: number, currency: string = 'USD') => {
    const currentLang = i18n.language;
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }, [i18n.language]);

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isLanguage,
    getSupportedLanguages,
    formatDate,
    formatNumber,
    formatCurrency,
  };
};
