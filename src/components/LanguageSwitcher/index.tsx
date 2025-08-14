import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className={styles.languageSwitcher}>
      <select
        className={styles.langSelect}
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
