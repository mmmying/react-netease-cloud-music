import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './style.module.css';

const I18nExample: React.FC = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const isChinese = currentLanguage === 'zh';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t('welcome')}</h1>
        <LanguageSwitcher />
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>{t('common.language')}</h2>
          <p>{t('hello', { name: 'World' })}</p>
          <p>{t('common.loading')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('navigation.discover')}</h2>
          <div className={styles.navItems}>
            <span>{t('navigation.home')}</span>
            <span>{t('navigation.music')}</span>
            <span>{t('navigation.playlist')}</span>
            <span>{t('navigation.artist')}</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t('music.playlist')}</h2>
          <div className={styles.musicControls}>
            <button className={styles.musicButton}>
              {t('music.play')}
            </button>
            <button className={styles.musicButton}>
              {t('music.pause')}
            </button>
            <button className={styles.musicButton}>
              {t('music.next')}
            </button>
            <button className={styles.musicButton}>
              {t('music.previous')}
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t('search.searchResults')}</h2>
          <input
            type="text"
            placeholder={t('search.searchPlaceholder')}
            className={styles.searchInput}
          />
          <p>{t('search.noResults')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('auth.loginTitle')}</h2>
          <div className={styles.authForm}>
            <input
              type="email"
              placeholder={t('auth.email')}
              className={styles.formInput}
            />
            <input
              type="password"
              placeholder={t('auth.password')}
              className={styles.formInput}
            />
            <button className={styles.submitButton}>
              {t('auth.loginButton')}
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t('playlist.createNew')}</h2>
          <div className={styles.playlistForm}>
            <input
              type="text"
              placeholder={t('playlist.playlistName')}
              className={styles.formInput}
            />
            <textarea
              placeholder={t('playlist.playlistDescription')}
              className={styles.formTextarea}
            />
            <div className={styles.playlistOptions}>
              <label>
                <input type="radio" name="visibility" value="public" />
                {t('playlist.public')}
              </label>
              <label>
                <input type="radio" name="visibility" value="private" />
                {t('playlist.private')}
              </label>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>复杂文本示例</h2>
          <Trans i18nKey="footer.copyright">
            © 2024 Music App. All rights reserved.
          </Trans>
          <p>
            <Trans i18nKey="common.hello" values={{ name: 'React' }}>
              Hello, React!
            </Trans>
          </p>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>{t('footer.copyright')}</p>
        <div className={styles.footerLinks}>
          <a href="#">{t('footer.terms')}</a>
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.contact')}</a>
          <a href="#">{t('footer.about')}</a>
        </div>
      </footer>
    </div>
  );
};

export default I18nExample;
