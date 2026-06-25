import React from "react";
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import TopBar from "../Header";

export default function Layout() {
  return (
    <div className={styles.root}>
        <TopBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
