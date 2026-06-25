import React from "react";
import Button from '../Button';
import styles from './Pagination.module.css';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
    return (
        <div className={styles.root}>
            <Button variant="outline" size="sm" onClick={onPrev} disabled={page <= 1}>
                ← Prev
            </Button>
            <span className={styles.info}>
        {page} / {totalPages}
      </span>
            <Button variant="outline" size="sm" onClick={onNext} disabled={page >= totalPages}>
                Next →
            </Button>
        </div>
    );
}