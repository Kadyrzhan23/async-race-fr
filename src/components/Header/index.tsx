import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const PAGE_TITLES: Record<string, string> = {
    '/garage': 'Garage',
    '/winners': 'Winners',
};

export default function TopBar() {
    const { pathname } = useLocation();
    const title = PAGE_TITLES[pathname] ?? 'Async Race';

    return (
        <header className={styles.header}>
            <span className={styles.logo}>🏎 Async Race</span>
            <span className={styles.pageTitle}>{title}</span>
            <nav className={styles.nav}>
                <NavLink
                    to="/garage"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Garage
                </NavLink>
                <NavLink
                    to="/winners"
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Winners
                </NavLink>
            </nav>
        </header>
    );
}