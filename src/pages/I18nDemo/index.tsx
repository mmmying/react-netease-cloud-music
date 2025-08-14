import React from 'react';
import I18nExample from '../../components/I18nExample';
import styles from './style.module.css';

const I18nDemo: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>国际化功能演示</h1>
        <p className={styles.subtitle}>
          这个页面展示了React项目中国际化的各种功能和使用方法
        </p>
        
        <I18nExample />
      </div>
    </div>
  );
};

export default I18nDemo;
