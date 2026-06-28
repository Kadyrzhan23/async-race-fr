/* eslint-disable max-lines-per-function */

import {useRef, useState} from "react";
const DEFAULT_DURATION = 3000;
export function useCarAnimation(duration: number = DEFAULT_DURATION) {
    const [position, setPosition] = useState<number>(0)
    const [status, setStatus] = useState<'idle' | 'running' | 'stopped' | 'finished'>('idle')
    const rafRef = useRef<number | null>(null)
    const progressRef = useRef<number>(0)
    const startTsRef = useRef<number | null>(null)

    const start = (durationMs:number = duration) => {
        if (rafRef.current !== null) return
        if (progressRef.current >= 1) return
        setStatus('running')
        startTsRef.current = null
        const startProgress = progressRef.current
        const tick = (ts: number) => {
            if (startTsRef.current === null) {
                startTsRef.current = ts
            }
            const elapsed = ts - startTsRef.current
            const progress = Math.min(startProgress + elapsed / durationMs, 1)

            progressRef.current = progress
            setPosition(progress)

            if (progress >= 1) {
                rafRef.current = null
                setStatus('finished')
                return
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
    }

    const stop = () => {
        if (rafRef.current === null) return
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
        setStatus('stopped')
    }

    const reset = () => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        progressRef.current = 0
        startTsRef.current = null
        setPosition(0)
        setStatus('idle')
    }
    return {position, status, start, stop, reset}
}