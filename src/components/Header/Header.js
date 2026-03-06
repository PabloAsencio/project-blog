'use client'
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import { ro } from 'date-fns/locale';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookie.set('color-theme', nextTheme, {expires: 1000});
    const root = document.documentElement;
    const TOKENS = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(TOKENS).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    })
  }
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {
            theme === 'dark' ? <Moon size="1.5rem" /> : <Sun size="1.5rem"/>
          }
          <VisuallyHidden>
            {
            theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'
            } 
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
