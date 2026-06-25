import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
