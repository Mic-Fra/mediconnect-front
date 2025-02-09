import { useState, useEffect } from 'react';
import styles from './TextEffect.module.css';

const TextRound = ({ text }) => {
  return (
    <div className={styles.textWrapper}>
      <div className="text-3xl sm:text-5xl">
        {text}
      </div>    
    </div>
  );
};

export default TextRound;
